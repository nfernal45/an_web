const actionTypes = {
  FETCH_APPEAL: 'FETCH_APPEAL',
  FETCH_APPEAL_LIST: 'FETCH_APPEAL_LIST',
  SAVE_APPEAL: 'SAVE_APPEAL',
  CHANGE_APPEAL_STATUS: 'CHANGE_APPEAL_STATUS',
  FETCH_REQUEST_STATUSES: 'FETCH_REQUEST_STATUSES'
}

const mutationTypes = {
  SET_APPEAL: 'SET_APPEAL',
  RESET_APPEAL: 'RESET_APPEAL',
  RESET_APPEAL_LIST: 'RESET_APPEAL_LIST',
  SET_REQUEST_STATUSES: 'SET_REQUEST_STATUSES',
  SET_VERSION: 'SET_VERSION_NUMBER',
  SET_PROP: 'SET_PROP'
}

const getterTypes = {
  GET_APPEAL: 'GET_APPEAL'
}

export { actionTypes, mutationTypes, getterTypes }
