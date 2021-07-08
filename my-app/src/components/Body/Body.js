import React, { useState } from "react";
import "./body-style.scss";
import BodyQuesiton from "./BodyQuestion/BodyQuestion";
import RatingsTable from "./RatingsTable/RatingsTable";
import ChooseTopic from "./BodyQuestion/ChooseTopic/ChooseTopic";

function Index() {
  const [start, setStart] = useState(true);

  const handleStartClick = () => {
    setStart(false);
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
