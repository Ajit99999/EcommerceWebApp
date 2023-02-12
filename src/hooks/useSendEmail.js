import { useState } from "react";
import emailjs from "@emailjs/browser";

const useSendEmail = () => {
    const [statusVal, setStatusVal] = useState("");
    const [errorVal, setErrorVal] = useState("");

    const SendEmail = async (formDetails) => {
        try {
            setErrorVal("");
            const response = await emailjs.send(
                "service_y4ywze8",
                "template_ah4ckvh",
                formDetails,
                "gHKRU4RcgIwrmB2ZV"
            );
            console.log(response.status);
            setStatusVal(response.text);
        } catch (err) {
            setErrorVal(err.text);
        }
    };

    return {
        statusVal,
        errorVal,
        SendEmail,
    };
};

export default useSendEmail;
