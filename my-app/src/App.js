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


  function descendingSort(arr){
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].scores === arr[j].scores) {
          if (arr[i].timeOut < arr[j].timeOut) {
            let tg = arr[i];
            arr[i] = arr[j];
            arr[j] = tg;
          }
        }
        if (arr[i].scores < arr[j].scores) {
          let tg = arr[i];
          arr[i] = arr[j];
          arr[j] = tg;
        }
      }
    }
    return arr;
  }

  

  useEffect(() => {
    const fetchListResult = async () => {
      const responseJson = await fetch("http://localhost:3000/listResult");
      const response = await responseJson.json();
  
      //hàm sắp xếp giảm theo điểm
      descendingSort(response);
  
      setListResult(response);
    };
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
