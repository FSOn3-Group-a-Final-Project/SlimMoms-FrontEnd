import DiaryAddProductForm from "../../components/diaryAddProductForm/DiaryAddProductForm";
import DiaryDateCalendar from "../../components/diaryDateCalendar/DiaryDateСalendar";
//import RightSidebar from "../../components/rightSidebar/RightSidebar";
import DiaryProductsList from "../../components/diaryProductsList/DiaryProductsList";
const DiaryPage = () => {
  return (
    <div>
      <DiaryDateCalendar />
      <DiaryAddProductForm />
      <DiaryProductsList/>

    </div>
  );
};

export default DiaryPage;
