import React, { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");

    async function login() {
        console.warn(email, password);
        let raw = {
            email: email,
            password: password,
        };
        let result = await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(raw),
            }
        );
        result = await result.json();
        localStorage.setItem("token", JSON.stringify(result.data.token));
        if (result.code === 200) {
            navigate("/admin");
        } else {
            if (result.message === "Unauthorized") {
                setErrorMessage("Bạn đã nhập sai mật khẩu!");
            } else {
                setErrorMessage("Tài khoản gmail bạn nhập chưa có tài khoản!");
            }
        }
    }

    return (
        <div className="login">
            <MetaTags>
                <title>CYF Center | Đăng nhập</title>
            </MetaTags>
            <form className="form form__login">
                <div className="form__top">
                    <Link to="/" style={{ color: "#fff" }}>
                        <span className="logo">
                            <span className="logo__name">CYF</span>
                            Center
                        </span>
                    </Link>
                </div>
                <div className="form__body">
                    <p className="form__desc">
                        Chào mừng bạn đến với Trung tâm Bảo trợ trẻ em CYF
                    </p>
                    <div className="form__group">
                        <i className="bi bi-envelope icon icon__email"></i>
                        <input
                            type="email"
                            name=""
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <i className="bi bi-lock icon icon__password"></i>
                        <input
                            type="password"
                            name=""
                            placeholder="Mật khẩu"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="login__field"></div>
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                </div>
                <div className="form__bottom">
                    <button
                        onClick={login}
                        className="btn btn__signin btn--primary"
                        type="button"
                    >
                        Đăng nhập
                    </button>
                    <div className="no-account">
                        <Link className="btn-sign" to="/Register">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
