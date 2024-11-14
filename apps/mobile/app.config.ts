import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const environment = process.env.NODE_ENV ?? 'development';

  const environmentConfigs = {
    development: {
      ios: {
        bundleIdentifier: 'com.oCorp.oNex',
      },
      android: {
        package: 'com.oCorp.oNex',
      },
    },
    production: {
      ios: {
        bundleIdentifier: 'com.oCorp.oNex',
      },
      android: {
        package: 'com.oCorp.oNex',
      },
    },
  };

  return {
    ...config,
    ...environmentConfigs[environment],
  };
};