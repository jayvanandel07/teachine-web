import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoading(true);
        localStorage.setItem("loggedInUser", username);
        setIsLoading(false);
        navigate("/home");
    };

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <h2>Login</h2>
                <form id={`${styles.loginForm}`}>
                    <label>Username</label>
                    <div className="input">
                        <input
                            type="text"
                            value={username}
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
