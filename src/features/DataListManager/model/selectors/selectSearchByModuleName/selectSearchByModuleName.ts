import { createSelector } from '@reduxjs/toolkit';
import { dataListManagerSelectors } from '../../slices/dataListManagerSlice/dataListManagerSlice';
import { DataListManagerModules } from '../../types/dataListManagerTypes';

export const selectSearchByModuleName = (moduleName: DataListManagerModules) =>
  createSelector(dataListManagerSelectors.selectDataListOptionsMap, (dataListOptionsMap) => {
    return dataListOptionsMap[moduleName].queryOptions.search;
  });
