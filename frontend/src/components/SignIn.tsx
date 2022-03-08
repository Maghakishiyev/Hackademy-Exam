import React from "react";
import "../index.css";
import Logo from "../images/LogoYellow3.png";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import isAuthenticated, { signInAxi } from "../api/axiosFunctions";
import { signIn } from "../features/user";

const SignIn = () => {
  // Redux data
  const user = useSelector((state: any) => state.user.value);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState<boolean>();
  const [validMessage, setvalidMessage] = useState<boolean>(true);
  const [loginCredentials, setLoginCredentials] = useState<boolean>();
  const [wrongMessage, setWrongMessage] = useState<boolean>(true);

  const dispatch = useDispatch();

  // History Hook
  const history = useHistory();

  // Checking Form validity
  const validChangeHandler = () => {
    setValidForm(
      email.trim() !== "" &&
        password.trim().length > 0 &&
        email.trim().includes("@")
    );
  };

  // Submission
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validForm) {
      // Once backend works the function below will send request to backend and if there is a mail and password that matching it will return the response and after that user will be able to view the todo page
      const response = await signInAxi(email, password);
      if (response) {
        history.replace("/todo");
      } else {
        setLoginCredentials(false);
      }
      // history.push("/todo");
    }
    if (!validForm && loginCredentials) {
      setvalidMessage(false);
    } else if (validForm && !loginCredentials) {
      setWrongMessage(false);
      setvalidMessage(true);
    } else {
      setvalidMessage(false);
      setWrongMessage(false);
    }
  };

  // The line below will check if user is authenticated, if so, it will take him/her to /todo page
  useEffect(() => {
    isAuthenticated() && history.push("/todo");
  });

  return (
    <div id="signMain">
      <div id="signInContainer">
        <header id="signHeader">
          <div id="logo">
            <img src={Logo} alt="logo" width={"50px"} />
            <p className="pl-2">Todo</p>
          </div>
          <h1 className="mt-3 text-black">Sign In</h1>
        </header>
        <form id="signForm" onSubmit={formSubmitHandler}>
          <div id="email">
            <input
              type="email"
              id="emailInput"
              placeholder="Email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div id="password">
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
          </div>

          {!validMessage && (
            <div>
              <p className="text-red-500 text-xl my-1">
                Email and password fields can not be empty!!
              </p>
            </div>
          )}

          {!wrongMessage && (
            <div>
              <p className="text-red-500 text-xl my-1">
                Wrong email or password!
              </p>
            </div>
          )}

          <div id="noAccaunt">
            <p>No Accaunt? </p>
            <Link
              to="/sign-up"
              className="text-yellow-300 hover:underline cursor-pointer pl-1"
            >
              Create One!
            </Link>
          </div>
          <div>
            <Link
              to="/forgot-password"
              className="hover:underline cursor-pointer font-medium text-lg"
            >
              Forgot Password?
            </Link>
          </div>
          <div id="signInButtonDiv">
            <button id="signInButton" onClick={validChangeHandler}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
