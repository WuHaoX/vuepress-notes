"use strict";

// src/build/ssr/vuepressLoader.cts
module.exports = function vuepressLoader(source) {
  const { request } = this;
  return source.replace(
    "script.ssrRender = ssrRender",
    `import { ssrContextKey } from 'vue'
script.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[ssrContextKey]
  ssrContext._registeredComponents.add(${JSON.stringify(request)})
  return ssrRender(...args)
}
`
  );
};
