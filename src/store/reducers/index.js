import { combineReducers } from 'redux'
import counter from './counter'
import i18n from './i18n'

export default combineReducers({
  counter,
  i18n
})
