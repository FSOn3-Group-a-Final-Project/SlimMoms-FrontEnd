import css from './Hamburger.module.css';
import { useState } from 'react';
import hamburger from '/images/hamburger.png?url';
import hamburgerClose from '/images/hamburgerClose.png?url';
import HamburgerModal from '../hamburgerModal/HamburgerModal';

const Hamburger = () => {
  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

  const toggleHamburgerModal = () => {
    setIsHamburgerModalOpen(prev => !prev);
  };

  const closeModal = () => {
    setIsHamburgerModalOpen(false);
  };

  return (
    <div className={css.hamburgerMainContainer}>
      <div onClick={toggleHamburgerModal} className={css.HamburgerContainer}>
        <img src={isHamburgerModalOpen ? hamburgerClose : hamburger} alt="menu" />
      </div>

      {isHamburgerModalOpen && <HamburgerModal onClose={closeModal} />}
    </div>
  );
};

export default Hamburger;
