const authStrategies = (function() {
  return {
    oauth2: {
      _scheme: 'oauth2',
      authorization_endpoint: '/as/oauth/authorize',
      scope: ['READ', 'WRITE'],
      access_type: 'offline',
      access_token_endpoint: '/gf-api/login',
      response_type: 'code',
      token_type: 'Bearer',
      client_id: 'client1'
    }
  }
})()

module.exports = authStrategies
