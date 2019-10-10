export default {
  _scheme: 'oauth2',
  authorization_endpoint: 'http://rlic-dev.c-i-p.ru/as/login',
  userinfo_endpoint: 'http://rlic-dev.c-i-p.ru/as/user',
  scope: ['read', 'write'],
  access_type: 'offline',
  access_token_endpoint: 'http://rlic-dev.c-i-p.ru/login',
  response_type: 'code',
  // token_type: 'Bearer',
  redirect_uri: 'http://rlic-dev.c-i-p.ru/login',
  client_id: 'client1',
  // token_key: 'access_token',
  state: 'UNIQUE_AND_NON_GUESSABLE'
}
