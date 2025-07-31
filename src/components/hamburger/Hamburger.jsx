import css from './Hamburger.module.css';
import hamburger from '/images/hamburger.png?url';
import useMedia from "../../hooks/useMedia";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors"

const Hamburger = () => {
    const { isMobile, isTablet } = useMedia();
    const isLogged = useSelector(selectIsLoggedIn);

    return(
        <div className={css.hamburgerContainer}>

            {
            (isMobile || isTablet) && isLogged &&
            <div className={css.HamburgerContainer}>
                <img src={hamburger}></img>
            </div>
            }
        </div>
    )
};

export default Hamburger;