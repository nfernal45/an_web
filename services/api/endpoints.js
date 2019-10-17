const restApiGf = {
  gfRequest: {
    byId: '/gf-requests/{requestId}',
    list: '/gf-requests/list',
    empty: '/gf-requests/empty-element'
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
  gfRefRequestImportErrors: {
    byId: '/ref-request-import-errors/{id}',
    list: '/ref-request-import-errors/list'
  },
  gfRefAcceptReasons: {
    byId: '/ref-accept-reasons/{id}',
    list: '/ref-accept-reasons/list'
  },
  gfRedRequestStatuses: {
    byId: '/ref-gf-request-statuses/',
    list: '/ref-gf-request-statuses/list'
  }
}

const restApiGu = {}
const restApiGuRef = {}

const restApiNsi = {}

export { restApiGf, restApiGfRef, restApiGu, restApiGuRef, restApiNsi }
