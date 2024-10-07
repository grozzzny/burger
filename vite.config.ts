import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __API_URI__: JSON.stringify(process.env.API_URI) || 'https://norma.nomoreparties.space/api',
    __WS_URI__: JSON.stringify(process.env.WS_URI) || 'wss://norma.nomoreparties.space'
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})
