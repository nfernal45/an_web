export default () => ({
  request: {
    gfAttachedDocsByRequestId: []
  },
  docCheck: {},
  licenseeAttachedDocs: [],
  mzhiAttachedDocs: [],
  internalAttachedDocs: [],
  requestStatuses: [],
  gfAttachedDocsByRequestIdDefault: null,
  gfQueriedDocsByRequestIdDefault: null,
  gfRefusalReasonRequestIdDefault: null,
  docTypesConstants: {
    ExtractOrReceiptOnRegistrationOfApplication: {
      typeId: 16,
      warehouseName: 'Опись принятых от заявителя документов'
    },
    NotificationOfProvisionOfServices: {
      typeId: 20,
      warehouseName: 'Уведомление о предоставлении услуги'
    },
    ProvideServicesRefuseDecision: {
      typeId: 17,
      warehouseName: 'Решение об отказе в предоставлении услуги'
    },
    DecisionOnSuspensionOfProvidingTheStateService: {
      typeId: 18,
      warehouseName:
        'Уведомление о необходимости устранения нарушений и (или) досыла документов'
    }
  }
})
