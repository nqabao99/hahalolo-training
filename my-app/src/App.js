import "./assets/app-style.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Body from "./components/Body/Body";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const contextApp = createContext();
function App() {
  const [listAccount, setListAccount] = useState([]);
  const [listResult, setListResult] = useState([]);
  const [reset, setReset] = useState();
  const [resetListResult, setResetListResult] = useState();
  const handleReset = (data) => {
    setReset(data);
  };
  const handleListResult = (data) => {
    setResetListResult(data);
  };
  const fetchAccount = async () => {
    const responseJson = await fetch("http://localhost:3000/accounts");
    const response = await responseJson.json();
    setListAccount(response);
  };

  const fetchListResult = async () => {
    const responseJson = await fetch("http://localhost:3000/listResult");
    const response = await responseJson.json();

    for (let i = 0; i < response.length - 1; i++) {
      for (let j = i + 1; j < response.length; j++) {
        if (response[i].scores === response[j].scores) {
          if (response[i].timeOut < response[j].timeOut) {
            let tg = response[i];
            response[i] = response[j];
            response[j] = tg;
          }
        }
        if (response[i].scores < response[j].scores) {
          let tg = response[i];
          response[i] = response[j];
          response[j] = tg;
        }
      }
    }

    setListResult(response);
  };

  useEffect(() => {
    fetchAccount();
    fetchListResult();
  }, [reset, resetListResult]);

  const user = JSON.parse(localStorage.getItem("user-info"));

  const listContext = {
    listAccount: listAccount,
    handleReset: handleReset,
    listResult: listResult,
    handleListResult: handleListResult,
  };

  return (
    <contextApp.Provider value={listContext}>
      <div className="home-page">
        <Header />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route
            path="/login"
            render={() => {
              return !user ? <Login /> : <Redirect to="/" />;
            }}
            // component={Login}
          />
          <Route
            path="/register"
            render={() => {
              return !user ? <Register /> : <Redirect to="/" />;
            }}
            // component={Register}
          />
        </Switch>
        <Footer />
      </div>
    </contextApp.Provider>
  );
}

export default App;
