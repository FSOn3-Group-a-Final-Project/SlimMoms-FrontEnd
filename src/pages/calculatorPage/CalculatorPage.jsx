import CalculatorCalorieForm from "../../components/calculatorCalorieForm/CalculatorCalorieForm";
import RightSidebar from '../../components/rightSidebar/RightSidebar';
import styles from "./CalculatorPage.module.css";
import { useState } from "react";

const CalculatorPage = () => {
  const [sidebarData, setSidebarData] = useState({
    date: new Date().toLocaleDateString(),
    left: 0,
    consumed: 0,
    dailyRate: 0,
    percentOfNormal: 0,
    notRecommended: [],
  });

 
  const updateSidebarData = (calories, notAllowedFoods) => {
    setSidebarData({
      date: new Date().toLocaleDateString(),
      left: 0, // Şİmdilik 0
      consumed: 0, // Şimdilik 0
      dailyRate: calories, 
      percentOfNormal: 0, // Şimdilik 0
      notRecommended: notAllowedFoods, 
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <CalculatorCalorieForm onCalculate={updateSidebarData} />
      </div>
      <div className={styles.rightSide}>
        <RightSidebar 
          date={sidebarData.date}
          left={sidebarData.left}
          consumed={sidebarData.consumed}
          dailyRate={sidebarData.dailyRate}
          percentOfNormal={sidebarData.percentOfNormal}
          notRecommended={sidebarData.notRecommended}
        />
      </div>
    </div>
  );
};

export default CalculatorPage;
