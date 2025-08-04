import css from "./UserInfo.module.css";
import { useSelector, useDispatch  } from "react-redux";
import { selectUser, selectIsRefreshing } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import useMedia from "../../hooks/useMedia";

const UserInfo = () => {
  const { isTablet, isDesktop } = useMedia();

  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isRefreshing && !user?.name && !user?.username) {
    return <div className={css.UserInfoContainer}>Yükleniyor...</div>;
  }

  return (
    <div className={`${css.UserInfoContainer} ${isDesktop ? css.UserInfoContainerDesktop : ''} ${isTablet ? css.UserInfoContainerTablet : ''}`}>
      <div className={css.UserInfoBG}></div>
      <p className={css.userName}>{user?.name || user?.username || "Kullanıcı adı yok"}</p>
      <p onClick={handleLogout} className={css.LogoutButton}>Exit</p>
    </div>
  );
};

export default UserInfo;