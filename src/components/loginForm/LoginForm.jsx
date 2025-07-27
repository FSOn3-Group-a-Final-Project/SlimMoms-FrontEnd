import { loginUser } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Log In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.field}>
                <label htmlFor="email">Email *</label>
                <Field type="email" name="email" className={css.input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.field}>
                <label htmlFor="password">Password *</label>
                <Field type="password" name="password" className={css.input} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.buttons}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={css.buttonLgn}
                >
                  {isSubmitting ? "Loading..." : "Log In"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={css.buttonRgs}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default LoginForm;
