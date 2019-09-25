# vuex-analysis

核心要点：

1. 利用 Vue.mixin beforeCreate 注入 store 到根实例和子实例。
2. Store 采用的是模块集合（ModuleCollection）和模块（Module）的设计。
3. new Store 的核心实现为 installModule（挂载 storeOptions）和 resetStoreVM（创建私有 Vue 实例）。
4. store 依靠一个私有的 Vue 实例来实现响应式。
