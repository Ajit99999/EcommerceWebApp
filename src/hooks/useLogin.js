// import { useState } from "react";
import { auth } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

const useLogin = () => {
    // const [user, setUser] = useState(null);

    // const [error, seterror] = useState(null);

    const SignUp = async (user) => {
        const { email, password, userName } = user;
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(auth.currentUser, {
                displayName: userName,
            });
            console.log(userCredential);
        } catch (err) {
            console.log(err.message);
        }
    };

    const Login = async (user) => {
        console.log(auth.currentUser, "hello");
        const { email, password } = user;
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential);
        } catch (err) {
            console.log(err.message);
        }
    };

    return {
        SignUp: SignUp,
        Login,
    };
};

export default useLogin;
