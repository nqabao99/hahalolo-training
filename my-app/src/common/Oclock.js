import React, { useEffect, useState, useContext } from "react";
import { contextBodyQuestion } from "../components/Body/BodyQuestion/BodyQuestion";
import { useSelector, useDispatch } from "react-redux";
import { SetTimeOut } from "../actions/Question";
export default function Oclock() {
  const context = useContext(contextBodyQuestion);
  const [timeDown, setTimeDown] = useState(600);
  const flagStopTime = useSelector((state) => state.question.flagStopTime);
  const dispatch = useDispatch();
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

  return <p className="oclock">{context.formatTime(timeDown)}</p>;
}
