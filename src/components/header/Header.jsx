import css from './Header.module.css';
import Logo from '../logo/Logo';
import UserInfo from '../userinfo/UserInfo';
import Navigation from '../navigation/Navigation';
import Hamburger from '../hamburger/Hamburger';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import useMedia from "../../hooks/useMedia";

const Header = () => {
    const isLogged = useSelector(selectIsLoggedIn);
    const { isMobile, isTablet, isDesktop } = useMedia();
    return (
        <header className={`${isDesktop ? css.headerDesktop : ''} ${isTablet ? css.headerTablet : ''} `}>
            <div className={`${isDesktop ? css.headerContainerDesktop : css.headerContainer}`}>
                
                <ul className={`${css.headerUL} ${isDesktop ? css.headerULDesktop : ''} ${isTablet ? css.headerULTablet : ''} `}>
                    <li>
                        <NavLink to="/diary">
                            <Logo />
                        </NavLink>
                    </li>

                    <li >
                        <Navigation />
                    </li>

                    <li >
                        { isLogged && <UserInfo /> }
                    </li>
                    {(isMobile || isTablet) && isLogged &&
                    <li>
                        <Hamburger />
                    </li>
                    }
                </ul>
                           
            </div>
        </header>
    )
}

export default Header;