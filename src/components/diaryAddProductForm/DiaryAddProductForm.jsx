import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToDiary } from "../../redux/diary/operations.js";
import styles from "./DiaryAddProductForm.module.css";
import { selectSelectedDate } from "../../redux/diary/selectors.js";
import { fetchDiaryProductsByDate } from "../../redux/diary/operations.js";


const DiaryAddProductForm = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [weight, setWeight] = useState(100);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setProducts([]);
      setSelectedProductId("");
      setShowSuggestions(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/products?search=${searchTerm}`);
        if (!res.ok) {
          console.error("Fetch hatası:", res.status);
          return;
        }
        const data = await res.json();
        setProducts(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Ürün arama hatası:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSelect = (product) => {
    setSearchTerm(product.title);
    setSelectedProductId(product._id);
    setShowSuggestions(false);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedProductId) {
    alert("Lütfen ürün seçin!");
    return;
  }
  await dispatch(
    addProductToDiary({
      productId: selectedProductId,
      weight,
      date: selectedDate,
    })
  );

  dispatch(fetchDiaryProductsByDate(selectedDate));

  // Temizle
  setSearchTerm("");
  setProducts([]);
  setSelectedProductId("");
  setWeight(100);
  setShowSuggestions(false);
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Ürün adı girin"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedProductId(""); // Yeni aramadan önce seçimi sıfırla
        }}
        autoComplete="off"
        required
      />
      {showSuggestions && products.length > 0 && (
        <ul className={styles.suggestionsList}>
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSelect(product)}
              className={styles.suggestionItem}
              onMouseDown={(e) => e.preventDefault()}
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}

      <input
        type="number"
        className={styles.input}
        placeholder="Gram"
        value={weight}
        min={1}
        onChange={(e) => setWeight(Number(e.target.value))}
        required
      />

      <button type="submit" className={styles.button}>
        Ekle
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
