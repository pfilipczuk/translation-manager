/// <reference types="react-scripts" />
/// <reference types="webpack-env" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DEMO: boolean
    }
  }