const actionTypes = {
  FETCH_REQUEST: 'FETCH_REQUEST',
  SET_REQUEST: 'SET_REQUEST',
  SAVE_REQUEST: 'SAVE_REQUEST',
  RESET_REQUEST: 'RESET_REQUEST',
  FETCH_REQUEST_LIST: 'FETCH_REQUEST_LIST',
  FETCH_DEFAULT_OBJECTS: 'FETCH_DEFAULT_OBJECTS',
  FETCH_DOC_CHECK: 'FETCH_DOC_CHECK',
  FETCH_REQUEST_STATUSES: 'FETCH_REQUEST_STATUSES',
  CHANGE_REQUEST_STATUS: 'CHANGE_REQUEST_STATUS',
  SAVE_DOC_CHECK: 'SAVE_DOC_CHECK',
  SAVE_REQUEST_RELATED: 'SAVE_REQUEST_RELATED',
  SAVE_INTERNAL_DOCS: 'SAVE_INTERNAL_DOCS',
  SET_PROPS_BY_STATUS: 'SET_PROP_BY_STATUS'
}

const mutationTypes = {
  SET_REQUEST: 'SET_REQUEST',
  RESET_REQUEST: 'RESET_REQUEST',
  RESET_REQUEST_LIST: 'RESET_REQUEST_LIST',
  RESET_REQUEST_STATUSES: 'RESET_REQUEST_STATUSES',
  SET_REQUEST_STATUSES: 'SET_REQUEST_STATUSES',
  SET_PROP: 'SET_PROP',
  SET_ARRAY: 'SET_ARRAY',
  SET_ARRAY_OBJECT_PROP: 'SET_ARRAY_OBJECT_PROP',
  SET_DEFAULT_OBJECT: 'SET_DEFAULT_OBJECT',
  SET_PROP_DOC_CHECK: 'SET_PROP_DOC_CHECK',
  SET_DOC_CHECK: 'SET_DOC_CHECK',
  SET_LICENSEE_ATTAHCHED_DOCS: 'SET_LICENSEE_ATTAHCHED_DOCS',
  SET_MZHI_ATTAHCHED_DOCS: 'SET_MZHI_ATTAHCHED_DOCS',
  SET_INTERNAL_ATTACHED_DOCS: 'SET_INTERNAL_ATTACHED_DOCS',
  SET_DOC_CHECK_PRIMARY_INSPECTION_RESULT:
    'SET_DOC_CHECK_PRIMARY_INSPECTION_RESULT',
  SET_DOC_CHECK_INSPECTION_DESCRIPTION: 'SET_DOC_CHECK_INSPECTION_DESCRIPTION',
  SET_DOC_CHECK_ABEYANCE_INSPECTION_RESULT:
    'SET_DOC_CHECK_ABEYANCE_INSPECTION_RESULT'
}

const getterTypes = {
  GET_REQUEST: 'GET_REQUEST',
  GET_MZHI_ATTACHED_DOCS: 'GET_MZHI_ATTACHED_DOCS',
  GET_LICENSEE_ATTACHED_DOCS: 'GET_LICENSEE_ATTACHED_DOCS',
  GET_REQUEST_PAGES_ACTIVE_STATUSES: 'GET_REQUEST_PAGES_ACTIVE_STATUSES'
}

export { actionTypes, mutationTypes, getterTypes }
