// import setRootLink from '@/api/root-links.js'

export default function(context) {
  // const data = context.$axios.$get('http://gf-rlic.c-i-p.ru/gf-rlic/api/v1/')
  // const data = context.$axios.$get('http://gf-rlic.c-i-p.ru/gf-rlic/api/v1/')
  // console.group('Root links middleware', data)
  console.log('Rest api', process.env.APP_REST_API_GF)
  console.log('Rest api', process.env.APP_REST_API_NSI)
  console.groupEnd()
}
