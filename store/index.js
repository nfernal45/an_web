export const state = () => ({
  permissions: [], // Список прав, при наличии которого допускается какое либо действие в системе.

  // For test and develop
  permissionDisplayIsVisible: false,
  permissionControls: [
    'RL_GF_READONLY',
    'RL_GF_REQUEST_CREATE',
    'RL_GF_REQUEST_SAVE',
    'RL_GF_CANCELLATION',
    'RL_GF_REQUEST_REGISTER',
    'RL_GF_QUERY',
    'RL_GF_ABEYANCE_PREPARING',
    'RL_GF_ABEYANCE_APPROVAL',
    'RL_GF_ABEYANCE_RECOMMENCE',
    'RL_GF_DOC_CHECK',
    'RL_GF_DECISION_PREPARING',
    'RL_GF_DECISION_APPROVAL',
    'RL_GF_DOC_ISSUE',
    'RL_GF_DOC_PRINT',
    'RL_GF_DOC_MZHI'
  ]
})

export const getters = {
  can: (state) => (perm) => state.permissions.includes(perm),
  canAny: (state, getters) => {
    return (perms = []) => perms.some((x) => getters.can(x))
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
