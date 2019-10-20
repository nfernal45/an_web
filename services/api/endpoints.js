const restApiNameSpaces = {
  gf: '/gf-api',
  gu: '/gu-api',
  nsi: '/nsi-api'
}

const restApiGf = {
  gfAppeal: {
    byId: '/gf-requests/{requestId}',
    list: '/gf-requests/list',
    empty: '/gf-requests/empty-element',
    save: '/gf-requests/'
  },
  gfQueriedDocs: {
    byId: '/gf-queried-docs/{id}',
    list: '/gf-queried-docs/list'
  },
  gfAttachedDocs: {
    byId: '/gf-attached-docs/{id}',
    list: '/gf-attached-docs/list'
  },
  gfocCheck: {
    byId: '/gf-doc-checks/{id}',
    list: '/gf-doc-checks/list'
  }
}

const restApiGfRef = {
  gfRefEtpStatusMap: {
    byId: '/etp-gf-status-map/{id}',
    list: '/etp-gf-status-map/list'
  },
  gfRefAppealImportErrors: {
    byId: '/ref-request-import-errors/{id}',
    list: '/ref-request-import-errors/list'
  },
  gfRefAcceptReasons: {
    byId: '/ref-accept-reasons/{id}',
    list: '/ref-accept-reasons/list'
  },
  gfRefAppealStatuses: {
    byId: '/ref-gf-request-statuses/',
    list: '/ref-gf-request-statuses/list'
  }
}

const restApiGu = {}

const restApiGuRef = {
  guRefAppealTypes: {
    list: '/ref-request-types/list'
  },
  guRefRegPlaces: {
    list: '/ref-reg-places/list'
  }
}
const restApiNsi = {}

function setApiPrefix({ prefix, links }) {
  Object.keys(links).forEach((key) => {
    Object.keys(links[key]).forEach((subKey) => {
      links[key][subKey] = `${prefix}${links[key][subKey]}`
    })
  })
}

setApiPrefix({ prefix: restApiNameSpaces.gf, links: restApiGf })
setApiPrefix({ prefix: restApiNameSpaces.gf, links: restApiGfRef })
setApiPrefix({ prefix: restApiNameSpaces.gu, links: restApiGuRef })

// console.log(restApiGf)

export { restApiGf, restApiGfRef, restApiGu, restApiGuRef, restApiNsi }
