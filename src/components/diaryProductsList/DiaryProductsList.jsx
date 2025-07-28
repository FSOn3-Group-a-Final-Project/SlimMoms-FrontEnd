import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectDiaryProductsByDate,
  selectSelectedDate,
} from "../../redux/diary/selectors";
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem.jsx";
import styles from "./DiaryProductsList.module.css";
import { fetchDiaryProductsByDate } from "../../redux/diary/operations";
const DiaryProductsList = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const products = useSelector(selectDiaryProductsByDate);
  useEffect(() => {
    dispatch(fetchDiaryProductsByDate(selectedDate));
  }, [dispatch, selectedDate]);
  console.log("DiaryProductsList products:", products);
  if (!Array.isArray(products) || products.length === 0) {
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
