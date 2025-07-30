import LoginForm from '../../components/loginForm/LoginForm';
import css from './LoginPage.module.css';


const LoginPage = () => {
  return (
    <div className={css.loginPage}> 
      <LoginForm />
    </div>
  );
}
export default LoginPage;