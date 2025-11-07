const { withProjectBuildGradle } = require("@expo/config-plugins");

module.exports = function gradleFixPlugin(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = config.modResults.contents.replace(
        /jcenter\(.*\)/g,
        `maven {
            url "https://jcenter.bintray.com/"
            allowInsecureProtocol = true
        }`
      );
    }
    return config;
  });
};
