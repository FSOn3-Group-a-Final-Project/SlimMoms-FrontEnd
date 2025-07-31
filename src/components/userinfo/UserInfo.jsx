import css from "./UserInfo.module.css";
import { useSelector } from "react-redux";
import { selectUser, selectIsRefreshing } from "../../redux/auth/selectors";

const UserInfo = () => {
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Eğer refresh sırasında user yoksa, eski user'ı göstermek için localStorage'dan çekebilirsin
  // veya sadece loading gösterebilirsin:
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
