import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedDate = (state) => state.diary.selectedDate;
export const selectProducts = (state) => state.diary.products || {};


export const selectDiaryProductsByDate = createSelector(
  [selectProducts, selectSelectedDate],
  (products, selectedDate) => {
    const entry = products[selectedDate];
    // Eğer entry varsa ve içinde products dizisi varsa onu döndür
    return entry && Array.isArray(entry.products) ? entry.products : [];
  }
);

export const selectDiaryLoading = (state) => state.diary.loading;