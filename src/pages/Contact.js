import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSendEmail from "../hooks/useSendEmail";
import toast, { Toaster } from "react-hot-toast";
const Contact = () => {
  const { SendEmail, statusVal } = useSendEmail();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      textArea: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Required")
        .min(4, "It should be more than 4 character"),
      email: Yup.string().required("Required").email(),
      textArea: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      SendEmail({
        to_name: "ajit",
        from_name: values.userName,
        message: values.textArea,
        reply_to: values.email,
      });

      formik.resetForm({
        values: {
          email: "",
          userName: "",
          textArea: "",
        },
      });
    },
  });
  useEffect(() => {
    if (statusVal === "OK") {
      toast.success("successfully sent");
    }
  }, [statusVal]);

  return (
    <div className="contact-container">
      <div className="contact-title">
        <h2> Contact Us </h2>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form-div">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-div">
            <input
              id="userName"
              placeholder="Enter name"
              className={
                formik.touched.userName && formik.errors.userName
                  ? "input-error"
                  : ""
              }
              type="text"
              {...formik.getFieldProps("userName")}
            />
            {formik.errors.userName && formik.touched.userName && (
              <p className="error-class"> {formik.errors.userName} </p>
            )}
          </div>

          <div className="input-div">
            <input
              className={
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }
              id="email"
              placeholder="Enter email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="error-class"> {formik.errors.email} </p>
            )}
          </div>

          <div className="input-div">
            <textarea
              className={
                formik.touched.textArea && formik.errors.textArea
                  ? "input-error"
                  : ""
              }
              id="textArea"
              {...formik.getFieldProps("textArea")}
              placeholder="Send us message"
            />

            {formik.errors.textArea && formik.touched.textArea && (
              <p className="error-class">{formik.errors.textArea}</p>
            )}
          </div>

          <button type="submit"> Send </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
