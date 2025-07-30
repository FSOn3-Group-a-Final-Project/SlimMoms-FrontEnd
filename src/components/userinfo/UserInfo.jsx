import css from './UserInfo.module.css';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors"

const UserInfo = () => {
    const user = useSelector(selectUser);

    return (
        <div className={css.UserInfoContainer}>
            <p>{user.name}</p> {/*  name yerine username de gelebilir, login olamadığım için test edemedim */}
            <p>Exit</p>
        </div>
    )
}

export default UserInfo;