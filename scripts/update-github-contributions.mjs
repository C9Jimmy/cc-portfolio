import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const OUTPUT_PATH = resolve('public/data/github-contributions.json')

await loadEnvLocal()

const GITHUB_USER = process.env.GITHUB_LOGIN ?? 'C9Jimmy'
const token =
  process.env.GH_CONTRIBUTIONS_TOKEN ??
  process.env.GITHUB_TOKEN ??
  process.env.GH_TOKEN

const levelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

async function loadEnvLocal() {
  try {
    const file = await readFile(resolve('.env.local'), 'utf8')
    for (const rawLine of file.split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const separatorIndex = line.indexOf('=')
      if (separatorIndex === -1) continue
      const key = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')
      if (key && process.env[key] === undefined) process.env[key] = value
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

if (!token) {
  console.error([
    'Missing GitHub token.',
    '',
    'Set GH_CONTRIBUTIONS_TOKEN before running this command:',
    '  GH_CONTRIBUTIONS_TOKEN=github_pat_xxx npm run update:github',
    '',
    'Or put it in .env.local:',
    '  GH_CONTRIBUTIONS_TOKEN=github_pat_xxx',
    '',
    'The token is used only while generating public/data/github-contributions.json.',
    'Do not commit the token or put it in Vue client code.',
  ].join('\n'))
  process.exit(1)
}

const query = `
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

const response = await fetch(GITHUB_GRAPHQL_URL, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'cc-portfolio-update-script',
  },
  body: JSON.stringify({
    query,
    variables: { login: GITHUB_USER },
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
const user = viewer?.login === GITHUB_USER ? viewer : payload.data?.user
const calendar = user?.contributionsCollection?.contributionCalendar
if (!calendar) {
  throw new Error(`No contribution calendar found for ${GITHUB_USER}`)
}

const contributions = calendar.weeks.flatMap((week) =>
  week.contributionDays.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: levelMap[day.contributionLevel] ?? 0,
  }))
)

const output = {
  updatedAt: new Date().toISOString(),
  source: 'github-graphql',
  user: user.login,
  hasAnyRestrictedContributions: Boolean(user.contributionsCollection.hasAnyRestrictedContributions),
  total: {
    lastYear: calendar.totalContributions,
  },
  contributions,
}

await mkdir(dirname(OUTPUT_PATH), { recursive: true })
await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)

console.log(`Updated ${OUTPUT_PATH}`)
console.log(`${calendar.totalContributions} contributions for ${user.login}`)
