import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./body-style.scss";
import BodyQuesiton from "./BodyQuestion/BodyQuestion";
import ChooseTopic from "./BodyQuestion/ChooseTopic/ChooseTopic";
import RatingsTable from "./RatingsTable/RatingsTable";

function Index() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user-info"));
  const [start, setStart] = useState(true);

  const handleStartClick = () => {
    if (user) {
      setStart(false);
    } else {
      history.push("/login");
    }
  };
  const handleEndClick = (data) => {
    setStart(data);
  };

  return (
    <main className="body">
      <div className="container">
        <div className="body-container">
          {start ? (
            <ChooseTopic handleStartClick={handleStartClick} />
          ) : (
            <BodyQuesiton handleEndClick={handleEndClick} />
          )}

          <RatingsTable />
        </div>
      </div>
    </main>
  );
}

export default Index;
