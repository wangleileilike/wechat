import Vuex from '@wepy/x'
import customer from './customer'
import overview from './overview'
import callbox from './callbox'
import template from './template'

export default new Vuex.Store({
  modules: {
    customer,
    overview,
    callbox,
    template
  }
  // strict: pro
  // plugins: []
})
