import css from "./UserInfo.module.css";
import { useSelector } from "react-redux";
import { selectUser, selectIsRefreshing } from "../../redux/auth/selectors";

const UserInfo = () => {
  const user = useSelector(selectUser);
  console.log("UserInfo component rendered with user:", user);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing && !user?.name && !user?.username) {
    return <div className={css.UserInfoContainer}>Yükleniyor...</div>;
  }

  return (
    <div className={css.UserInfoContainer}>
      <p>{user?.name || user?.username || "Kullanıcı adı yok"}</p>
      <p>Exit</p>
    </div>
  );
};

export default UserInfo;
