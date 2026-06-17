import {
  fetchContributionOutput,
  parsePublicContributionsHtml,
} from '../scripts/github-contributions.mjs'

const publicContributionsHtml = `
<div class="js-yearly-contributions">
  <h2 tabindex="-1" id="js-contribution-activity-description" class="f4 text-normal mb-2">
    488
    contributions
      in the last year
  </h2>
  <td tabindex="0" data-date="2026-05-16" id="contribution-day-2" data-level="3" class="ContributionCalendar-day"></td>
  <tool-tip for="contribution-day-2">35 contributions on May 16th.</tool-tip>
  <td tabindex="0" data-date="2026-05-15" id="contribution-day-1" data-level="0" class="ContributionCalendar-day"></td>
  <tool-tip for="contribution-day-1">No contributions on May 15th.</tool-tip>
</div>
`

describe('GitHub contribution updater', () => {
  it('parses public GitHub contribution HTML into the site JSON shape', () => {
    const output = parsePublicContributionsHtml(publicContributionsHtml, 'C9Jimmy')

    expect(output.source).toBe('github-profile-html')
    expect(output.user).toBe('C9Jimmy')
    expect(output.total.lastYear).toBe(488)
    expect(output.contributions).toEqual([
      { date: '2026-05-15', count: 0, level: 0 },
      { date: '2026-05-16', count: 35, level: 3 },
    ])
  })

  it('falls back to the public profile calendar when GraphQL credentials are rejected', async () => {
    const fetchImpl = vi.fn(async (url: string | URL | Request) => {
      const target = String(url)
      if (target === 'https://api.github.com/graphql') {
        return new Response('Bad credentials', { status: 401 })
      }

      return new Response(publicContributionsHtml, {
        status: 200,
        headers: { 'content-type': 'text/html' },
      })
    })

    const output = await fetchContributionOutput({
      fetchImpl,
      login: 'C9Jimmy',
      token: 'expired-token',
    })

    expect(output.source).toBe('github-profile-html')
    expect(output.total.lastYear).toBe(488)
    expect(fetchImpl).toHaveBeenCalledTimes(2)
    expect(String(fetchImpl.mock.calls[1][0])).toBe('https://github.com/users/C9Jimmy/contributions')
  })
})
