import { INITIAL_LANGUAGE } from '../types/i18n'
import { createAction } from 'redux-actions'

export const initialLanguage = createAction(INITIAL_LANGUAGE, (lang) => {
  // console.log(lang)
  return new Promise(resolve => {
    // setTimeout(() => {
    resolve({ language: lang })
    // }, 1000)
  })
})
