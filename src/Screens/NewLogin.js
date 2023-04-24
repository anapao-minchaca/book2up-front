/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import instance from "../api/book2up";
import { useNavigate } from "react-router-dom";
import store from "../Store/store";
import { setToken } from "../Store/slices/authSlice";
import "./NewLogin.css";
import logo from "../img/logo.png";

const NewLogin = () => {
  const [signUpMode, toggle] = useState(false);
  const navigate = useNavigate();
  // SIGN IN INFO
  const [formInfo, setFormInfo] = useState({ user: "", password: "" });
  const ref1I = React.createRef(null);
  const ref2I = React.createRef(null);
  const [styleInputUserI, setStyleInputUserI] = useState("input-field");
  const [styleInputPassI, setStyleInputPassI] = useState("input-field");

  // SIGN UP INFO
  const [form, setForm] = useState({ nombre: "", user: "", password: "" });
  //const { nombre, user, password } = form;
  const ref1U = React.createRef(null);
  const ref2U = React.createRef(null);
  const ref3U = React.createRef(null);
  const [styleInputNameU, setStyleInputNameU] = useState("input-field");
  const [styleInputUserU, setStyleInputUserU] = useState("input-field");
  const [styleInputPassU, setStyleInputPassU] = useState("input-field");

  const changeForm = (event, methodUseState, objectToChange) => {
    const { name, value } = event.target;
    methodUseState({ ...objectToChange, [name]: value });
  };

  const handleMouseOut = (currentRef, setClassName, value) => {
    if (document.activeElement !== currentRef) {
      if ((value !== "") & (value !== undefined)) return;
      setClassName("input-field");
    }
  };

  const handleMouseIn = (currentRef, setClassName) => {
    if (document.activeElement === currentRef) {
      setClassName("input-field active");
    }
  };

  const submit = async () => {
    const { user, password } = formInfo;
    try {
      const response = await instance.post("/validar", { user, password });
      store.dispatch(setToken(response.data));
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };
  const submitForm = async () => {
    try {
      const response = await instance.post("/signup", form);
      store.dispatch(setToken(response.data));
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <main className={signUpMode ? "sign-up-mode" : ""}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form autoComplete="off" className="sign-in-form">
              <div className="logo">
                <img src={logo} alt="logo" />
                <h4>Book2Up</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet? </h6>
                <a
                  className="toggle"
                  onClick={() => {
                    toggle(!signUpMode);
                  }}
                >
                  Sign Up
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className={styleInputUserI}
                    minLength={4}
                    name="user"
                    autoComplete="off"
                    required
                    onChange={(event) =>
                      changeForm(event, setFormInfo, formInfo)
                    }
                    value={formInfo.user}
                    ref={ref1I}
                    onClickCapture={() =>
                      handleMouseIn(ref1I.current, setStyleInputUserI)
                    }
                    onBlur={() =>
                      handleMouseOut(
                        ref1I.current,
                        setStyleInputUserI,
                        formInfo.user
                      )
                    }
                  />
                  <label>User</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    className={styleInputPassI}
                    onChange={(event) =>
                      changeForm(event, setFormInfo, formInfo)
                    }
                    value={formInfo.password}
                    autoComplete="off"
                    required
                    ref={ref2I}
                    onClickCapture={() =>
                      handleMouseIn(ref2I.current, setStyleInputPassI)
                    }
                    onBlur={() =>
                      handleMouseOut(
                        ref2I.current,
                        setStyleInputPassI,
                        formInfo.password
                      )
                    }
                  />
                  <label>Password</label>
                </div>
                <input
                  type="button"
                  value="Sign In"
                  className="sign-btn"
                  onClick={submit}
                />

                <p className="text">
                  Forgotten your password or your login details?
                  <a href="#"> Get help</a> signin in
                </p>
              </div>
            </form>

            <form autoComplete="off" className="sign-up-form">
              <div className="logo">
                <img src={logo} alt="logo" />
                <h4>Book2Up</h4>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account? </h6>
                <a
                  className="toggle"
                  onClick={() => {
                    toggle(!signUpMode);
                  }}
                >
                  Sign In
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className={styleInputUserU}
                    minLength={4}
                    name="user"
                    autoComplete="off"
                    required
                    onChange={(event) => changeForm(event, setForm, form)}
                    value={form.user}
                    ref={ref1U}
                    onClickCapture={() =>
                      handleMouseIn(ref1U.current, setStyleInputUserU)
                    }
                    onBlur={() =>
                      handleMouseOut(
                        ref1U.current,
                        setStyleInputUserU,
                        form.user
                      )
                    }
                  />
                  <label>User</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="text"
                    className={styleInputNameU}
                    minLength={4}
                    name="name"
                    autoComplete="off"
                    required
                    onChange={(event) => changeForm(event, setForm, form)}
                    value={form.name || ""}
                    ref={ref2U}
                    onClickCapture={() =>
                      handleMouseIn(ref2U.current, setStyleInputNameU)
                    }
                    onBlur={() =>
                      handleMouseOut(
                        ref2U.current,
                        setStyleInputNameU,
                        form.name
                      )
                    }
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    className={styleInputPassU}
                    minLength={4}
                    onChange={(event) => changeForm(event, setForm, form)}
                    value={form.password}
                    autoComplete="off"
                    required
                    ref={ref3U}
                    onClickCapture={() =>
                      handleMouseIn(ref3U.current, setStyleInputPassU)
                    }
                    onBlur={() =>
                      handleMouseOut(
                        ref3U.current,
                        setStyleInputPassU,
                        form.password
                      )
                    }
                  />
                  <label>Password</label>
                </div>
                <input
                  type="button"
                  value="Sign Up"
                  className="sign-btn"
                  onClick={submitForm}
                />

                <p className="text">
                  By signing up, I agree to the{" "}
                  <a href="#"> Terms of Services</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewLogin;
