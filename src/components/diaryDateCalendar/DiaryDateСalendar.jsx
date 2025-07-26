import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../redux/diary/slice.js';

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    const chosenDate = event.target.value; // yyyy-mm-dd formatında 
    dispatch(setSelectedDate(chosenDate));
  };

  return (
    <input type="date" onChange={handleDateChange} />
  );
};

export default DiaryDateCalendar;
