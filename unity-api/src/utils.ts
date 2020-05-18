import * as _ from "lodash";

export const toCamelCase = (data = {}) => {
  const normalizedObj: any = {};

  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = _.camelCase(key);

    normalizedObj[normalizedKey] = value;
  }

  return normalizedObj;
};
