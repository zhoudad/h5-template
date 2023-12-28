import { defineStore } from 'pinia'

export type TabNameType = 'home' | 'me' | 'courier'

/**
 *  light: 浅色模式，dark: 暗色模式
 */
type ModeType = "light" | "dark"

export const useStore = defineStore('main', {
  state(): {
    mode: ModeType,
    tabActive: TabNameType
  } {
    return {
      mode: 'light',
      tabActive: 'home',
    }
  }
})