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
    .oneOf([yup.ref("password")])
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
            <div>
              <Field
                type="text"
                name="firstName"
                placeholder="Firstname"
                className={inputStyles}
              />
              <ErrorMessage
                name="firstName"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                type="text"
                name="lastName"
                placeholder="Lastname"
                className={inputStyles}
              />
              <ErrorMessage
                name="lastName"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                type="text"
                name="displayName"
                placeholder="Displayname"
                className={inputStyles}
              />
              <ErrorMessage
                name="displayName"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="example@email.com"
                className={inputStyles}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={inputStyles}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </div>

            <div>
              <Field
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm password"
                className={inputStyles}
              />
              <ErrorMessage
                name="passwordConfirmation"
                component="span"
                className={styles.error}
              />
            </div>
            <button type="submit">Create Account</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
