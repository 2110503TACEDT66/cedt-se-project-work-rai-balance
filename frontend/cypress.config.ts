import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: {
    userUs1Email: "cypress2@gmail.com",
    userEmail: "cypress@gmail.com",
    userPass: "123456",
    adminEmail: "admin@gmail.com",
    adminPass: "123456",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    experimentalStudio: true
  },
});
