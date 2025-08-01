import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToDiary,
  fetchDiaryProductsByDate,
} from "../../redux/diary/operations.js";
import { selectSelectedDate } from "../../redux/diary/selectors.js";
import styles from "./DiaryAddProductForm.module.css";

const DiaryAddProductForm = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [weight, setWeight] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        if (!res.ok) return;
        const data = await res.json();
        setProducts(data);
        setShowSuggestions(true);
      } catch {
        // hata yönetimi
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
      alert("Please select a product!");
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

    // Reset
    setSearchTerm("");
    setProducts([]);
    setSelectedProductId("");
    setWeight(null);
    setShowSuggestions(false);
    if (isMobile) setShowForm(false);
  };

  if (!isMobile) {
    // Masaüstü/tablet hali: form her zaman açık
    return (
      <form onSubmit={handleSubmit} className={styles.desktopForm}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedProductId("");
          }}
          autoComplete="off"
          required
        />
       {showSuggestions && products.length > 0 && (
                  <ul className={styles.suggestionsListScrollable}>
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
          className={styles.inputGram}
          placeholder="Gram"
          value={weight}
          min={1}
          onChange={(e) => setWeight(Number(e.target.value))}
          required
        />
        <button type="submit" className={styles.button}>
          +
        </button>
      </form>
    );
  }

  // Mobil hali:
  return (
    <>
      {!showForm && (
        <>
          {showSuggestions && products.length > 0 && (
                  <ul className={styles.suggestionsListScrollable}>
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
          <button
            type="button"
            className={styles.fabButton}
            onClick={() => setShowForm(true)}
            aria-label="Add "
          >
            +
          </button>
        </>
      )}

      {showForm && (
        <div className={styles.modalOverlay}>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <header className={styles.modalHeader}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Back"
                className={styles.backButton}
              >
                ←
              </button>
            </header>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter product name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedProductId("");
              }}
              autoComplete="off"
              required
              autoFocus
            />
            {showSuggestions && products.length > 0 && (
              <ul className={styles.suggestionsListScrollable}>
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
              className={styles.inputGram}
              placeholder="Gram"
              value={weight}
              min={1}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
            <button type="submit" className={styles.buttonAdd}>
              Add
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default DiaryAddProductForm;
