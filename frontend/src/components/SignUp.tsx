import Logo from "../images/LogoYellow3.png";
import "../index.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../features/user";
import isAuthenticated, { signUpAxi } from "../api/axiosFunctions";

const SignUp = () => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // States
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validForm, setValidForm] = useState<boolean>();
  const [validMessage, setvalidMessage] = useState<boolean>(true);
  const [matching, setMatching] = useState<boolean>(true);

  // Checking form validity
  const validChangeHandler = () => {
    setValidForm(
      email.trim() !== "" &&
        password.trim().length > 0 &&
        email.trim().includes("@") &&
        confirm.trim().length > 0
    );
    setMatching(password.trim() === confirm.trim());
  };

  // Back button function
  const goBackHandler = () => {
    history.push("/sign-in");
  };

  // Form submission
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validForm && matching) {
      // Once backend works the function below will send request to backend and register new user using its email and password
      const response = await signUpAxi(email, password);
      if (response) {
        console.log(response);
        dispatch(signUp({ email: email, password: password }));
        history.push("/todo/lists");
      } else {
        return;
      }
      // history.replace("/todo");
    } else if (!validForm && matching) {
      setvalidMessage(false);
    } else if (validForm && !matching) {
      return;
    }
  };

  // The line below will check if user is authenticated, if so, it will take him/her to /todo page
  useEffect(() => {
    isAuthenticated() && history.push("/todo");
  });

  // Xml
  return (
    <div id="signMain">
      <div id="signUpContainer">
        <header id="signHeader">
          <div id="logo">
            <img src={Logo} alt="logo" width={"50px"} />
            <p className="pl-2">Todo</p>
          </div>
          <h1 className="mt-3 text-black">Sign Up</h1>
        </header>

        <form id="signForm" onSubmit={formSubmitHandler}>
          <div id="email">
            <input
              type="email"
              id="emailInputUp"
              placeholder="Email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div id="password">
            <input
              type="password"
              id="passwordInput"
              placeholder="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div id="password">
            <input
              type="password"
              id="passwordInput"
              placeholder="Confirm Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setConfirm(event.target.value);
              }}
            />
          </div>

          {!validMessage && (
            <div>
              <p className="text-red-500 text-xl my-1">
                Fields Can not be empty
              </p>
            </div>
          )}
          {!matching && (
            <div>
              <p className="text-red-500 text-xl my-1">
                Please enter the same Password again!
              </p>
            </div>
          )}

          <div id="signInButtonDiv">
            <button id="backButton" onClick={goBackHandler}>
              Back
            </button>
            <button id="signInButton" onClick={validChangeHandler}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
