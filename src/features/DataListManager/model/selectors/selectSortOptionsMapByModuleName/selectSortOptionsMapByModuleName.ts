import { createSelector } from '@reduxjs/toolkit';
import { dataListManagerSelectors } from '../../slices/dataListManagerSlice/dataListManagerSlice';
import { DataListManagerModules } from '../../types/dataListManagerTypes';

export const selectSortOptionsMapByModuleName = (moduleName: DataListManagerModules) =>
  createSelector(dataListManagerSelectors.selectDataListOptionsMap, (dataListOptionsMap) => {
    return dataListOptionsMap[moduleName].queryOptions.sortOptionsMap;
  });
