import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromDiary } from "../../redux/diary/operations.js";
import { selectSelectedDate } from "../../redux/diary/selectors.js";
import styles from "./DiaryProductsListItem.module.css";

const DiaryProductsListItem = ({ product, weight }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const handleDelete = () => {
    dispatch(
      deleteProductFromDiary({ date: selectedDate, productId: product._id,  })
    );
  };

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <p>{product.title}</p>
        <p>{weight}g</p>
        <p>{((product.calories / 100) * weight).toFixed(0)} kcal</p>
      </div>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        ❌
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
