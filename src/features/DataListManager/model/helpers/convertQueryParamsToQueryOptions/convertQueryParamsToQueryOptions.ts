import {
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_DEFAULT,
  QueryOptions,
  SortOptions,
  SortOptionsMap,
  SortOptionsValue,
} from '../../types/dataListManagerTypes';

export function convertQueryParamsToQueryOptions(queryParams: URLSearchParams): QueryOptions {
  const sortOptionsMap: SortOptionsMap = {};
  const querySortOption = queryParams.get('_sort');

  if (querySortOption) {
    sortOptionsMap[querySortOption as keyof SortOptionsMap] = {
      name: querySortOption,
      value: SortOptionsValue.DESC,
    };
  }

  return {
    search: queryParams.get('_q') || '',
    sortOptionsMap: sortOptionsMap,
    filterOptionsMap: {},
    paginationOptions: {
      page: PAGINATION_PAGE_DEFAULT,
      isLast: false,
      limit: Number(queryParams.get('_limit')) || PAGINATION_LIMIT_DEFAULT,
    },
  };
}
