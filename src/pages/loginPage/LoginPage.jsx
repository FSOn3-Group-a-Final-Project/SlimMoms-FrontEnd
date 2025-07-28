import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';


const LoginPage = () => {
  return (
    <div className={css.loginPage}> 
      <LoginForm />
    </div>
  );
}
export default LoginPage;