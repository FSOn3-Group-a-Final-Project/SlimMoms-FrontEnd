import styles from "./DailyCalorieIntake.module.css";

function DailyCalorieIntake({ calories, products }) {
  console.log("Modal'a gelen ürünler:", products); 
  console.log(" RENDER – ürünler props:", products);
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

      <button className={styles.ActionButton}>Start losing weight</button>
    </div>
  );
}
export default DailyCalorieIntake;
