import { handleActions } from 'redux-actions'
import { INITIAL_LANGUAGE } from '../types/i18n'

export default handleActions(
  {
    [INITIAL_LANGUAGE] (state, { payload: { language } }) {
      // console.log('handleActions', language, translator)
      return {
        ...state,
        language
      }
    }
  },
  {
    language: ''
  }
)
