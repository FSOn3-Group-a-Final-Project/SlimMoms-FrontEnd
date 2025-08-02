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
    const { isMobile, isTablet } = useMedia();
    return (
        <header>
            <div className={css.headerContainer}>
                <ul className={css.headerUL}>
                    <li >
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