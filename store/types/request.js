const actionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  SET_REQUEST: 'SET_REQUEST',
  SAVE_REQUEST: 'SAVE_REQUEST',
  RESET_REQUEST: 'RESET_REQUEST',
  FETCH_REQUEST_LIST: 'FETCH_REQUEST_LIST',
  FETCH_DEFAULT_OBJECTS: 'FETCH_DEFAULT_OBJECTS',
  FETCH_REQUEST_STATUSES: 'FETCH_REQUEST_STATUSES',
  CHANGE_REQUEST_STATUS: 'CHANGE_REQUEST_STATUS',
  CREATE_ABEYANCE: 'CREATE_ABEYANCE'
}

const mutationTypes = {
  SET_REQUEST: 'SET_REQUEST',
  RESET_REQUEST: 'RESET_REQUEST',
  RESET_REQUEST_LIST: 'RESET_REQUEST_LIST',
  SET_REQUEST_STATUSES: 'SET_REQUEST_STATUSES',
  SET_PROP: 'SET_PROP',
  SET_ARRAY: 'SET_ARRAY',
  SET_ARRAY_OBJECT_PROP: 'SET_ARRAY_OBJECT_PROP',
  SET_DEFAULT_OBJECT: 'SET_DEFAULT_OBJECT'
}

const getterTypes = {
  GET_REQUEST: 'GET_REQUEST'
}

export { actionTypes, mutationTypes, getterTypes }
