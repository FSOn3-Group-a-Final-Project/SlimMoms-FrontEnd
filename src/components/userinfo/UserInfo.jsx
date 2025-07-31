import css from "./UserInfo.module.css";
import { useSelector, useDispatch  } from "react-redux";
import { selectUser, selectIsRefreshing } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";


const UserInfo = () => {
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
    <div className={css.UserInfoContainer}>
      <p>{user?.name || user?.username || "Kullanıcı adı yok"}</p>
      <p onClick={handleLogout} className={css.LogoutButton}>Exit</p>
    </div>
  );
};

export default UserInfo;