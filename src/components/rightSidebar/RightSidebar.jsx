import styles from "./RightSidebar.module.css";

function RightSidebar({
  date,
  left,
  consumed,
  dailyRate,
  percentOfNormal,
  notRecommended,
}) {
  return (
    <>
      <aside className={styles.Sidebar}>
        <div className={styles.SidebarContent}>
          <div className={styles.SidebarSummary}>
          <p className={styles.Date}>Summary for {date}</p>
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
                <li className={styles.Placeholder}>
                  Your diet will be displayed here
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
