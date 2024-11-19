import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../docs'
  },
  base: "",
  server: {
    port: 8080
  }
}
