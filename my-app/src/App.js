import "./assets/app-style.scss";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Body from "./components/Body/Body";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="home-page">
      <Header />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
