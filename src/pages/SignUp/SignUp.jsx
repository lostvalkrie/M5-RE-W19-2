import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styles from "./SignUp.module.scss";
import classNames from "classnames";

const nameParameters = yup.string().trim().min(2).max(32).required();

const SIGNUP_SCHEMA = yup.object({
  firstName: nameParameters,
  lastName: nameParameters,
  displayName: nameParameters,
  email: yup.string().trim().email("check email").required(),
  password: yup.string().min(6, "min 6 symbols").required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "confirmation pass must match password")
    .required(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignUp = () => {
  const onSubmit = (values, formikBag) => {
    console.log(values);
    formikBag.resetForm();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>squadhelp</span>
        {/* <Link to="/login" className={styles.loginBtn}>
          Login
        </Link> */}
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>CREATE AN ACCOUNT</h1>
        <p className={styles.subtitle}>
          We always keep your name and email address private.
        </p>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SIGNUP_SCHEMA}
        >
          {({ errors, touched }) => {
            const inputStyles = (name) =>
              classNames(styles.input, {
                [styles.invalid]: touched[name] && errors[name],
              });
            return (
              <Form>
                <div className={styles.twoFields}>
                  <div className={styles.oneField}>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Firstname"
                      className={inputStyles("firstName")}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.oneField}>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Lastname"
                      className={inputStyles("lastName")}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className={styles.error}
                    />
                  </div>
                </div>

                <div className={styles.twoFields}>
                  <div className={styles.oneField}>
                    <Field
                      type="text"
                      name="displayName"
                      placeholder="Displayname"
                      className={inputStyles("displayName")}
                    />
                    <ErrorMessage
                      name="displayName"
                      component="span"
                      className={styles.error}
                    />
                  </div>

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
                </div>

                <div className={styles.twoFields}>
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

                  <div className={styles.oneField}>
                    <Field
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm password"
                      className={inputStyles("passwordConfirmation")}
                    />
                    <ErrorMessage
                      name="passwordConfirmation"
                      component="span"
                      className={styles.error}
                    />
                  </div>
                </div>

                <button type="submit">Create Account</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
