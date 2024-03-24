import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import styles from "./login.module.scss";
import { API_URL } from "../config";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { data, loading, error, sendRequest } = useAxios();
    const { login, user } = useAuth();

    const navigate = useNavigate();

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
    }, [user, data]);

    const handleRegister = async () => {
        const registerUser = { name: username, email, password };
        await sendRequest(
            `${API_URL}` + `/users/register`,
            "POST",
            registerUser
        );
    };

    if (loading) return <h1>Loading</h1>;
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
