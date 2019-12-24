let apiUrl
const apiUrls = {
  production: 'https://api.greaterbostonsnowremoval.com/',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
