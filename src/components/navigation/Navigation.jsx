import css from './Navigation.module.css';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { NavLink } from "react-router-dom";
import useMedia from "../../hooks/useMedia";

const Navigation = () => {
    const isLogged = useSelector(selectIsLoggedIn);
    const { isMobile, isTablet, isDesktop } = useMedia();

    return (
      <div className={css.NavigationContainer}>
        {isLogged ? (
          <div>
            <ul
              className={`${css.NavigationUL} ${
                isDesktop ? css.NavigationUlDesktop : ""
              } ${isMobile || isTablet ? css.deactiveNav : ""}`}
            >
              <li>
                <NavLink
                  to="/diary"
                  className={({ isActive }) =>
                    isActive ? `${css.navLink} ${css.active}` : css.navLink
                  }
                >
                  <p>DIARY</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calculator"
                  className={({ isActive }) =>
                    isActive ? `${css.navLink} ${css.active}` : css.navLink
                  }
                >
                  <p>CALCULATOR</p>
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul
              className={`${css.NavigationUL} ${
                isDesktop ? css.NavigationUlDesktop : ""
              }`}
            >
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${css.navLink} ${css.active}` : css.navLink
                  }
                >
                  <p>LOGIN</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? `${css.navLink} ${css.active}` : css.navLink
                  }
                >
                  <p>REGISTIRATION</p>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default Navigation;