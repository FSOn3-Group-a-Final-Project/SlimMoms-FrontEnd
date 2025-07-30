import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromDiary } from "../../redux/diary/operations.js";
import { selectSelectedDate } from "../../redux/diary/selectors.js";
import styles from "./DiaryProductsListItem.module.css";

const DiaryProductsListItem = ({ product }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const handleDelete = () => {
    dispatch(
      deleteProductFromDiary({ date: selectedDate, productId: product._id })
    );
  };

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <p>{product.title}</p>
        <p>{product.weight}g</p>
        <p>{product.calories}g</p>
      </div>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        ❌
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
