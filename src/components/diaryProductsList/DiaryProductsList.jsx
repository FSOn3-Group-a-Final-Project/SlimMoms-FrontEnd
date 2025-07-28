import { useSelector } from "react-redux";
import { selectDiaryProductsByDate } from "../../redux/diary/selectors";
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem.jsx";
import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = () => {
  const products = useSelector(selectDiaryProductsByDate) || [];
  console.log("DiaryProductsList products:", products);
  if (!products.length) {
    return <p className={styles.empty}>Product not added yet</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <DiaryProductsListItem key={product._id} product={product} />
      ))}
    </ul>
  );
};

export default DiaryProductsList;
