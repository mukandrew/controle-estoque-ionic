import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'controle-estoque',
  webDir: 'dist/controle-estoque',
  server: {
    androidScheme: 'https'
  }
};

export default config;
