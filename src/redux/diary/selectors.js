import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedDate = (state) => state.diary.selectedDate;
export const selectProducts = (state) => state.diary.products || {};

export const selectDiaryProductsByDate = createSelector(
  [selectProducts, selectSelectedDate],
  (products, selectedDate) => products[selectedDate] || []
);