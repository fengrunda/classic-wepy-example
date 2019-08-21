import i18n from 'roddeh-i18n'
const langPackages = {
  'zh_CN': require('./zh_CN.js'),
  'en': require('./en.js')
}
const translators = {}
Object.keys(langPackages).map(lang => {
  const translatorObj = {
    [lang]: i18n.create(langPackages[lang])
  }
  Object.assign(translators, translatorObj)
})
const translate = (lang = 'en') => {
  return translators[lang.toLowerCase().match('zh') ? 'zh_CN' : lang] || translators['en']
}
export {
  translate
}
