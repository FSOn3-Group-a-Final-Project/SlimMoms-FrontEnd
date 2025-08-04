import styles from "./DailyCalorieIntake.module.css";
import { useNavigate } from "react-router-dom";

function DailyCalorieIntake({ calories, products }) {
  const navigate = useNavigate(); 
  console.assert(Array.isArray(products), " products bir dizi değil!");
  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Your recommended daily calorie intake is</h2>
      <p className={styles.CalorieValue}>{calories} kcal</p>
      <h3 className={styles.Subtitle}>Foods you should not eat</h3>
      <ul className={styles.ProductList}>
        {(products || []).map((item, index) => (
          <li key={index} className={styles.ProductItem}>
            {typeof item === "object" ? item.title : item}
          </li>
        ))}
      </ul>

      <button className={styles.ActionButton} onClick={() => navigate("/diary")}>Start losing weight </button>
    </div>
  );
}
export default DailyCalorieIntake;
