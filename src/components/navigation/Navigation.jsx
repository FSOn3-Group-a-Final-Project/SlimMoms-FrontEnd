import css from './Navigation.module.css';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { NavLink } from "react-router-dom";


const Navigation = () => {
    const isLogged = useSelector(selectIsLoggedIn);

    return (
        <div className={css.NavigationContainer}>
            {isLogged ? 
            <div> 
                <ul className={css.NavigationUL}>
                    <li>
                        <NavLink to="/diary" className={css.navLink}>
                            <p>DIARY</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calculator" className={css.navLink}>
                            <p>CALCULATOR</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
            :
            <div> 
                <ul className={css.NavigationUL}>
                    <li>
                        <NavLink to="/login" className={css.navLink}>
                            <p>LOGIN</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={css.navLink}>
                            <p>REGISTIRATION</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
            }

        </div>
    )
}

export default Navigation;