import PropTypes from "prop-types";
import { createContext, memo, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import "./assets/app-style.scss";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/index";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import Header from "./components/Header/index";
import { getAccount, getListAccount } from "./redux/actions/account";
import { getListResult } from "./redux/actions/result";
import {
  makeSelectAccount,
  makeSelectListAccount,
} from "./redux/selectors/account";
import { makeSelectListResult } from "./redux/selectors/result";
export const contextApp = createContext();
function App(props) {
  const {
    triggerGetListAccount,
    triggerGetAccount,
    triggerGetListResult,
    listResult,
  } = props;

  useEffect(() => {
    triggerGetListResult();
    triggerGetListAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const users = JSON.parse(localStorage.getItem("user-info"));

  const listContext = {
    listResult: listResult,
  };

  return (
    <contextApp.Provider value={listContext}>
      <div className="home-page">
        <Header triggerGetAccount={triggerGetAccount} />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route
            path="/login"
            render={() => {
              return !users ? <Login /> : <Redirect to="/" />;
            }}
          />
          <Route
            path="/register"
            render={() => {
              return !users ? <Register /> : <Redirect to="/" />;
            }}
          />
        </Switch>
        <Footer />
      </div>
    </contextApp.Provider>
  );
}

App.propTypes = {
  triggerGetListAccount: PropTypes.func,
  listAccount: PropTypes.array,
  infoAccount: PropTypes.object,
  triggerGetListResult: PropTypes.func,
  listResult: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  listAccount: makeSelectListAccount(),
  infoAccount: makeSelectAccount(),
  listResult: makeSelectListResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListAccount: () => dispatch(getListAccount()),
    triggerGetAccount: (account) => dispatch(getAccount(account)),
    triggerGetListResult: () => dispatch(getListResult()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
