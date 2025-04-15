import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DataListManagerSchema,
  DisplayType,
  FilterOptionsMap,
  SortOptionsMap,
  DataListManagerModules,
  DataListOptionsMap,
  QueryOptions,
  PaginationOptions,
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_DEFAULT,
} from '../../types/dataListManagerTypes';
import { selectDataListOptionsMap } from '../../selectors/selectDataListOptionsMap/selectDataListOptionsMap';
import { selectDisplayTypeByModuleName } from '../../selectors/selectDisplayTypeByModuleName/selectDisplayTypeByModuleName';
import { selectSearchByModuleName } from '../../selectors/selectSearchByModuleName/selectSearchByModuleName';
import { selectSortOptionsMapByModuleName } from '../../selectors/selectSortOptionsMapByModuleName/selectSortOptionsMapByModuleName';
import { selectDataListOptionsByModuleName } from '../../selectors/selectDataListOptionsByModuleName/selectDataListOptionsByModuleName';
import { LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP } from '@/shared/const/localStorage';
import { selectViewOptionsByModuleName } from '../../selectors/selectViewOptionsByModuleName/selectViewOptionsByModuleName';
import { selectQueryOptionsByModuleName } from '../../selectors/selectQueryOptionsByModuleName/selectQueryOptionsByModuleName';
import { selectPaginationOptionsByModuleName } from '../../selectors/selectPaginationOptionsByModuleName/selectPaginationOptionsByModuleName';
import { selectGeneralOptionsByModuleName } from '../../selectors/selectGeneralOptionsByModuleName/selectGeneralOptionsByModuleName';
import { convertQueryOptionsToQueryParams } from '../../helpers/convertQueryOptionsToQueryParams/convertQueryOptionsToQueryParams';
import { convertQueryParamsToQueryOptions } from '../../helpers/convertQueryParamsToQueryOptions/convertQueryParamsToQueryOptions';

const initialState: DataListManagerSchema = {
  dataListOptionsMap: {} as DataListOptionsMap,
};

