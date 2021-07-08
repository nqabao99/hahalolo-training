import "./assets/app-style.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Body from "./components/Body/Body";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const contextApp = createContext();
function App() {
  const [listAccount, setListAccount] = useState([]);
  const [reset, setReset] = useState();
  const handleReset = (data) => {
    setReset(data);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const responseJson = await fetch("http://localhost:3000/accounts");
      const response = await responseJson.json();
      setListAccount(response);
    };

    fetchAccount();
  }, [reset]);

  const listContext = {
    listAccount: listAccount,
  };

  return (
    <contextApp.Provider value={listContext}>
      <div className="home-page">
        <Header handleReset={handleReset} />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route
            path="/login"
            render={(props) => <Login handleReset={handleReset} />}
          />
          <Route
            path="/register"
            render={(props) => <Register handleReset={handleReset} />}
          />
        </Switch>
        <Footer />
      </div>
    </contextApp.Provider>
  );
}

export default App;
