const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const levelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const contributionQuery = `
  query ContributionCalendar($login: String!) {
    viewer {
      login
      contributionsCollection {
        hasAnyRestrictedContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
    user(login: $login) {
      login
      contributionsCollection {
        hasAnyRestrictedContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`

export async function fetchContributionOutput({
  fetchImpl = fetch,
  login,
  token,
} = {}) {
  if (!login) throw new Error('Missing GitHub login')

  if (token?.trim()) {
    try {
      return await fetchGraphqlContributions({ fetchImpl, login, token })
    } catch (error) {
      console.warn(`GitHub GraphQL contribution update failed: ${error.message}`)
      console.warn('Falling back to public GitHub profile contributions.')
    }
  }

  return await fetchPublicProfileContributions({ fetchImpl, login })
}

export async function fetchGraphqlContributions({ fetchImpl = fetch, login, token }) {
  const response = await fetchImpl(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'cc-portfolio-update-script',
    },
    body: JSON.stringify({
      query: contributionQuery,
      variables: { login },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${body}`)
  }

  const payload = await response.json()
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(payload.errors, null, 2)}`)
  }

  const viewer = payload.data?.viewer
  const user = viewer?.login === login ? viewer : payload.data?.user
  const calendar = user?.contributionsCollection?.contributionCalendar
  if (!calendar) {
    throw new Error(`No contribution calendar found for ${login}`)
  }

  const contributions = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelMap[day.contributionLevel] ?? 0,
    }))
  )

  return {
    updatedAt: new Date().toISOString(),
    source: 'github-graphql',
    user: user.login,
    hasAnyRestrictedContributions: Boolean(user.contributionsCollection.hasAnyRestrictedContributions),
    total: {
      lastYear: calendar.totalContributions,
    },
    contributions,
  }
}

export async function fetchPublicProfileContributions({ fetchImpl = fetch, login }) {
  const url = `https://github.com/users/${encodeURIComponent(login)}/contributions`
  const response = await fetchImpl(url, {
    headers: {
      'User-Agent': 'cc-portfolio-update-script',
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub public contributions request failed: ${response.status} ${body}`)
  }

  return parsePublicContributionsHtml(await response.text(), login)
}

export function parsePublicContributionsHtml(html, login) {
  const totalMatch = html.match(
    /<h2\b[^>]*id="js-contribution-activity-description"[^>]*>\s*([\d,\s]+?)\s*contributions\s+in the last year/i
  )
  if (!totalMatch) {
    throw new Error('Could not find public contribution total in GitHub profile HTML')
  }

  const contributions = []
  const dayCellPattern = /<td\b([^>]*)><\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/g
  let match

  while ((match = dayCellPattern.exec(html)) !== null) {
    const attributes = match[1]
    const date = getAttribute(attributes, 'data-date')
    const level = normalizeLevel(getAttribute(attributes, 'data-level'))

    if (!date) continue

    contributions.push({
      date,
      count: parseContributionCount(stripHtml(match[2])),
      level,
    })
  }

  if (!contributions.length) {
    throw new Error('Could not find public contribution days in GitHub profile HTML')
  }

  contributions.sort((a, b) => a.date.localeCompare(b.date))

  return {
    updatedAt: new Date().toISOString(),
    source: 'github-profile-html',
    user: login,
    total: {
      lastYear: parseInteger(totalMatch[1]),
    },
    contributions,
  }
}

function getAttribute(attributes, name) {
  const pattern = new RegExp(`\\b${name}="([^"]*)"`)
  return attributes.match(pattern)?.[1]
}

function normalizeLevel(rawLevel) {
  const level = Number.parseInt(rawLevel ?? '0', 10)
  return level >= 0 && level <= 4 ? level : 0
}

function parseContributionCount(label) {
  if (/^No contributions\b/i.test(label)) return 0

  const match = label.match(/([\d,]+)\s+contribution/i)
  if (!match) {
    throw new Error(`Could not parse contribution count from label: ${label}`)
  }

  return parseInteger(match[1])
}

function parseInteger(value) {
  return Number.parseInt(String(value).replace(/[,\s]/g, ''), 10)
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
