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

export const selectDiarySummary = createSelector(
  [selectProducts, selectSelectedDate],
  (products, selectedDate) => {
    const entry = products[selectedDate];
    if (!entry || !Array.isArray(entry.products)) return {
      consumed: 0,
      left: 0,
      dailyRate: 0,
      percentOfNormal: 0,
      notRecommended: [],
    };

    const dailyRate = entry.dailyRate || 0;
    const productList = entry.products;

    const consumed = productList.reduce((sum, item) => {
      return sum + Math.round((item.product.calories / 100) * item.weight);
    }, 0);

    const left = dailyRate - consumed;
    const percentOfNormal = dailyRate ? Math.round((consumed / dailyRate) * 100) : 0;

    return {
      consumed,
      left,
      dailyRate,
      percentOfNormal,
      notRecommended: entry.notRecommended || [],
    };
  }
);