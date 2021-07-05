import React from "react";

function QuestionItems({ data, handleGetAnswerChange, id }) {
    return (
        <div className="body-question__items">
            <h3 className="name">{data.name}</h3>
            <p className="content">{data.content}</p>
            {data.answer.map((i) => (
                <div className="answer" key={i.id_answer}>
                    <label htmlFor={i.id_answer}>{i.content_answer}</label>
                    <input
                        onChange={() => handleGetAnswerChange(i, id)}
                        id={i.id_answer}
                        name={data.name}
                        type="radio"
                    />
                </div>
            ))}
        </div>
    );
}

export default QuestionItems;
