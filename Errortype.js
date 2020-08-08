const DataError = new Error('An error occurred while calling the getData()')
const TranslationApiError = new Error('An error occurred while calling the callTranslationApi()')
const NaturalLangApiError = new Error('An error occurred while calling the callNaturalLangApi()')

module.exports = {
  DataError,
  TranslationApiError,
  NaturalLangApiError
}
