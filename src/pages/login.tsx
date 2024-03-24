import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { API_URL } from "../config";

const LoginPage = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { data, loading, error, sendRequest } = useAxios();

    const { login, user } = useAuth();

    useEffect(() => {
        if (data) {
            login(data as User);
        }
        if (error) {
            console.log(error);
        }
        if (user) {
            navigate("/");
        }
    }, [user, navigate, data]);

    const handleLogin = async () => {
        await sendRequest(`${API_URL}` + `/users/login`, "POST", {
            email,
            password,
        });
    };

    if (loading) return <h1>Loading</h1>;

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
