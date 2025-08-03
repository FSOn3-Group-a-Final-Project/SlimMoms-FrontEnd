import css from './Logo.module.css';
import useMedia from "../../hooks/useMedia";
import smallLogo from '/logo/smallLogo.svg?url';
import bigLogo from '/logo/bigLogo.svg?url';
import midLogo from '/logo/midLogo.svg?url';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Logo = () => {
    const { isMobile, isTablet, isDesktop } = useMedia();
    const isLogged = useSelector(selectIsLoggedIn);
    return (
        <div className={`${css.logoContainer} ${isDesktop ? css.logoContainerDesktop : ''}`}>
            <div>
                {isMobile && (isLogged ? <img src={midLogo}/> : <img src={smallLogo}/> )}
                {isTablet && <img src={midLogo}/>}
                {isDesktop && <img src={bigLogo}/>}
            </div>           
        </div>
    )
}

export default Logo;