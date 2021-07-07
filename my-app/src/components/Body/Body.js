import React, { useState, useEffect } from "react";
import "./body-style.scss";
import BodyQuesiton from "./BodyQuestion/BodyQuestion";
import RatingsTable from "./RatingsTable/RatingsTable";

function Index() {
  return (
    <main className="body">
      <div className="container">
        <div className="body-container">
          <BodyQuesiton />

          <RatingsTable />
        </div>
      </div>
    </main>
  );
}

export default Index;
