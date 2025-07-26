import css from './App.module.css';
import TestModalPage from '../../pages/TestModalPage/TestModalPage';
import TestRightSidebar from '../../pages/TestRightSidebar/TestRightSidebar';
import DiaryAddProductForm from '../diaryAddProductForm/DiaryAddProductForm';

function App() {
  return (
    <div className={css.appContainer}>
      <h1>Welcome to Slim Moms App</h1>
      <p>Comming Soon...</p>
      <TestModalPage/>
      <TestRightSidebar/>
      <DiaryAddProductForm/>
    </div>
  );
}
export default App;