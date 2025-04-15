export function getQueryParams(paramsToAdd?: OptionalRecord<string, string | null | undefined>) {
  const searchParams = new URLSearchParams(window.location.search);

  if (paramsToAdd) {
    Object.entries(paramsToAdd).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
  }

  return `?${searchParams.toString()}`;
}
