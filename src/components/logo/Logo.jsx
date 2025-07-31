import css from './Logo.module.css';
import useMedia from "../../hooks/useMedia";
import smallLogo from '/logo/smallLogo.svg?url';
import bigLogo from '/logo/bigLogo.svg?url';
import midLogo from '/logo/midLogo.svg?url';


const Logo = () => {
     const { isMobile, isTablet, isDesktop } = useMedia();

    return (
        <div className={css.LogoContainer}>

            {isMobile && 
            <div>
                <img src={smallLogo}/>
            </div>
            }

            {isTablet && 
            <div>
                <img src={midLogo}/>
            </div>
            }


            {
            isDesktop && 
            <div>
                <img src={bigLogo}/>
            </div>
            }
            
        </div>
    )
}

export default Logo;