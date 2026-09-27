const PUBLIC_PAGES = [
  '/',
  '/planning',
  '/disciplines',
  '/pricing',
  '/instructors',
  '/locations',
  '/contact',
  '/histoire',
  '/actualites',
]

const ERROR_MARKERS = ['Application error', 'Internal Server Error', 'This page could not be found']

interface CheckResult {
  name: string
  isPassing: boolean
  detail: string
}

interface CliOptions {
  baseUrl: string
  referenceUrl: string | null
}

function parseArguments(): CliOptions {
  const [baseUrl, ...rest] = process.argv.slice(2)
  if (!baseUrl) {
    console.error('Usage : node scripts/smoke-test.mts <url> [--compare <url-de-reference>]')
    process.exit(2)
  }
  const compareIndex = rest.indexOf('--compare')
  const referenceUrl = compareIndex >= 0 ? rest[compareIndex + 1] ?? null : null
  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
    referenceUrl: referenceUrl?.replace(/\/$/, '') ?? null,
  }
}

function requestHeaders(): Record<string, string> {
  const bypassSecret = process.env['VERCEL_AUTOMATION_BYPASS_SECRET']
  return bypassSecret ? { 'x-vercel-protection-bypass': bypassSecret } : {}
}

async function fetchPage(url: string, redirect: RequestRedirect = 'follow'): Promise<Response> {
  return fetch(url, { headers: requestHeaders(), redirect })
}

function pageTitle(html: string): string {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ''
}

function visibleText(html: string): string {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<title>[^<]*<\/title>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n')
}

function imageSources(html: string, pageUrl: string): string[] {
  const sources = new Set<string>()
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
    const source = match[1].replace(/&amp;/g, '&')
    if (source.startsWith('data:')) continue
    sources.add(new URL(source, pageUrl).toString())
  }
  return [...sources]
}

const MAXIMUM_REPORTED_DIFFERENCES = 8

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
}

function shareTags(html: string): string[] {
  const metaTags = [
    ...html.matchAll(
      /<meta\s+(?:name|property)="(description|robots|keywords|og:[^"]+|twitter:[^"]+)"\s+content="([^"]*)"/gi
    ),
  ].map((match) => `${match[1]} = ${decodeEntities(match[2])}`)
  const structuredData = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
  ].map((match) => `json-ld = ${match[1]}`)
  return [`title = ${decodeEntities(pageTitle(html))}`, ...metaTags, ...structuredData].sort()
}

function linkTargets(html: string): string[] {
  return [...html.matchAll(/<a\s[^>]*href="([^"]*)"/gi)].map((match) => decodeEntities(match[1]))
}

function embeddedSources(html: string): string[] {
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(
    (match) => `image ${imageFileName(decodeEntities(match[1]))}`
  )
  const frames = [...html.matchAll(/<iframe[^>]+src="([^"]+)"/gi)].map(
    (match) => `iframe ${decodeEntities(match[1])}`
  )
  return [...images, ...frames]
}

function imageFileName(source: string): string {
  const path = new URL(source, 'https://reference.invalid').pathname
  const fileName = path.split('/').pop() ?? path
  return fileName.replace(/-[0-9a-f]{8}(\.[a-z0-9]+)$/i, '$1').replace(/\.jpeg$/i, '.jpg')
}

