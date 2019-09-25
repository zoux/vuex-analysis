export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    // 通过 mixin 的方式在生命周期 beforeCreate 注入 vuex
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // $options.store 存在则为根实例
    // $options.parent.store 存在则为根实例的子实例
    // 其他则为未挂载的 Vue 实例
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
      // 子组件直接从父组件中获取 $store，这样就保证了所有组件都公用了全局的同一份 store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
