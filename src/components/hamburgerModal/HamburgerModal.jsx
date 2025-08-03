import css from './HamburgerModal.module.css';
import { NavLink } from "react-router-dom";
import useMedia from "../../hooks/useMedia";


const HamburgerModal = () => {
    const { isTablet } = useMedia();

    return (
        <div className={css.HamburgerModalContainer}>
                <ul className={css.HamburgerModalUL}>
                    <li>
                        <NavLink to="/diary" className={`${css.HamburgerModalNavLink} ${isTablet ? css.HamburgerModalNavLinkTablet : ''}`}>
                            <p>DIARY</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calculator" className={`${css.HamburgerModalNavLink} ${isTablet ? css.HamburgerModalNavLinkTablet : ''}`}>
                            <p>CALCULATOR</p>
                        </NavLink>
                    </li>
                </ul>
        </div>
    )
}

export default HamburgerModal;