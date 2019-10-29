const restApiNameSpaces = {
  gu: process.env.APP_REST_API_GU,
  nsi: process.env.APP_REST_API_NSI,
  gf: process.env.APP_REST_API_GF,
  gfActiviti: process.env.APP_REST_API_ACTIVITI_GF,
  gfRabbitmq: process.env.APP_REST_API_RABBITMQ_GF
}

const restApiGf = {
  gfRequest: {
    byId: '/gf-requests/{requestId}',
    list: '/gf-requests/list',
    empty: '/gf-requests/empty-element',
    save: '/gf-requests/'
  },
  gfQueriedDocs: {
    byId: '/gf-queried-docs/{id}',
    list: '/gf-queried-docs/list',
    requiredInterParam: '/gf-queried-docs/{id}/required-inter-param'
  },
  gfAttachedDocs: {
    byId: '/gf-attached-docs/{id}',
    list: '/gf-attached-docs/list'
  },
  gfDocCheck: {
    byId: '/gf-doc-checks/{id}',
    list: '/gf-doc-checks/list',
    save: '/gf-doc-checks/'
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
  gfRefRequestStatuses: {
    byId: '/ref-gf-request-statuses/',
    list: '/ref-gf-request-statuses/list'
  },
  gfRefAgreementFoundations: {
    list: '/ref-agreement-foundations/list'
  }
}

const restApiGfActiviti = {
  statusMovement: {
    postChange: '/requests/{requestId}/status/change',
    getNext: '/requests/{requestId}/status/next'
  }
}

const restApiGfRabbitmq = {
  sendingToEtp: {
    send: '/sending-to-etp/doc-query/send'
  }
}

const restApiGu = {}

const restApiGuRef = {
  guRefRequestTypes: {
    list: '/ref-request-types/list'
  },
  guRefRegPlaces: {
    list: '/ref-reg-places/list'
  },
  guRefDocType: {
    list: '/ref-doc-types/list'
  },
  guRefAbeyanceReasons: {
    list: '/ref-abeyance-reasons/list'
  },
  guRefRefusalReasons: {
    list: '/ref-refusal-reasons/list'
  }
}

const restApiNsi = {
  nsiRefOrgStructure: {
    byId: '/ref-org-strct-official/{id}',
    list: '/ref-org-strct-official/list'
  },
  nsiRefDept: {
    list: '/ref-depts/list'
  }
}

const restApiAuth = {
  checkToken: '/as/oauth/check_token',
  checkUser: '/as/commons/users/{login}',
  passwordReset: '/as/users/password-reset-page'
}

function setApiPrefix({ prefix, links }) {
  Object.keys(links).forEach((key) => {
    Object.keys(links[key]).forEach((subKey) => {
      links[key][subKey] = `${prefix}${links[key][subKey]}`
    })
  })
}

setApiPrefix({ prefix: restApiNameSpaces.gf, links: restApiGf })
setApiPrefix({ prefix: restApiNameSpaces.gf, links: restApiGfRef })
setApiPrefix({ prefix: restApiNameSpaces.gfActiviti, links: restApiGfActiviti })
setApiPrefix({ prefix: restApiNameSpaces.gfRabbitmq, links: restApiGfRabbitmq })
setApiPrefix({ prefix: restApiNameSpaces.gu, links: restApiGuRef })
setApiPrefix({ prefix: restApiNameSpaces.nsi, links: restApiNsi })

// console.log(restApiGf)

export {
  restApiGf,
  restApiGfRef,
  restApiGu,
  restApiGuRef,
  restApiNsi,
  restApiGfActiviti,
  restApiGfRabbitmq,
  restApiAuth
}
