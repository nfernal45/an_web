/* eslint-disable */
export default function({ $auth }) {
  console.log('🔑', 'AUTH', $auth)

  if($auth.ctx.route.query.code) {
    return
  }

  if (!$auth.loggedIn) {
    $auth.loginWith('code')
    //  .then(response => { console.log(response) })
  }
    //  .then(() => this.$toast.success('Logged In!'))
  // }
  // $auth.loginWith('google')


  // const username = $auth.user.username
}
