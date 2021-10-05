import { inject, provide } from 'vue'

function createStore<T extends object>(instance: T) {
  const key = Symbol()

  return {
    useStore() {
      const store = inject<T>(key)
      if (store) return store
      else {
        throw new Error('no such store')
      }
    },
    provideStore() {
      provide<T>(key, instance)
    }
  }
}

export default createStore
