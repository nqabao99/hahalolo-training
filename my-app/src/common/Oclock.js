import React, { useEffect, useState, useContext } from "react";
import { contextBodyQuestion } from "../components/Body/BodyQuestion/BodyQuestion";

export default function Oclock() {
  const context = useContext(contextBodyQuestion);
  const [timeDown, setTimeDown] = useState(600);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timer = timeDown;
      if (timer > 0) setTimeDown(timer - 1);
    }, 1000);
    if (context.flagStopTime) {
      clearInterval(timeInterval);
      context.getTimeOut(timeDown);
    } else {
      context.getTimeNow(timeDown);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown]);

  return <p>{context.formatTime(timeDown)}</p>;
}
