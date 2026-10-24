import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styles from "./Login.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
const LOGIN_SCHEMA = yup.object({
  email: yup.string().trim().email("check email").required(),
  password: yup.string().min(6, "min 6 symbols").required(),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const onSubmit = (values, formikBag) => {
    console.log(values);
    formikBag.resetForm();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>squadhelp</span>
        <Link to="/signup" className={styles.signupBtn}>
          Sign Up
        </Link>
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>LOGIN TO YOUR ACCOUNT</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LOGIN_SCHEMA}
        >
          {({ errors, touched }) => {
            const inputStyles = (name) =>
              classNames(styles.input, {
                [styles.invalid]: touched[name] && errors[name],
              });
            return (
              <Form className={styles.form}>
                <div className={styles.oneField}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className={inputStyles("email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={styles.error}
                  />
                </div>

                <div className={styles.oneField}>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={inputStyles("password")}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={styles.error}
                  />
                </div>

                <button type="submit" className={styles.submit}>
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
