import RegistrationForm from '../../components/registerForm/RegisterForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/diary');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className={css.registerPage}>
            <RegistrationForm />
        </div>
    );
};

export default RegisterPage;