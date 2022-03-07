import Logo from "../images/LogoYellow3.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState<boolean>();
  const [validMessage, setValidMessage] = useState<boolean>(true);

  const history = useHistory();

  const goBackHandler = () => {
    history.push("/sign-in");
  };

  const checkValid = () => {
    setValid(email.trim() !== "" && email.trim().includes("@"));
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (valid) {
      history.replace("/");
    } else {
      setValidMessage(false);
    }
  };

  return (
    <div id="signMain">
      <div id="forgotContainer">
        <header id="signHeader">
          <div id="logo">
            <img src={Logo} alt="logo" width={"50px"} />
            <p className="pl-2">Todo</p>
          </div>
          <h1 className="mt-3 text-black">Forgot Password</h1>
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

          {!validMessage && (
            <div>
              <p className="text-red-500 text-xl my-1">
                Please enter your email!
              </p>
            </div>
          )}

          <div id="signInButtonDiv">
            <button id="backButton" onClick={goBackHandler}>
              Back
            </button>
            <button id="signInButton" onClick={checkValid}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
