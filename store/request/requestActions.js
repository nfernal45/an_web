import { actionTypes, mutationTypes } from '@/store/types/request'
import fetchRequestRecord from '@/services/api/request/fetchRequestRecord'
import saveRequestRecord from '~/services/api/request/saveRequestRecord'
import fetchNextRequestStatuses from '~/services/api/request/fetchNextRequestStatuses'
import fetchDocCheckByRequestId from '@/services/api/request/fetchDocCheckByRequestId'
import saveDocCheck from '@/services/api/request/saveDocCheck'
import defaultDocCheck from '@/constants/defaultDocCheck'
import changeRequestStatus from '@/services/api/request/changeRequestStatus'
import postAttachedDoc from '@/services/api/request/postAttachedDoc'
import uploadInternalMzhiDocument from '@/services/api/request/uploadInternalMzhiDocument'
import deleteInternalMzhiDocument from '@/services/api/request/deleteInternalMzhiDocument'

export default {
  [actionTypes.FETCH_REQUEST_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutationTypes.SET_REQUEST_LIST, data)
  },

  [actionTypes.RESET_REQUEST_LIST]: ({ commit }) => {
    commit(mutationTypes.SET_REQUEST_LIST, [])
  },

  [actionTypes.RESET_REQUEST]: ({ state, commit }) => {
    commit(mutationTypes.SET_REQUEST, {})
    commit(mutationTypes.SET_LICENSEE_ATTAHCHED_DOCS, [])
    commit(mutationTypes.SET_MZHI_ATTAHCHED_DOCS, [])
    commit(mutationTypes.SET_INTERNAL_ATTACHED_DOCS, [])
    commit(mutationTypes.SET_REQUEST_STATUSES, [])
  },

  async [actionTypes.FETCH_REQUEST]({ state, dispatch }, requestId) {
    const currentRequestId = requestId || state.request.requestId
    try {
      const request = await fetchRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId: currentRequestId
      })

      delete request._links
      await dispatch(mutationTypes.SET_REQUEST, request)
      dispatch(actionTypes.FETCH_REQUEST_STATUSES)
      dispatch(actionTypes.FETCH_DOC_CHECK)
      dispatch(actionTypes.SET_PROPS_BY_STATUS, state.request.requestStatusId)
    } catch (error) {
      throw error
    }
  },

  async [actionTypes.SAVE_REQUEST]({ state, commit, dispatch }) {
    try {
      await dispatch(actionTypes.SAVE_INTERNAL_DOCS)

      const request = {
        ...state.request,
        gfAttachedDocsByRequestId: [
          ...state.licenseeAttachedDocs,
          ...state.mzhiAttachedDocs,
          ...state.internalAttachedDocs
        ]
      }

      const data = await saveRequestRecord(this.$axios, request)
      await dispatch(actionTypes.SET_REQUEST, data)
      await dispatch(actionTypes.FETCH_DOC_CHECK)
      dispatch(actionTypes.SET_PROPS_BY_STATUS, state.request.requestStatusId)
    } catch (error) {
      console.log(new Error(error))
      throw error
    }
  },

  async [actionTypes.SAVE_INTERNAL_DOCS]({ state, commit }) {
    if (!state.request.requestId) return false

    const array = [...state.internalAttachedDocs]
    const newArray = []

    for (const doc of array) {
      const file = doc.docFile
      let id = doc.docId
      let attachedDoc = null

      if (!doc.docId) {
        doc.requestId = state.request.requestId
        attachedDoc = await postAttachedDoc({
          axiosModule: this.$axios,
          documentEntity: doc
        })

        id = attachedDoc.docId
      }

      if (file) {
        const { updatedObject } = await uploadInternalMzhiDocument({
          axiosModule: this.$axios,
          documentId: id,
          file
        })

        attachedDoc = Object.assign({}, updatedObject)
      } else if (doc.docFileName === 'DELETED') {
        const { updatedObject } = await deleteInternalMzhiDocument({
          axiosModule: this.$axios,
          docId: id
        })

        attachedDoc = Object.assign({}, updatedObject)
      }

      if (attachedDoc) newArray.push(attachedDoc)
      else newArray.push(doc)
    }

    commit(mutationTypes.SET_INTERNAL_ATTACHED_DOCS, newArray)

    return Promise.resolve()
  },

  async [actionTypes.FETCH_REQUEST_STATUSES]({ state, commit }) {
    if (state.request.requestId) {
      const requestStatuses = await fetchNextRequestStatuses({
        axiosModule: this.$axios,
        requestId: state.request.requestId
      })
      commit(mutationTypes.SET_REQUEST_STATUSES, requestStatuses)
    }
  },

  [actionTypes.SET_REQUEST]({ commit }, request) {
    if (!request.requestId) {
      const defaultArraysNames = [
        'gfAttachedDocsByRequestId',
        'gfQueriedDocsByRequestId',
        'gfRefusalReasonRequestId'
      ]

      defaultArraysNames.forEach((defaultObject) => {
        request = Object.assign({}, request, { [defaultObject]: null })
      })
    } else {
      const licenseeAttachedDocs = request.gfAttachedDocsByRequestId
        .filter((attachedDoc) => {
          return (
            attachedDoc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId
              .groupId === 1
          )
        })
        .sort((prevDoc, nextDoc) => prevDoc.docId - nextDoc.docId)

      const mzhiAttachedDocs = request.gfAttachedDocsByRequestId
        .filter((attachedDoc) => {
          return (
            attachedDoc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId
              .groupId === 2
          )
        })
        .sort((prevDoc, nextDoc) => prevDoc.docId - nextDoc.docId)

      const internalAttachedDocs = request.gfAttachedDocsByRequestId
        .filter((attachedDoc) => {
          return (
            attachedDoc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId
              .groupId === 3
          )
        })
        .sort((prevDoc, nextDoc) => prevDoc.docId - nextDoc.docId)

      commit(mutationTypes.SET_LICENSEE_ATTAHCHED_DOCS, licenseeAttachedDocs)
      commit(mutationTypes.SET_MZHI_ATTAHCHED_DOCS, mzhiAttachedDocs)
      commit(mutationTypes.SET_INTERNAL_ATTACHED_DOCS, internalAttachedDocs)
      request.gfAttachedDocsByRequestId = null
    }

    commit(mutationTypes.SET_REQUEST, request)
  },

  async [actionTypes.FETCH_DEFAULT_OBJECTS]({ state, commit }) {
    const defaultObjectsNames = [
      'gfAttachedDocsByRequestId',
      'gfQueriedDocsByRequestId',
      'gfRefusalReasonRequestId'
    ]

    const defaultObjectsArray = defaultObjectsNames.map((defaultObject) => {
      return state[`${defaultObject}Default`]
    })

    if (defaultObjectsArray.some((defaultObject) => !defaultObject)) {
      const defaultRequest = await fetchRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId: 'empty'
      })

      if (!defaultRequest) return

      defaultObjectsNames.forEach((defaultObject) => {
        commit(mutationTypes.SET_DEFAULT_OBJECT, {
          objectName: `${defaultObject}Default`,
          objectValue: () => Object.assign({}, defaultRequest[defaultObject][0])
        })
      })
    }
  },

  async [actionTypes.FETCH_DOC_CHECK]({ state, commit }) {
    if (state.request.requestId && state.request.requestStatusId >= 2) {
      const data = await fetchDocCheckByRequestId({
        axiosModule: this.$axios,
        requestId: state.request.requestId
      })

      if (data.length) {
        commit(mutationTypes.SET_DOC_CHECK, data[0])
      } else if (state.request.requestStatusId === 2) {
        commit(
          mutationTypes.SET_DOC_CHECK,
          Object.assign({}, defaultDocCheck(), {
            requestId: state.request.requestId
          })
        )
      }
    }
  },

  async [actionTypes.SAVE_DOC_CHECK]({ state, commit }) {
    if (state.request.requestStatusId >= 2) {
      const data = await saveDocCheck({
        axiosModule: this.$axios,
        docCheckEntity: state.docCheck
      })
      commit(mutationTypes.SET_DOC_CHECK, data)
    }
  },

  async [actionTypes.CHANGE_REQUEST_STATUS](
    { state, dispatch, commit },
    nextStatusId
  ) {
    dispatch(actionTypes.SET_PROPS_BY_STATUS, nextStatusId)

    await dispatch(actionTypes.SAVE_REQUEST_RELATED)

    await changeRequestStatus({
      axiosModule: this.$axios,
      requestId: state.request.requestId,
      nextStatusId,
      requestStatusId: state.request.requestStatusId
    })

    await dispatch(actionTypes.FETCH_REQUEST)

    if (nextStatusId !== state.request.requestStatusId && nextStatusId === 8) {
      commit(mutationTypes.SET_REQUEST, { ...state.request, abeyance: 'N' })
    }
  },

  async [actionTypes.SAVE_REQUEST_RELATED]({ dispatch }) {
    await dispatch(actionTypes.SAVE_DOC_CHECK)
    await dispatch(actionTypes.SAVE_REQUEST)
  },

  [actionTypes.SET_PROPS_BY_STATUS]({ state, commit }, statusId) {
    // Анализ документов === 5, Оформление решения === 6
    if (statusId === 5 || statusId === 6) {
      // Если Заявление с ЦО=10
      // «Исключение дома из реестра» и Основание =
      // (Решение суда (agreementFoundationId = 5) или Решения ОГЖН (6))
      // то "Тип уведомления" = Распоряжение (GF_REQUEST.DECISION_TYPE=D)
      // и радиогруппа заблокирована

      if (
        state.request.typeId === 10 &&
        (state.request.agreementFoundationId === 5 ||
          state.request.agreementFoundationId === 6)
      ) {
        commit(mutationTypes.SET_PROP, {
          propName: 'decisionType',
          propValue: 'D'
        })
        /* Свойство необходимо только для UI при описание ситуации автоопределения поля типа решения */
        commit(mutationTypes.SET_PROP, {
          propName: 'decisionTypeNotAutoConfigured',
          propValue: 'N'
        })
        return
      }

      // Если в Заявлении есть запись с проверкой нарушений Требования
      // GF_CHECK_VIOLATION.ID с Требованием 6
      // GF_CHECK_VIOLATION.GROUP_ID=6 и
      // (Результат проверки по первичному осмотру=Не соответствует или
      // Результат проверки по осмотру после приостановки=Не соответствует)
      // PRIMARY_INSP_RESULT_ID=2 или ABEYANCE_INSP_RESULT_ID=2
      // то "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
      // и радиогруппа заблокирована

      if (
        state.docCheck.gfCheckViolationsByCheckId &&
        state.docCheck.gfCheckViolationsByCheckId.length
      ) {
        const violation = state.docCheck.gfCheckViolationsByCheckId.find(
          (item) => item.refViolationGroupByGroupId.id === 6
        )

        if (
          violation &&
          (violation.abeyanceInspResultId === 2 ||
            violation.primaryInspResultId === 2)
        ) {
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionType',
            propValue: 'R'
          })
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionTypeNotAutoConfigured',
            propValue: 'N'
          })

          if (
            !state.request.gfRefusalReasonRequestId.find(
              (item) => item.reasonId === 17
            )
          ) {
            commit(mutationTypes.SET_PROP, {
              propName: 'gfRefusalReasonRequestId',
              propValue: [
                ...state.request.gfRefusalReasonRequestId,
                { reasonId: 17 }
              ]
            })
          }

          return
        } else {
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionTypeNotAutoConfigured',
            propValue: 'Y'
          })

          const filteredRefusalReasons = state.request.gfRefusalReasonRequestId.filter(
            (item) => item.reasonId !== 17
          )
          commit(mutationTypes.SET_PROP, {
            propName: 'gfRefusalReasonRequestId',
            propValue: filteredRefusalReasons
          })
        }

        // Если в Заявлении все записи с проверками нарушений Требований
        // GF_CHECK_VIOLATION.ID с "Результат проверки по первичному осмотру"
        // = Соответствует //PRIMARY_INSP_RESULT_ID=1 или с "Результат проверки по
        // осмотру после приостановки" = Соответствует
        // ABEYANCE_INSP_RESULT_ID=1
        // то "Тип уведомления" = Распоряжение (GF_REQUEST.DECISION_TYPE=D)
        // и радиогруппа заблокирована

        const allPrimaryViolationDecided = state.docCheck.gfCheckViolationsByCheckId.filter(
          (item) => item.primaryInspResultId === 1
        )

        const allAbeyanceViolationDecided = state.docCheck.gfCheckViolationsByCheckId.filter(
          (item) => item.abeyanceInspResultId === 1
        )

        if (
          allPrimaryViolationDecided.length ===
            state.docCheck.gfCheckViolationsByCheckId.length ||
          allAbeyanceViolationDecided.length ===
            state.docCheck.gfCheckViolationsByCheckId.length
        ) {
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionType',
            propValue: 'D'
          })
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionTypeNotAutoConfigured',
            propValue: 'N'
          })
          return
        }

        // Если в Заявлении есть хотя бы одна запись с проверкой нарушений Требования
        // GF_CHECK_VIOLATION.ID

        // с Требованием 1
        // GF_CHECK_VIOLATION.GROUP_ID=1 и Результат проверки по первичному осмотру
        // = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 4
        // GF_CHECK_VIOLATION.GROUP_ID=4 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 5
        // GF_CHECK_VIOLATION.GROUP_ID=5 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 6
        // GF_CHECK_VIOLATION.GROUP_ID=6 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2
        // то "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
        // и радиогруппа заблокирована

        if (
          state.docCheck.gfCheckViolationsByCheckId.filter((item) => {
            if (
              item.refViolationGroupByGroupId.id === 1 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 4 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 5 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 6 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            return false
          }).length
        ) {
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionType',
            propValue: 'R'
          })
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionTypeNotAutoConfigured',
            propValue: 'N'
          })
          return
        }

        // Если в Заявлении есть хотя бы одна запись с проверкой нарушений
        // Требования GF_CHECK_VIOLATION.ID и с "Результат проверки по осмотру
        // после приостановки" = Не соответствует
        // ABEYANCE_INSP_RESULT_ID=2 то
        // "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
        //  и радиогруппа заблокирована

        if (
          state.docCheck.gfCheckViolationsByCheckId.find(
            (item) => item.abeyanceInspResultId === 2
          )
        ) {
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionType',
            propValue: 'R'
          })
          commit(mutationTypes.SET_PROP, {
            propName: 'decisionTypeNotAutoConfigured',
            propValue: 'N'
          })
        }
      }
    }

    if (statusId === 8) {
      commit(mutationTypes.SET_REQUEST, { ...state.request, abeyance: 'Y' })
    }
  }
}
