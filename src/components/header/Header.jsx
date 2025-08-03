import { useState } from 'react';
import css from './Header.module.css';
import Logo from '../logo/Logo';
import UserInfo from '../userinfo/UserInfo';
import Navigation from '../navigation/Navigation';
import Hamburger from '../hamburger/Hamburger';
import HamburgerModal from "../hamburgerModal/HamburgerModal"; // 💡 bunu eklemeyi unutma

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";

import useMedia from "../../hooks/useMedia";

const Header = () => {
    const isLogged = useSelector(selectIsLoggedIn);
    const { isMobile, isTablet } = useMedia();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <header>
            <div className={css.headerContainer}>
                <ul className={css.headerUL}>
                    <li>
                        <NavLink to="/diary">
                            <Logo />
                        </NavLink>
                    </li>

                    <li>
                        <Navigation />
                    </li>

                    <li>
                        {isLogged && <UserInfo />}
                    </li>

                    {(isMobile || isTablet) && isLogged &&
                        <li>
                            <Hamburger onClick={handleOpenModal} />
                        </li>
                    }
                </ul>
            </div>

            {/* Modalı buraya ekle */}
            {isModalOpen && <HamburgerModal onClose={handleCloseModal} />}
        </header>
    );
};

export default Header;
