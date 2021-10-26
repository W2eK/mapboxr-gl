export const normalize = obj =>
  Object.entries(obj).reduce((obj, [key, value]) => {
    if (key.match(/[A-Z]/))
      key = key.replace(/[A-Z]/g, x => `-${x.toLowerCase()}`);
    obj[key] = value;
    return obj;
  }, {});
