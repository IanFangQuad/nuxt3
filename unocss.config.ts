import type { Theme } from '@unocss/preset-mini'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  rules: [
    // ...
  ],
  theme: <Theme>{
    // ...
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
})