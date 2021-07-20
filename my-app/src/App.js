import "./assets/app-style.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Body from "./components/Body/Body";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import axios from "axios";

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
    axios.get('http://localhost:3000/accounts')
      .then(function (response) {
        setListAccount(response.data);
      })
    
  };

  function descendingSort(arr){
    arr?.sort((a, b) =>  b.scores === a.scores? (b.timeOut - a.timeOut) :  (b.scores - a.scores))
    return arr;
  }

  useEffect(() => {
    const fetchListResult = async () => {
      axios.get('http://localhost:3000/listResult')
        .then(function (response) {
          setListResult(response.data);
        })
    };
    fetchAccount();
    fetchListResult();
  }, [reset, resetListResult]);

  const user = JSON.parse(localStorage.getItem("user-info"));

  const listContext = {
    listAccount: listAccount,
    handleReset: handleReset,
    listResult: descendingSort(listResult),
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
           
          />
          <Route
            path="/register"
            render={() => {
              return !user ? <Register /> : <Redirect to="/" />;
            }}
          />
        </Switch>
        <Footer />
      </div>
    </contextApp.Provider>
  );
}

export default App;
