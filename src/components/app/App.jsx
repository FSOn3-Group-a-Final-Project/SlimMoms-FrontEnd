import css from './App.module.css';
import TestModalPage from '../../pages/TestModalPage/TestModalPage';
function App() {
  return (
    <div className={css.appContainer}>
      <h1>Welcome to Slim Moms App</h1>
      <p>Comming Soon...</p>
      <TestModalPage/>
    </div>
  );
}
export default App;