import CalculatorCalorieForm from "../../components/calculatorCalorieForm/CalculatorCalorieForm";
// import RightSideBar from '../../components/rightSideBar/RightSideBar';
import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <CalculatorCalorieForm />
      </div>
      {/* <div className={styles.rightSide}>
        <RightSideBar />
      </div> */}
    </div>
  );
};

export default CalculatorPage;
