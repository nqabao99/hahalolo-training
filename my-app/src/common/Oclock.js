import React, { useEffect, useState, useContext } from "react";
import { contextBodyQuestion } from "../components/Body/BodyQuestion/BodyQuestion";

export default function Oclock() {
  const context = useContext(contextBodyQuestion);
  const [timeDown, setTimeDown] = useState(600);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timeDown > 0) setTimeDown(timeDown => timeDown - 1);
    }, 1000);
    if (context.flagStopTime) {
      clearInterval(timeInterval);
      context.getTimeOut(timeDown);
    } 
    // else {
    //   context.getTimeNow(timeDown);
    // }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown]);

  return <p className="oclock">{context.formatTime(timeDown)}</p>;
}
