import DiaryAddProductForm from "../../components/diaryAddProductForm/DiaryAddProductForm";
import DiaryDateCalendar from "../../components/diaryDateCalendar/DiaryDateСalendar";
import DiaryProductsList from "../../components/diaryProductsList/DiaryProductsList";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaryProductsByDate } from "../../redux/diary/operations";
import {
  selectSelectedDate,
  selectDiarySummary,
} from "../../redux/diary/selectors";

import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const summary = useSelector(selectDiarySummary);
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchDiaryProductsByDate(selectedDate));
    }
  }, [dispatch, selectedDate]);

  return (
    <div className={styles.container}>
      <div className={styles.diaryContent}>
        <DiaryDateCalendar />
        <div className={styles.diaryWrapper}>
          <DiaryAddProductForm />
          <DiaryProductsList />
        </div>
      </div>

      <div className={styles.rightSidebar}>
        <RightSidebar
          date={formatDate(selectedDate)}
          consumed={summary.consumed}
          left={summary.left}
          dailyRate={summary.dailyRate}
          percentOfNormal={summary.percentOfNormal}
          notRecommended={summary.notRecommended}
        />
      </div>
    </div>
  );
};

export default DiaryPage;
