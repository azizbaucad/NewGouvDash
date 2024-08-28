export const mapFormInitialValues = (arr) =>
  arr.reduce((obj, item) => {
    const { key, defaultValue = '' } =
      typeof item === 'object' ? item : { key: item };
    obj[key] = defaultValue;
    return obj;
  }, {});
