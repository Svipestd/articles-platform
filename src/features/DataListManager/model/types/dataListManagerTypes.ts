export enum DisplayType {
  CARD = 'card',
  PREVIEW = 'preview',
}

export interface FilterOptions {
  name: string;
  value: string | number;
}

export type FilterOptionsMap = Record<string, FilterOptions>;

export enum SortOptionsValue {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface SortOptions {
  name: string;
  value: SortOptionsValue;
}

export type SortOptionsMap = Record<string, SortOptions>;

export interface GeneralOptions {
  isInited: boolean;
  scroll: number;
}

export const PAGINATION_PAGE_DEFAULT = 1;
export const PAGINATION_LIMIT_DEFAULT = 10;

export interface PaginationOptions {
  page: number;
  limit: number;
  isLast: boolean;
}

export interface QueryOptions {
  search: string;
  filterOptionsMap: FilterOptionsMap;
  sortOptionsMap: SortOptionsMap;
  paginationOptions: PaginationOptions;
}

export interface ViewOptions {
  displayType: DisplayType;
}

export interface DataListOptions {
  generalOptions: GeneralOptions;
  queryOptions: QueryOptions;
  viewOptions: ViewOptions;
}

export type DataListOptionsMap = Record<DataListManagerModules, DataListOptions>;

export interface DataListManagerSchema {
  dataListOptionsMap: DataListOptionsMap;
}

export enum DataListManagerModules {
  ARTICLES_ALL = 'articlesAll',
  ARTICLES_CURRENT_USER = 'articlesUser',
  ARTICLES_OTHER_USER = 'articlesOtherUser',
}
