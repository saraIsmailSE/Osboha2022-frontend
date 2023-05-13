import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install(app) {
    const baseComponents = require.context(
      "../components/base/",
      true,
      /[A-Za-z]\w+\.(vue|js)$/
    );

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = upperFirst(
        camelCase(
          fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
      );
      app.component(
        `Base${componentName}`,
        componentConfig.default || componentConfig
      );
    });

    // const baseComponents = import.meta.globEager("../components/base/*.vue", {
    //   eager: true,
    // });

    // Object.entries(baseComponents).forEach(([path, module]) => {
    //   const componentName = _.upperFirst(
    //     _.camelCase(
    //       path
    //         .split("/")
    //         .pop()
    //         .replace(/\.\w+$/, "")
    //     )
    //   );

    //   app.component(`Base${componentName}`, module.default);
    // });
  },
};
