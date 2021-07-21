import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTimeOut } from "../actions/Question";
export default function Oclock() {
  const [timeDown, setTimeDown] = useState(600);
  const flagStopTime = useSelector((state) => state.question.flagStopTime);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timeDown > 0) setTimeDown((timeDown) => timeDown - 1);
    }, 1000);
    if (flagStopTime) {
      clearInterval(timeInterval);
      dispatch(SetTimeOut(timeDown));
    }

    // else {
    //   context.getTimeNow(timeDown);
    // }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown, dispatch, flagStopTime]);

  return <p className="oclock">{formatTime(timeDown)}</p>;
}
