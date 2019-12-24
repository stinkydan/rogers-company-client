let routeUrl
const routeUrls = {
  production: 'https://beta.greaterbostonsnowremoval.com/#',
  development: 'http://localhost:3000/#'
}

if (window.location.hostname === 'localhost') {
  routeUrl = routeUrls.development
} else {
  routeUrl = routeUrls.production
}

export default routeUrl
