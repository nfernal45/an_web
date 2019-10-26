export default () => ({
  request: {
    gfAttachedDocsByRequestId: []
  },
  requestStatuses: [],
  gfAbeyancesByRequestIdDefault() {
    return {
      abeyanceId: null,
      abeyanceRegnum: null,
      startDate: null,
      endDate: null,
      reason: null,
      signerId: null,
      versionNumber: null,
      executorId: null,
      docsRecived: null,
      receiveDate: null,
      violationFixed: null,
      recommenceDate: null,
      refAbeyanceReasons: []
    }
  },
  gfAttachedDocsByRequestIdDefault: null,
  gfQueriedDocsByRequestIdDefault: null,
  gfRefusalReasonRequestIdDefault: null
})
