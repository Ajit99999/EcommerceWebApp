import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useAuthContext from "../hooks/useAuthContext";

import { RotatingLines } from "react-loader-spinner";
const Login = () => {
 
    const { AuthState, SignUp, Login, ResetError } = useAuthContext();
   
    const validationSchemaLogin = () => {
        return Yup.object({
            userEmail: Yup.string()
                .required("Required")
                .email("It must be in a correct email-format"),
            userPassword: Yup.string()
                .required("Required")
                .min(6, "It must be more than 6 character"),
        });
    };
    const validationSchemaSignup = () => {
        return Yup.object({
            userEmail: Yup.string()
                .required("Required")
                .email("It must be in a correct email-format"),
            userName: Yup.string()
                .required("Required")
                .min(4, "It must be more than 4 character"),
            userPassword: Yup.string()
                .required("Required")
                .min(6, "It must be more than 6 character"),
        });
    };
    const [showLoginPage, setshowLoginPage] = useState(true);
    const formik = useFormik({
        initialValues: {
            userName: "",
            userEmail: "",
            userPassword: "",
        },

        validationSchema: showLoginPage
            ? validationSchemaLogin
            : validationSchemaSignup,

        onSubmit: (values) => {
            formik.resetForm({
                values: {
                    userEmail: "",
                    userName: "",
                    userPassword: "",
                },
            });
            if (showLoginPage) {
                Login({
                    email: values.userEmail,
                    password: values.userPassword,
                });
            } else {
                SignUp({
                    email: values.userEmail,
                    password: values.userPassword,
                    userName: values.userName,
                });
            }
        },
    });

    const onToggleHandler = () => {
        if (showLoginPage) {
            formik.setErrors({
                userName: "",
            });
        }
   
        setshowLoginPage((prev) => !prev);
        formik.resetForm({
            values: {
                userEmail: "",
                userName: "",
                userPassword: "",
            },
            errors: {
                userEmail: "",
                userName: "",
                userPassword: "",
            },
        });
    };

    useEffect(() => {
        if (AuthState.errorValue) {
            ResetError();
        }
    }, [showLoginPage]);
 
    return (
        <div className="form-div-container">
            <div>
                <h2>{showLoginPage ? "Login" : "Register"}</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {!showLoginPage && (
                    <div className="input-div">
                        <input
                            className={
                                formik.touched.userName && formik.errors.userName
                                    ? "input-error"
                                    : ""
                            }
                            placeholder="Enter name"
                            type="text"
                            id="userName"
                            {...formik.getFieldProps("userName")}
                        />
                        {formik.touched.userName && formik.errors.userName && (
                            <p className="error-class">{formik.errors.userName}</p>
                        )}
                    </div>
                )}

                <div className="input-div">
                    <input
                        className={
                            formik.touched.userEmail && formik.errors.userEmail
                                ? "input-error"
                                : ""
                        }
                        placeholder="Enter email"
                        type="email"
                        id="userEmail"
                        {...formik.getFieldProps("userEmail")}
                    />
                    {formik.touched.userEmail && formik.errors.userEmail && (
                        <p className="error-class">{formik.errors.userEmail} </p>
                    )}
                </div>
                <div className="input-div">
                    <input
                        className={
                            formik.touched.userPassword && formik.errors.userPassword
                                ? "input-error"
                                : ""
                        }
                        placeholder="Enter password"
                        type="password"
                        id="userPassword"
                        {...formik.getFieldProps("userPassword")}
                    />
                    {formik.touched.userPassword && formik.errors.userPassword && (
                        <p className="error-class">{formik.errors.userPassword}</p>
                    )}
                </div>
                <button type="submit"> {showLoginPage ? "Login" : "Register"} </button>

                <div>
                    {AuthState.isPending && (
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    )}

                    {AuthState.errorValue && (
                        <p className="error-class"> {AuthState.errorValue} </p>
                    )}
                </div>

                <p>
                    Don't have account!!!
                    <button type="button" onClick={onToggleHandler}>
                        Click here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
