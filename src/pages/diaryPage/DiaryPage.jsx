import DiaryAddProductForm from "../../components/diaryAddProductForm/DiaryAddProductForm";
import DiaryDateCalendar from "../../components/diaryDateCalendar/DiaryDateСalendar";
import DiaryProductsList from "../../components/diaryProductsList/DiaryProductsList";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryProductsByDate } from "../../redux/diary/operations";
import {
  selectSelectedDate,
  selectProducts,
} from "../../redux/diary/selectors";

import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const productsData = useSelector(selectProducts)[selectedDate] || {};
  console.log("selectedDate", selectedDate);
  console.log("productsData", productsData);

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchDiaryProductsByDate(selectedDate));
    }
  }, [dispatch, selectedDate]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <DiaryDateCalendar />
        <DiaryAddProductForm />
        <DiaryProductsList />
      </div>
      <div className={styles.rightSidebar}>
      <RightSidebar
        date={selectedDate}
        left={productsData.left || 0}
        consumed={productsData.consumed || 0}
        dailyRate={productsData.dailyRate || 0}
        percentOfNormal={productsData.percentOfNormal || 0}
        notRecommended={productsData.notRecommended || []}
      />
      </div>
    </div>
  );
};

export default DiaryPage;
