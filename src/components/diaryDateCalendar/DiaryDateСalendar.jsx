import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/diary/slice.js';
import { selectSelectedDate } from '../../redux/diary/selectors.js';

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
 const selectedDate = useSelector(selectSelectedDate);
  const handleDateChange = (event) => {
    const chosenDate = event.target.value; // yyyy-mm-dd formatında 
    dispatch(setSelectedDate(chosenDate));
  };

  return (
    <input type="date" value={selectedDate} onChange={handleDateChange} />
  );
};

export default DiaryDateCalendar;
