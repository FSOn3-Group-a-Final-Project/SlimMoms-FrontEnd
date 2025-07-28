import DailyCaloriesForm from "../../components/dailyCaloriesForm/DailyCaloriesForm";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
      </div>
      <div className={styles.formWrapper}>
        <DailyCaloriesForm />
      </div>
    </div>
  );
};

export default MainPage;
