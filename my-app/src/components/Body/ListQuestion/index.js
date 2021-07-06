import React from "react";
import "./style.scss";

function Index({ selectQuestion, dataQuestion, handleSelectQuestionClick }) {
  const activeQuestion = selectQuestion.map((e) => e.parent_id);

  return (
    <ul className="list-question">
      {dataQuestion.map((item, index) => (
        <li
          className={activeQuestion.includes(item.id) ? "select" : null}
          key={item.id}
          onClick={() => handleSelectQuestionClick(index)}
        >
          {item.name.slice(-1)}
        </li>
      ))}
    </ul>
  );
}

export default Index;
