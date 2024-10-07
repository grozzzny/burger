import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1400,
  viewportHeight: 1024,
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/*.cy.{ts,tsx}'
  }
})
