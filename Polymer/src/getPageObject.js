const getPageObject = (path, routeSchema) => {

  path = (new URL(path, window.location.origin)).pathname;

  let pageObj;
  if (path === '/' || path === '') {
    // if the path is the root path use the root object
    pageObj = routeSchema.root;
  }
  else {
    const pathArr = path.split('/').filter(a => a.length > 0);
    // loop trough all paths until a matching pageObject is found by the path
    const findPageObj = (paths, depth = 0) => {
      let skip = false;

      for (const pagePath in paths) {
        if (Object.prototype.hasOwnProperty.call(paths, pagePath)) {
          const parts = pagePath.split('/').filter(a => a.length > 0);
          const config = {};
          // loop trough every single path
          for (let i = 0; i < parts.length; i += 1) {
            let match = false;
            const part = parts[i];
            const pathPart = pathArr[depth + i];

            // when the url of the route is longer then the original path break as it can't be a match
            if (pathPart === undefined) break;

            // compare everything before the : for a match
            // use everything after the : as the variable name in the config object
            const index = part.indexOf(':');
            if (index !== -1) {
              if (part.substr(0, index) === pathPart.substr(0, index)) match = true;
              const valueName = part.substr(index + 1);
              if (valueName) {
                config[valueName] = pathPart;
              }
            }

            // compare for a complete match of the
            if (part === pathPart) match = true;

            if (!match) {
              skip = true;
            }
          }
          if (!skip) {
            // if a match was found and the length of the route path is the same as the input path that means we have found the correct pageObject
            if (pathArr.length === parts.length + depth) {
              return Object.assign(paths[pagePath], {
                path: pagePath,
                config
              });
            }
            // when the input path is longer then the current route path look for a match in sub pages
            // when sub pages don't exist, don't return anything as we couldn't find a matching pageObject
            if ('subPages' in paths[pagePath]) {
              const pageObj = findPageObj(paths[pagePath].subPages, depth + parts.length);
              if (pageObj) {
                return {
                  ...pageObj,
                  path: `${pagePath}/${pageObj.path}`,
                  config: Object.assign(pageObj.config, config)
                };
              }
            }
          }
          else {
            skip = false;
          }
        }
      }
    };
    const tmp = findPageObj(routeSchema.pages);
    if (tmp) {
      pageObj = { ...tmp };
    }
    else {
      // when no pageObject was found revert to the 404 page
      pageObj = {
        ...routeSchema['404'],
        config: {}
      };
    }
  }

  pageObj.url = path;

  for (const k in routeSchema.default) {
    // if a property from the default pageObject is missing, add it with the default value
    if (!(k in pageObj)) pageObj[k] = routeSchema.default[k];
  }

  for (const k in pageObj) {
    // look for functions in the pageObject, when found call them and replace them with their result
    if (typeof pageObj[k] === 'function') {
      const res = pageObj[k](pageObj, path);
      if (typeof res === 'function') {
        throw new Error('The result of a schema function can\'t be a function');
      }
      pageObj[k] = res;
    }
  }

  if ('redirect' in pageObj) {
    // when redirected resolve that path and then return pageObject of the redirected page
    const url = pageObj.redirect;
    if (url) {
      if (typeof url === 'function') {
        throw new Error('The result of a schema function can\'t be a function');
      }
      const pageObj = getPageObject(url, routeSchema);
      if (!pageObj.redirect) pageObj.redirect = url;
      return pageObj;
    }
  }
  return pageObj;
};

export default getPageObject;