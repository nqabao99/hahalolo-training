import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { getTimeOut, resetTimeOut } from "../redux/actions/question";
import { makeSelectStatusFlags } from "../redux/selectors/question";

const formatTime = (sec) => {
  var hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;
  min.toString().length === 1 ? (min = "0" + min) : void 0;
  sec.toString().length === 1 ? (sec = "0" + sec) : void 0;
  return hours + ":" + min + ":" + sec;
};

function Oclock({ StatusFlags, getTimeOut, resetTimeOut }) {
  const [timeDown, setTimeDown] = useState(600);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timeDown > 0) setTimeDown((timeDown) => timeDown - 1);
    }, 1000);
    if (StatusFlags.isStopTime) {
      clearInterval(timeInterval);
      getTimeOut(timeDown);
    }

    return () => {
      clearInterval(timeInterval);
      resetTimeOut();
    };
  }, [timeDown, StatusFlags.isStopTime, getTimeOut, resetTimeOut]);

  return <p className="oclock">{formatTime(timeDown)}</p>;
}

Oclock.propTypes = {
  StatusFlags: PropTypes.object,
  getTimeOut: PropTypes.func,
  resetTimeOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  StatusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTimeOut: (time) => dispatch(getTimeOut(time)),
    resetTimeOut: () => dispatch(resetTimeOut()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Oclock);
