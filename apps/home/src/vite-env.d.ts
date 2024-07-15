/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PILOT_URL: string;
  readonly VITE_WAITLIST_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
