import React, { useContext } from "react";
import Input from "../../../common/Input";

import { contextBodyQuestion } from "./BodyQuestion";

function QuestionItems({ itemQuestion, handleGetAnswerChange }) {
  const context = useContext(contextBodyQuestion);

  const activeAnswer = context.selectQuestion.map((e) => e.answer_id);
  return (
    <div className="body-question__items">
      <h3 className="name">{itemQuestion.name}</h3>
      <p className="content">{itemQuestion.content}</p>
      {itemQuestion.answers.map((i) => (
        <div className="answer" key={i.answer_id}>
          <label htmlFor={i.answer_id}>{i.content_answer}</label>

          <Input
            onChange={() => handleGetAnswerChange(i)}
            id={i.answer_id}
            name={i.parent_id}
            type="radio"
            defaultChecked={activeAnswer.includes(i.answer_id)}
          />
        </div>
      ))}
    </div>
  );
}

export default QuestionItems;
