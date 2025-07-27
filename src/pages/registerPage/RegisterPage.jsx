import RegistrationForm from '../../components/registerForm/RegisterForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RegisterPage = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <h1>Registration</h1>
            <RegistrationForm />
        </>
    );
};

export default RegisterPage;