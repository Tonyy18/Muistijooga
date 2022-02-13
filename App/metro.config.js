// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

//module.exports = getDefaultConfig(__dirname);
module.exports = {
    transformer: {
      minifierConfig: {
        mangle: {
          keep_fnames: true
        }
      }
    }
  }
