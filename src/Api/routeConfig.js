let routeUrl
const routeUrls = {
  production: 'https://mverost44.github.io/rogers-company-client/#',
  development: 'http://localhost:3000/#'
}

if (window.location.hostname === 'localhost') {
  routeUrl = routeUrls.development
} else {
  routeUrl = routeUrls.production
}

export default routeUrl
