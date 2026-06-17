import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('GitHub Pages deploy workflow', () => {
  const workflow = readFileSync(resolve('.github/workflows/deploy.yml'), 'utf8')

  it('can refresh GitHub contribution data automatically and on demand', () => {
    expect(workflow).toContain('workflow_dispatch:')
    expect(workflow).toContain('cron: "36 18 */5 * *"')
  })

  it('refreshes contribution data before building the Pages artifact', () => {
    const updateIndex = workflow.indexOf('npm run update:github')
    const buildIndex = workflow.indexOf('npm run build')

    expect(updateIndex).toBeGreaterThan(-1)
    expect(buildIndex).toBeGreaterThan(-1)
    expect(updateIndex).toBeLessThan(buildIndex)
  })

  it('passes a secret token and verifies the generated contribution snapshot', () => {
    expect(workflow).toContain('GH_CONTRIBUTIONS_TOKEN: ${{ secrets.GH_CONTRIBUTIONS_TOKEN }}')
    expect(workflow).toContain('public/data/github-contributions.json')
    expect(workflow).toContain('total.lastYear')
  })
})
