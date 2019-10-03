const gfRootLinks = {}
const guRootLinks = {}
const nsiRootLinks = {}

const setGfRootLink = (link) => (gfRootLinks[link] = link)
const setGuRootLink = (link) => (guRootLinks[link] = link)
const setNsiRootLink = (link) => (nsiRootLinks[link] = link)

export {
  gfRootLinks,
  guRootLinks,
  nsiRootLinks,
  setGfRootLink,
  setGuRootLink,
  setNsiRootLink
}
