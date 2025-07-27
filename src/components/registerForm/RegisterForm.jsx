import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../../redux/auth/operations';
//import css from './RegisterForm.module.css';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            await dispatch(registerUser(values)).unwrap();
            toast.success('Registration is successful!');
            resetForm();
            navigate('/home');
        } catch (error) {
            toast.error(error);
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
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h1>REGISTER</h1>
                        <div>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name *"
                            />
                            <ErrorMessage
                                name="name"
                            />
                        </div>

                        <div>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email *"
                            />
                            <ErrorMessage
                                name="email"
                            />
                        </div>

                        <div>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password *"
                            />
                            <ErrorMessage
                                name="password"
                            />
                        </div>

                        <div>
                            <button type="submit" disabled={isSubmitting}>Register</button>
                        </div>

                        <div>
                            <button type="button" onClick={() => navigate('/login')}>Log in</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;