import logo from "./logo.svg";
import "./App.css";

const RegisterText = (props) => {
  return <p>Hi, {props.registerUserName}!</p>;
};

const RegisterUserProfile = (props) => {
  return (
    <div>
      <p>{props.registerUserAge}</p>
      <p>{props.registerUserCountry}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <RegisterText name="Jack"></RegisterText>
      <RegisterUserProfile age={22} country="US" />
      <RegisterText name="Mary" />
      <RegisterUserProfile age={20} country="UK" />
    </div>
  );
};

export default App;
