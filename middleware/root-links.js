/* eslint-disable */
import { setRootLinks, rootLinks, rootLinksTypes } from '@/api/root-links.js'

const defineRootLinks = async function(context) {
  let requests = rootLinksTypes.map(({ type, api }) => fetchRootLinks({ context, api }))
  let responses = await Promise.all(requests)
  // setRootLinks({ type, links: await fetchRootLinks({ context, api }) })
  console.log('Root links', responses)
}

const fetchRootLinks = function({ context, api }) {
  return new Promise((resolve, reject) => {
    resolve(context.$axios.$get(api))
  })
}

export { defineRootLinks as default }
