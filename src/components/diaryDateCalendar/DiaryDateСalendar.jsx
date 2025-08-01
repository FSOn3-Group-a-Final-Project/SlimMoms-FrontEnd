import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/diary/slice.js';
import { selectSelectedDate } from '../../redux/diary/selectors.js';
import styles from './DiaryDateCalendar.module.css';

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const handleDateChange = (event) => {
    const chosenDate = event.target.value;
    dispatch(setSelectedDate(chosenDate));
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className={styles.dateWrapper}>
      <input
        type="date"
        className={styles.dateInput}
        value={selectedDate}
        onChange={handleDateChange}
        max={today}
      />
    </div>
  );
};

export default DiaryDateCalendar;

