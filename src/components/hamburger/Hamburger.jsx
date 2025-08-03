import css from './Hamburger.module.css';
import { useState } from 'react';
import hamburger from '/images/hamburger.png?url';
import hamburgerClose from '/images/hamburgerClose.png?url';
import HamburgerModal from '../hamburgerModal/HamburgerModal';
//import useMedia from "../../hooks/useMedia";
//import { useSelector } from "react-redux";
//import { selectIsLoggedIn } from "../../redux/auth/selectors"

const Hamburger = () => {
    //const { isMobile, isTablet } = useMedia();
    //const isLogged = useSelector(selectIsLoggedIn);
    const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

    const toggleHamburgerModal = () => {
        setIsHamburgerModalOpen(prev => !prev);
    }

    return(
        <div className={css.hamburgerMainContainer}>
            <div onClick={toggleHamburgerModal} className={css.HamburgerContainer}>
                {isHamburgerModalOpen ? <img src={hamburgerClose}></img>  : <img src={hamburger}></img>}
            </div>
            {isHamburgerModalOpen ? <HamburgerModal/> : ''}
        </div>
    )
};

export default Hamburger;