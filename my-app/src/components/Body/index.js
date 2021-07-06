import React, { useState, useEffect } from "react";
import "./body-style.scss";
import BodyQuesiton from "./BodyQuestion/index";
import RatingsTable from "./RatingsTable/index";

function Index() {
  const [dataQuestion, setDataQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/question")
      .then((response) => response.json())
      .then((result) => setDataQuestion(result));
  }, []);

  return (
    <main className="body">
      <div className="container">
        <div className="body-container">
          <BodyQuesiton dataQuestion={dataQuestion} />

          <RatingsTable />
        </div>
      </div>
    </main>
  );
}

export default Index;
