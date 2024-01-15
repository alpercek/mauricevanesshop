export const state = () => ({
  settings: {},
  navigation: {},
  shipping: {}
})

export const mutations = {
  setSettings (state, settings) {
    state.settings = settings
  },
  setNavigation (state, navigation) {
    state.navigation = navigation
  },
  setShipping (state, shipping) {
    state.shipping = shipping
  }
}

export const actions = {
  async load (store) {
    const navigation = await this.$prismic.api.getSingle('navigation')
    const settings = await this.$prismic.api.getSingle('settings')
    const shipping = await this.$prismic.api.getSingle('shipping')

    store.commit('setNavigation', navigation)
    store.commit('setSettings', settings)
    store.commit('setShipping', shipping)
  }
}
