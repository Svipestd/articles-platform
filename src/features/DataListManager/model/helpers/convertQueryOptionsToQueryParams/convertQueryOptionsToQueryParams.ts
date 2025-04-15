import { UrlHelpers } from '@/shared/lib/url';
import {
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_DEFAULT,
  QueryOptions,
} from '../../types/dataListManagerTypes';

export function convertQueryOptionsToQueryParams(queryOptions: QueryOptions): string {
  const sortOptions = Object.values(queryOptions.sortOptionsMap);

  const filterOptions = Object.values(queryOptions.filterOptionsMap);
  const filterOptionsForParams: Record<string, string | number> = {};
  for (const filterOption of filterOptions) {
    filterOptionsForParams[filterOption.name] = filterOption.value;
  }

  const paginationOptions = queryOptions.paginationOptions;

  return UrlHelpers.getQueryParams({
    _sort: sortOptions[0]?.name || null,
    // _page: String(paginationOptions.page || PAGINATION_PAGE_DEFAULT),
    _limit: String(paginationOptions.limit || PAGINATION_LIMIT_DEFAULT),
    _q: queryOptions.search || null,
    ...filterOptionsForParams,
  });
}
