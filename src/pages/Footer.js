import { useFormik } from "formik";
import * as Yup from "yup";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email(),
    }),

    onSubmit: (values) => {
      alert(values, null, 2);
      formik.resetForm({
        values: {
          email: "",
        },
      });
    },
  });
  return (
    <div className="footer-container">
      <div className="footer-title">
        <h3>Ecommerce Kart</h3>
        <p> Lorem ipsum is simply dummy text of the printing and typesetting</p>
      </div>
      <div className="footer-notificaion">
        <p>Subscribe to get more offers & updates</p>
        <div>
          <form className="footer-form" onSubmit={formik.handleSubmit}>
            <div className="input-div">
              <input
                className={
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : ""
                }
                id="email"
                placeholder="Enter email"
                type="email"
                {...formik.getFieldProps("email")}
              />
            </div>

            <button type="submit"> Subscribe </button>
          </form>
        </div>
      </div>
      <div className="footer-social-container">
        <p>Follow us</p>
        <div className="footer-social">
          <BsInstagram className="social-icon" />
          <BsTwitter className="social-icon" />
          <BsYoutube className="social-icon" />
        </div>
      </div>
      <div className="footer-mobile-container">
        <p>Call Us</p>
        <p> +91 9856592022</p>
      </div>
    </div>
  );
};

export default Footer;
