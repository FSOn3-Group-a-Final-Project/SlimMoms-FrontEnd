import css from "./Loader.module.css";
import smallLogo from "/logo/smallLogo.svg?url";

const Loader = () => {
  return (
    <>
      <div className={css.loaderContainer}>
        <div className={css.loader}>
          <img src={smallLogo} alt="Loading..." className={css.logo} />
          <p className={css.loadingText}>Loading</p>
        </div>
      </div>
    </>
  );
};
export default Loader;
