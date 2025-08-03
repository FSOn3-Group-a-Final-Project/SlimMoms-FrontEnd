import { useSelector } from "react-redux"; // Redux verisi çekmek için
import styles from "./RightSidebar.module.css";
import {
  selectSelectedDate,
  selectDiaryProductsByDate,
} from "../../redux/diary/selectors";
import { selectBloodType } from "../../redux/auth/selectors"; // kan grubu selectorü


const selectForbiddenProducts = (state) => state.diary.calorieResult.forbiddenProducts;

function RightSidebar() {
  //  Redux'tan seçilen tarih
  const selectedDate = useSelector(selectSelectedDate); //tarih
  const products = useSelector(selectDiaryProductsByDate); // o tarihtetki ürünler
  const forbiddenProducts = useSelector(  state => state.diary.calorieResult.forbiddenProducts
); //selectForbiddenProducts
  //Test için
  console.log("PRODUCTS:", products);

  //kan grubu (1-4)
  const bloodType = useSelector(selectBloodType);
  //  Toplam tüketilen kalori (consumed) hesaplaması
  const consumed = products?.reduce(
    (total, p) => total + (p.product.calories || 0),
    0
  );

  //  Şimdilik sabit günlük hedef (ileride Redux'tan alınacak)
  const dailyRate = 2200;
  //  Kalan kalori
  const left = dailyRate - consumed;

  //  Normal oranın yüzdesi
  const percentOfNormal = Math.round((consumed / dailyRate) * 100);


  //  Önerilmeyen ürünleri kan grubuna göre filtrele
const notRecommended = Array.isArray(forbiddenProducts)
  ? forbiddenProducts.slice(0, 4)
  : [];

  return (
    <>
      <aside className={styles.Sidebar}>

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
        <div className={styles.NotRecommended}>
          <p className={styles.NotRecommendedLabel}>Food not recommended</p>
          <ul className={styles.ProductList}>
            {notRecommended.length > 0 ? (
              notRecommended.map((item, index) => (
                <li key={index} className={styles.ProductItem}>
                {typeof item === "string" ? item : item.title}

                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
export default RightSidebar;
