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
                <NavLink to="/diary">
                        <p>DIARY</p>
                </NavLink>

                <NavLink to="/calculator">
                        <p>CALCULATOR</p>
                </NavLink>
            </div>
            :
            <div> 
                <NavLink to="/login">
                        <p>LOGIN</p>
                </NavLink>

                <NavLink to="/register">
                        <p>REGISTRATION</p>
                </NavLink>
            </div>
            }
        </div>
    )
}

export default Navigation;