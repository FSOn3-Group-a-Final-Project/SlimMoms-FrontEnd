import DiaryAddProductForm from "../../components/diaryAddProductForm/DiaryAddProductForm";
import DiaryDateCalendar from "../../components/diaryDateCalendar/DiaryDateСalendar";

const DiaryPage = () => {
  return (
    <div>
      <DiaryDateCalendar />
      <DiaryAddProductForm />
    </div>
  );
};

export default DiaryPage;
