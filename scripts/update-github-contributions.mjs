import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fetchContributionOutput } from './github-contributions.mjs'

const OUTPUT_PATH = resolve('public/data/github-contributions.json')

await loadEnvLocal()

const GITHUB_USER = process.env.GITHUB_LOGIN ?? 'C9Jimmy'
const token =
  process.env.GH_CONTRIBUTIONS_TOKEN ??
  process.env.GITHUB_TOKEN ??
  process.env.GH_TOKEN

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

const output = await fetchContributionOutput({
  login: GITHUB_USER,
  token,
})

await mkdir(dirname(OUTPUT_PATH), { recursive: true })
await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`)

console.log(`Updated ${OUTPUT_PATH}`)
console.log(`${output.total.lastYear} contributions for ${output.user}`)
console.log(`Source: ${output.source}`)
