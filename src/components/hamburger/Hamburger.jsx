import css from "./Hamburger.module.css";
import { useState } from "react";
import hamburger from "/images/hamburger.png?url";
import hamburgerClose from "/images/hamburgerClose.png?url";
import HamburgerModal from "../hamburgerModal/HamburgerModal";
import useMedia from "../../hooks/useMedia";

const Hamburger = () => {
  const { isTablet, isDesktop } = useMedia();
  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

  const toggleHamburgerModal = () => {
    setIsHamburgerModalOpen((prev) => !prev);
  };

  return (
    <div className={css.hamburgerMainContainer}>
      <div
        onClick={toggleHamburgerModal}
        className={`${css.HamburgerContainer} ${
          isDesktop ? css.HamburgerContainerDesktop : ""
        } ${isTablet ? css.HamburgerContainerTablet : ""}`}
      >
        {isHamburgerModalOpen ? (
          <img src={hamburgerClose} />
        ) : (
          <img src={hamburger} />
        )}
      </div>

      {isHamburgerModalOpen && (
        <HamburgerModal onClose={() => setIsHamburgerModalOpen(false)} />
      )}
    </div>
  );
};

export default Hamburger;
