import React, { useEffect, useState } from "react";

export default function Oclock({ stop, getTimeDown, formatTime }) {
  const [timeDown, setTimeDown] = useState(600);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timer = timeDown;
      if (timer > 0) setTimeDown(timer - 1);
    }, 1000);
    if (stop) {
      clearInterval(timeInterval);
      getTimeDown(timeDown);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown, stop]);

  return <p>{formatTime(timeDown)}</p>;
}
