import React from "react";

function QuestionItems({
  dataQuestion,
  handleGetAnswerChange,
  selectQuestion,
}) {
  const activeAnswer = selectQuestion.map((e) => e.answer_id);
  return (
    <div className="body-question__items">
      <h3 className="name">{dataQuestion.name}</h3>
      <p className="content">{dataQuestion.content}</p>
      {dataQuestion.answers.map((i) => (
        <div className="answer" key={i.answer_id}>
          <label htmlFor={i.answer_id}>{i.content_answer}</label>

          <input
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
