/**
 * Converts an object of params to a string literal set of URLSearchParams
 */
export function convertParamsToStringLiteral(requestParams: {
  [key: string]: string | number | string[] | undefined;
}): string {
  const stringLiteralParams = [];

  for (const key in requestParams) {
    if (requestParams.hasOwnProperty(key)) {
      const value = requestParams[key];

      switch (typeof value) {
        case "string":
        case "number":
          stringLiteralParams.push(`${key}=${value}`);
          break;
        case "object":
          stringLiteralParams.push(`${key}=${value.join(",")}`);
          break;
        default:
          break;
      }
    }
  }

  return `?${stringLiteralParams.join("&")}`;
}
