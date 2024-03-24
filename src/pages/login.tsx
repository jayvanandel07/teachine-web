import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogin = () => {
        setIsLoading(true);

        localStorage.setItem("loggedInUser", email);
        setIsLoading(false);
        navigate("/");
    };

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <h2>Login</h2>
                <form id={`${styles.loginForm}`}>
                    <label>Email</label>
                    <div className="input">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <label>Password</label>
                    <div className="input">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className={`${styles["button-styles"]}`}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <a className={`${styles["button-styles"]}`}>Register</a>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
