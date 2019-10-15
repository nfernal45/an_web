const rootLinks = {}

const rootLinksTypes = [
  // { type: 'rootLinksGf', api: '/gf-api/root-links' },
  // { type: 'rootLinksGu', api: '/gu-api/root-links' },
  // { type: 'rootLinksNsi', api: '/nsi-api/root-links' }
]

const setRootLinks = ({ type, links }) => (rootLinks[type] = links)

export { rootLinks, setRootLinks, rootLinksTypes }
