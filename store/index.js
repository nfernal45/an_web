export const state = () => ({
  // Список прав, при наличии которого допускается какое либо действие в системе.
  // На время разработки в массиве есть все права
  permissions: [
    'RL_GF_READONLY',
    'RL_GF_REQUEST_CREATE',
    'RL_GF_REQUEST_SAVE',
    'RL_GF_CANCELLATION',
    'RL_GF_REQUEST_REGISTER',
    'RL_GF_DOC_CHECK_EDIT',
    'RL_GF_QUERY',
    'RL_GF_ABEYANCE_PREPARING',
    'RL_GF_ABEYANCE_APPROVAL',
    'RL_GF_DOC_CHECK',
    'RL_GF_DECISION_PREPARING',
    'RL_GF_DECISION_APPROVAL',
    'RL_GF_DOC_ISSUE',
    'RL_GF_DOC_PRINT',
    'RL_GF_DOC_MZHI',
    'RL_GF_ENTER_GU'
  ],
  // For test and develop
  permissionDisplayIsVisible: false,
  permissionControls: [
    'RL_GF_READONLY',
    'RL_GF_REQUEST_CREATE',
    'RL_GF_REQUEST_SAVE',
    'RL_GF_CANCELLATION',
    'RL_GF_REQUEST_REGISTER',
    'RL_GF_DOC_CHECK_EDIT',
    'RL_GF_QUERY',
    'RL_GF_ABEYANCE_PREPARING',
    'RL_GF_ABEYANCE_APPROVAL',
    'RL_GF_DOC_CHECK',
    'RL_GF_DECISION_PREPARING',
    'RL_GF_DECISION_APPROVAL',
    'RL_GF_DOC_ISSUE',
    'RL_GF_DOC_PRINT',
    'RL_GF_DOC_MZHI',
    'RL_GF_ENTER_GU'
  ]
})

export const getters = {
  can: (state) => (perm, statusId = null) => {
    if (statusId) {
      const requestStatusesPermissions = {
        DECIDED: 7
      }
      switch (statusId) {
        case requestStatusesPermissions.DECIDED:
          const permissions = ['RL_GF_READONLY']
          if (permissions.includes(perm)) return true
          return false
      }
    }
    return state.permissions.includes(perm)
  },
  canAny: (state, getters) => {
    return (perms = [], statusId = null) => {
      if (statusId) {
        const requestStatusesPermissions = {
          DECIDED: 7
        }
        switch (statusId) {
          case requestStatusesPermissions.DECIDED:
            const permissions = ['RL_GF_READONLY']
            return !!perms.filter((perm) => permissions.includes(perm)).length
        }
      }
      return perms.some((x) => getters.can(x))
    }
  }
}

export const mutations = {
  setPermission(state, payload) {
    const index = state.permissions.indexOf(payload)

    if (index === -1) state.permissions.push(payload)
    else state.permissions.splice(index, 1)
  },
  setAllPermissions(state, payload = []) {
    state.permissions = [...payload]
  },
  togglePermissionsDisplay(state) {
    state.permissionDisplayIsVisible = !state.permissionDisplayIsVisible
  }
}
