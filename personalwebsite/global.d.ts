// global.d.ts
declare module '*.jpg' {
    const value: string;
    export default value;
  }

declare module '*.pdf' {
    const src: string;
    export default src;
  }
  