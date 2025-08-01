import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };
    
    const handleSubmit = async (values, { setSubmitting }) => {        
        try {
            await dispatch(registerUser(values)).unwrap();
            toast.success('Registration is successful!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.error("handleSubmit error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    });

    return (
        <div className={css.regContainer}>
            <Toaster position="top-center" reverseOrder={false} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={css.registerForm}>
                        <h1 className={css.registerTitle}>REGISTER</h1>
                        <div className={css.registerInput}>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name *"
                                className={css.customRegister}
                            />
                            <ErrorMessage
                                name="name"
                            />
                        </div>

                        <div className={css.registerInput}>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email *"
                                className={css.customRegister}
                            />
                            <ErrorMessage
                                name="email"
                            />
                        </div>

                        <div className={css.registerInput}>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password *"
                                className={css.customRegister}
                            />
                            <ErrorMessage
                                name="password"
                            />
                        </div>

                        <div className={css.regButtons} >
                        <div>
                            <button className={css.registerButton} type="submit" disabled={isSubmitting}>Register</button>
                        </div>
                        <div className={css.loginButtonContainer}>
                            <button className={css.loginButton} type="button" onClick={() => navigate('/login')}>Log in</button>
                        </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;