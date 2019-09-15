/// <reference types="react-scripts" />
/// <reference types="webpack-env" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DEMO: boolean;
    }
  }

declare module "react-scroll-to-component" {
    export default function scrollToComponent(ref: React.ReactRef<any>)
}