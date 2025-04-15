export function pushQueryParams(params: string) {
  window.history.pushState(null, '', params);
}
