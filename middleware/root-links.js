/* eslint-disable */
import { setRootLinks, rootLinks, rootLinksTypes } from '~/services/api/root-links.js'

const defineRootLinks = async function(context) {
  let requests = rootLinksTypes.map(({ type, api }) => fetchRootLinks({ context, type, api }))
  let links = await Promise.all(requests)
  links.map(link => setRootLinks({ type: link.type, links: link.endpoints }))
}

const fetchRootLinks = function({ context, type, api }) {
  return new Promise((resolve, reject) => {
    context.$axios.$get(api)
      .then(endpoints => resolve({ type, endpoints }))
  })
}

export { defineRootLinks as default }
