import { useSelector } from "react-redux";
import styles from "./RightSidebar.module.css";
import {
  selectSelectedDate,
  selectDiarySummary,
} from "../../redux/diary/selectors";
import {
  selectDailyCalories,
  selectForbiddenProducts,
} from "../../redux/calculator/selectors";
// import { selectBloodType } from "../../redux/auth/selectors";

function RightSidebar() {
  const selectedDate = useSelector(selectSelectedDate);
  const dailyCalories = useSelector(selectDailyCalories);
  const forbiddenProducts = useSelector(selectForbiddenProducts);
  const { consumed } = useSelector(selectDiarySummary);

  const dailyRate = dailyCalories || 0;
  const left = dailyRate - consumed;
  const percentOfNormal = Math.round((consumed / dailyRate) * 100);

  const notRecommended = Array.isArray(forbiddenProducts)
    ? forbiddenProducts.slice(0, 4)
    : [];

  return (
    <aside className={styles.Sidebar}>
      <div className={styles.SidebarSummary}>
        <p className={styles.Date}>Summary for {selectedDate}</p>
        <ul className={styles.List}>
          <li>
            <span className={styles.Label}>Left</span>
            <span className={styles.Value}>{left} kcal</span>
          </li>
          <li>
            <span className={styles.Label}>Consumed</span>
            <span className={styles.Value}>{consumed} kcal</span>
          </li>
          <li>
            <span className={styles.Label}>Daily rate</span>
            <span className={styles.Value}>{dailyRate} kcal</span>
          </li>
          <li>
            <span className={styles.Label}>% of normal</span>
            <span className={styles.Value}>{percentOfNormal} %</span>
          </li>
        </ul>
      </div>

      <div className={styles.NotRecommended}>
        <p className={styles.NotRecommendedLabel}>Food not recommended</p>
        <ul className={styles.ProductList}>
          {notRecommended.length > 0 ? (
            notRecommended.map((item, index) => (
              <li key={index} className={styles.ProductItem}>
                {item}
              </li>
            ))
          ) : (
            <li>No forbidden products</li>
          )}
        </ul>
      </div>
    </aside>
  );
}

export default RightSidebar;
