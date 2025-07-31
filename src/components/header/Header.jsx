import css from './Header.module.css';
import Logo from '../logo/Logo';
import UserInfo from '../userinfo/UserInfo';
import Navigation from '../navigation/Navigation';
import Hamburger from '../hamburger/Hamburger';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
//import { selectUser } from "../../redux/auth/selectors";  -> üst satır ile birleştir kullanman gerekirse

import { NavLink } from "react-router-dom";
//import useMedia from "../../hooks/useMedia";

const Header = () => {
    //const { isMobile } = useMedia();
    const isLogged = useSelector(selectIsLoggedIn);
    //const user = useSelector(selectUser);

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

                    <li>
                        <Hamburger />
                    </li>
                </ul>              
            </div>
        </header>
    )
}

export default Header;