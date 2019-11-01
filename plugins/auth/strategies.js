/* eslint-disable camelcase */
const authStrategies = function() {
  return {
    oauth2: {
      _scheme: 'oauth2',
      authorization_endpoint: process.env.APP_AUTH_ENDPOINT,
      scope: process.env.APP_AUTH_SCOPE.split(' '),
      access_type: 'offline',
      access_token_endpoint: process.env.APP_AUTH_ACCESS_TOKEN_ENDPOINT,
      response_type: 'code',
      redirect_uri: `${process.env.APP_HOST}${process.env.APP_BASE_ROUTE}/login`,
      token_type: 'Bearer',
      client_id: process.env.APP_AUTH_CLIENT_ID,
      userinfo_endpoint: false
    }
  }
}

module.exports = authStrategies