export const dataListManagerSlice = createSlice({
  name: 'dataListManager',
  initialState,
  reducers: {
    init: (state) => {
      const dataListOptionsMap = {} as DataListOptionsMap;
      const dataListManagerModules = DataListManagerModules;

      const dataListOptionsMapFromLSJSON = localStorage.getItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP
      );
      const dataListOptionsMapFromLS = dataListOptionsMapFromLSJSON
        ? JSON.parse(dataListOptionsMapFromLSJSON)
        : null;

      for (const dataListManagerModule of Object.values(dataListManagerModules)) {
        // If module is in LS, assign it to store
        // if (dataListOptionsMapFromLS && dataListOptionsMapFromLS[dataListManagerModule]) {
        //   dataListOptionsMap[dataListManagerModule] = {
        //     ...dataListOptionsMapFromLS[dataListManagerModule],
        //     generalOptions: {
        //       isInited: false,
        //       scroll: dataListOptionsMapFromLS[dataListManagerModule].generalOptions.scroll,
        //     },
        //   };
        //   continue;
        // }

        // Or use default values
        dataListOptionsMap[dataListManagerModule] = {
          generalOptions: {
            isInited: false,
            scroll: 0,
          },
          queryOptions: {
            search: '',
            filterOptionsMap: {},
            sortOptionsMap: {},
            paginationOptions: {
              page: PAGINATION_PAGE_DEFAULT,
              limit: PAGINATION_LIMIT_DEFAULT,
              isLast: false,
            },
          },
          viewOptions: {
            displayType: DisplayType.PREVIEW,
          },
        };
      }

      state.dataListOptionsMap = dataListOptionsMap;
    },

    setIsInited: (
      state,
      action: PayloadAction<{ moduleName: DataListManagerModules; isInited: boolean }>
    ) => {
      const isInited = action.payload.isInited;

      const newGeneralOptions = {
        isInited,
        scroll: state.dataListOptionsMap[action.payload.moduleName].generalOptions.scroll,
      };

      state.dataListOptionsMap[action.payload.moduleName].generalOptions = newGeneralOptions;
    },

    setScroll: (
      state,
      action: PayloadAction<{ moduleName: DataListManagerModules; scroll: number }>
    ) => {
      const scroll = action.payload.scroll;

      const newGeneralOptions = {
        scroll,
        isInited: false,
      };

      state.dataListOptionsMap[action.payload.moduleName].generalOptions = newGeneralOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setDisplayType: (
      state,
      action: PayloadAction<{ moduleName: DataListManagerModules; displayType: DisplayType }>
    ) => {
      const displayType = action.payload.displayType;

      const newViewOptions = {
        displayType: displayType,
      };

      state.dataListOptionsMap[action.payload.moduleName].viewOptions = newViewOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setQueryOptions: (
      state,
      action: PayloadAction<{ moduleName: DataListManagerModules; queryOptions: QueryOptions }>
    ) => {
      const queryOptions = action.payload.queryOptions;

      const newQueryOptions: QueryOptions = { ...queryOptions };

      state.dataListOptionsMap[action.payload.moduleName].queryOptions = newQueryOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setSearch: (
      state,
      action: PayloadAction<{ moduleName: DataListManagerModules; search: string }>
    ) => {
      const module = state.dataListOptionsMap[action.payload.moduleName];
      const search = action.payload.search;

      const newQueryOptions: QueryOptions = {
        search: search,
        filterOptionsMap: module.queryOptions.filterOptionsMap,
        sortOptionsMap: module.queryOptions.sortOptionsMap,
        paginationOptions: module.queryOptions.paginationOptions,
      };

      state.dataListOptionsMap[action.payload.moduleName].queryOptions = newQueryOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setFilterOptionsMap: (
      state,
      action: PayloadAction<{
        moduleName: DataListManagerModules;
        filterOptionsMap: FilterOptionsMap | null;
      }>
    ) => {
      const module = state.dataListOptionsMap[action.payload.moduleName];
      const filterOptionsMap = action.payload.filterOptionsMap;

      const newQueryOptions: QueryOptions = {
        search: module.queryOptions.search,
        filterOptionsMap: filterOptionsMap || {},
        sortOptionsMap: module.queryOptions.sortOptionsMap,
        paginationOptions: module.queryOptions.paginationOptions,
      };

      state.dataListOptionsMap[action.payload.moduleName].queryOptions = newQueryOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setSortOptionsMap: (
      state,
      action: PayloadAction<{
        moduleName: DataListManagerModules;
        sortOptionsMap: SortOptionsMap | null;
      }>
    ) => {
      const module = state.dataListOptionsMap[action.payload.moduleName];
      const sortOptionsMap = action.payload.sortOptionsMap;

      const newQueryOptions: QueryOptions = {
        search: module.queryOptions.search,
        filterOptionsMap: module.queryOptions.filterOptionsMap,
        sortOptionsMap: sortOptionsMap || {},
        paginationOptions: module.queryOptions.paginationOptions,
      };

      state.dataListOptionsMap[action.payload.moduleName].queryOptions = newQueryOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },

    setPaginationOptions: (
      state,
      action: PayloadAction<{
        moduleName: DataListManagerModules;
        paginationOptions: Partial<PaginationOptions>;
      }>
    ) => {
      const module = state.dataListOptionsMap[action.payload.moduleName];
      const paginationOptions = action.payload.paginationOptions;

      const newQueryOptions: QueryOptions = {
        search: module.queryOptions.search,
        filterOptionsMap: module.queryOptions.filterOptionsMap,
        sortOptionsMap: module.queryOptions.sortOptionsMap,
        paginationOptions: {
          page: paginationOptions.page || module.queryOptions.paginationOptions.page,
          limit: paginationOptions.limit || module.queryOptions.paginationOptions.limit,
          isLast:
            paginationOptions.isLast !== undefined
              ? paginationOptions.isLast
              : module.queryOptions.paginationOptions.isLast,
        },
      };

      state.dataListOptionsMap[action.payload.moduleName].queryOptions = newQueryOptions;
      localStorage.setItem(
        LOCAL_STORAGE_DATA_LIST_OPTIONS_MAP,
        JSON.stringify(state.dataListOptionsMap)
      );
    },
  },
});

export const { actions: dataListManagerActions } = dataListManagerSlice;
export const { reducer: dataListManagerReducer } = dataListManagerSlice;
export const dataListManagerSelectors = {
  selectDataListOptionsMap,
  selectDataListOptionsByModuleName,
  selectQueryOptionsByModuleName,
  selectViewOptionsByModuleName,
  selectDisplayTypeByModuleName,
  selectSearchByModuleName,
  selectSortOptionsMapByModuleName,
  selectPaginationOptionsByModuleName,
  selectGeneralOptionsByModuleName,
};
export const dataListManagerHelpers = {
  convertQueryOptionsToQueryParams,
  convertQueryParamsToQueryOptions,
};
