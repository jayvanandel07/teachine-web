import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.scss";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        const registeredUser = { username, email, password };
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
        navigate("/home");
    };

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.container}`}>
                <h2>Register</h2>
                <form>
                    <label>Username</label>
                    <div className="input">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <label>Email</label>
                    <div className="input">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        className={"button-styles"}
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
