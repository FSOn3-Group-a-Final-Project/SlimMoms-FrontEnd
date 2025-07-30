import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectDiaryProductsByDate, selectSelectedDate } from "../../redux/diary/selectors";
import DiaryProductsListItem from "../diaryProductsListItem/DiaryProductsListItem";
import styles from "./DiaryProductsList.module.css";
import { fetchDiaryProductsByDate } from "../../redux/diary/operations";
import { selectDiaryLoading } from "../../redux/diary/selectors";

const DiaryProductsList = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const products = useSelector(selectDiaryProductsByDate);
    const loading = useSelector(selectDiaryLoading);

 useEffect(() => {
    dispatch(fetchDiaryProductsByDate(selectedDate));
  }, [dispatch, selectedDate]);

  if (loading) {
    return <p className={styles.empty}>Loading...</p>;
  }

  console.log("DiaryProductsList products:", products);
  if (!Array.isArray(products) || products.length === 0) {
    return <p className={styles.empty}>Product not added yet</p>;
  }
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <DiaryProductsListItem key={product._id || product.id} product={product.product} />
      ))}
    </ul>
  );
};
export default DiaryProductsList;
