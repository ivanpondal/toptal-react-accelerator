export default function parseQueryParam(
  queryParam: string | string[] | undefined
) {
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
}