function countOccurrences(values: string[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return counts
}

function listDifferences(expected: string[], actual: string[]): string[] {
  const expectedCounts = countOccurrences(expected)
  const actualCounts = countOccurrences(actual)
  const differences: string[] = []

  for (const [value, count] of expectedCounts) {
    const missing = count - (actualCounts.get(value) ?? 0)
    if (missing > 0) differences.push(`manquant « ${value} »`)
  }
  for (const [value, count] of actualCounts) {
    const extra = count - (expectedCounts.get(value) ?? 0)
    if (extra > 0) differences.push(`en trop « ${value} »`)
  }

  if (differences.length === 0 && expected.join('\n') !== actual.join('\n')) {
    differences.push('mêmes éléments, ordre différent')
  }
  return differences
}

function compareResult(name: string, expected: string[], actual: string[]): CheckResult {
  const differences = listDifferences(expected, actual)
  const shown = differences.slice(0, MAXIMUM_REPORTED_DIFFERENCES)
  const hidden = differences.length - shown.length
  return {
    name,
    isPassing: differences.length === 0,
    detail:
      differences.length === 0
        ? 'identique'
        : `${differences.length} différence(s)\n      - ${shown.join('\n      - ')}${hidden > 0 ? `\n      … et ${hidden} autre(s)` : ''}`,
  }
}

async function checkPublicPages(options: CliOptions): Promise<CheckResult[]> {
  const results: CheckResult[] = []
  const checkedImages = new Set<string>()

  for (const path of PUBLIC_PAGES) {
    const pageUrl = `${options.baseUrl}${path}`
    const response = await fetchPage(pageUrl)
    const html = await response.text()
    const pageText = visibleText(html)
    const errorMarker = ERROR_MARKERS.find((marker) => pageText.includes(marker))
    results.push({
      name: `page ${path}`,
      isPassing: response.status === 200 && !errorMarker,
      detail: errorMarker ? `${response.status}, contient « ${errorMarker} »` : `${response.status}`,
    })

    for (const imageUrl of imageSources(html, pageUrl)) {
      if (checkedImages.has(imageUrl)) continue
      checkedImages.add(imageUrl)
      const imageResponse = await fetchPage(imageUrl)
      const contentType = imageResponse.headers.get('content-type') ?? ''
      if (imageResponse.status !== 200 || !contentType.startsWith('image/')) {
        results.push({
          name: `image ${imageUrl}`,
          isPassing: false,
          detail: `${imageResponse.status} ${contentType}`,
        })
      }
    }

    if (options.referenceUrl) {
      const referenceResponse = await fetchPage(`${options.referenceUrl}${path}`)
      const referenceHtml = await referenceResponse.text()
      if (referenceResponse.status !== 200) {
        results.push({
          name: `référence ${path}`,
          isPassing: false,
          detail: `la référence répond ${referenceResponse.status}, comparaison impossible`,
        })
        continue
      }
      results.push(
        compareResult(
          `texte ${path}`,
          visibleText(referenceHtml).split('\n'),
          pageText.split('\n')
        ),
        compareResult(`titre et partage ${path}`, shareTags(referenceHtml), shareTags(html)),
        compareResult(`liens ${path}`, linkTargets(referenceHtml), linkTargets(html)),
        compareResult(`images et cartes ${path}`, embeddedSources(referenceHtml), embeddedSources(html))
      )
    }
  }

  results.push({
    name: `${checkedImages.size} images chargées`,
    isPassing: true,
    detail: 'toutes vérifiées ci-dessus',
  })
  return results
}

async function expectRedirectToLogin(baseUrl: string, path: string): Promise<CheckResult> {
  const response = await fetchPage(`${baseUrl}${path}`, 'manual')
  const location = response.headers.get('location') ?? ''
  return {
    name: `${path} protégé`,
    isPassing: response.status >= 300 && response.status < 400 && location.includes('/admin/login'),
    detail: `${response.status} → ${location || '(aucune redirection)'}`,
  }
}

async function checkAdminProtection(baseUrl: string): Promise<CheckResult[]> {
  const loginPage = await fetchPage(`${baseUrl}/admin/login`)
  const removedDraftRoute = await fetchPage(`${baseUrl}/api/draft/enable?sanity-preview-secret=x`, 'manual')
  return [
    await expectRedirectToLogin(baseUrl, '/admin'),
    await expectRedirectToLogin(baseUrl, '/admin/actualites'),
    await expectRedirectToLogin(baseUrl, '/api/apercu/activer?path=/'),
    { name: '/admin/login accessible', isPassing: loginPage.status === 200, detail: `${loginPage.status}` },
    {
      name: '/api/draft/enable supprimée',
      isPassing: removedDraftRoute.status === 404,
      detail: `${removedDraftRoute.status}`,
    },
  ]
}

const REQUIRED_SECURITY_HEADERS = ['x-content-type-options', 'referrer-policy', 'x-frame-options']

async function checkSecurityHeaders(baseUrl: string): Promise<CheckResult[]> {
  const results: CheckResult[] = []
  for (const path of ['/', '/admin/login']) {
    const response = await fetchPage(`${baseUrl}${path}`, 'manual')
    const missing = REQUIRED_SECURITY_HEADERS.filter((header) => !response.headers.has(header))
    results.push({
      name: `en-têtes de sécurité ${path}`,
      isPassing: missing.length === 0,
      detail: missing.length === 0 ? 'présents' : `absents : ${missing.join(', ')}`,
    })
  }
  return results
}

async function checkAdminLogin(baseUrl: string): Promise<CheckResult[]> {
  const username = process.env['SMOKE_ADMIN_USERNAME']
  const password = process.env['SMOKE_ADMIN_PASSWORD']
  if (!username || !password) return []

  const response = await fetch(`${baseUrl}/api/admin/session`, {
    method: 'POST',
    headers: { ...requestHeaders(), 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const cookie = response.headers.get('set-cookie') ?? ''
  const results: CheckResult[] = [
    { name: 'connexion admin', isPassing: response.ok, detail: `${response.status}` },
  ]
  if (baseUrl.startsWith('https://')) {
    results.push({
      name: 'cookie de session sécurisé',
      isPassing:
        cookie.startsWith('__Host-') &&
        /;\s*Secure/i.test(cookie) &&
        /;\s*HttpOnly/i.test(cookie) &&
        /;\s*SameSite=Strict/i.test(cookie),
      detail: cookie.split(';').slice(1).map((part) => part.trim()).join(', ') || '(aucun cookie)',
    })
  }
  return results
}

async function main(): Promise<void> {
  const options = parseArguments()
  console.log(`Site testé : ${options.baseUrl}`)
  if (options.referenceUrl) console.log(`Référence  : ${options.referenceUrl}`)
  console.log('')

  const results = [
    ...(await checkPublicPages(options)),
    ...(await checkAdminProtection(options.baseUrl)),
    ...(await checkSecurityHeaders(options.baseUrl)),
    ...(await checkAdminLogin(options.baseUrl)),
  ]

  for (const result of results) {
    console.log(`${result.isPassing ? 'OK ' : 'KO '} ${result.name} — ${result.detail}`)
  }

  const failures = results.filter((result) => !result.isPassing)
  console.log('')
  console.log(failures.length === 0 ? 'TOUT EST OK' : `${failures.length} ÉCHEC(S)`)
  process.exit(failures.length === 0 ? 0 : 1)
}

await main()
