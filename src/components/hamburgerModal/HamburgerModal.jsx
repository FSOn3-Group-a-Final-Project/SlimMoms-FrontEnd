import css from './HamburgerModal.module.css';
import { NavLink } from "react-router-dom";

const HamburgerModal = () => {
     

    return (
        <div className={css.HamburgerModalContainer}>
                <ul className={css.HamburgerModalUL}>
                    <li>
                        <NavLink to="/diary" className={css.HamburgerModalNavLink}>
                            <p>DIARY</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/calculator" className={css.HamburgerModalNavLink}>
                            <p>CALCULATOR</p>
                        </NavLink>
                    </li>
                </ul>
        </div>
    )
}

export default HamburgerModal;