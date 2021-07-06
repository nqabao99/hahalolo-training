import React, { useState } from "react";

function Index({
  prevQuestion,
  nextQuestion,
  dataQuestion,
  selectQuestion,
  handleSelectQuestionClick,
  count,
}) {
  const [openListQuestion, setOpenListQuestion] = useState(false);

  const [selectChecked, setSelectChecked] = useState([]);

  const handleListQuestionClick = () => {
    setOpenListQuestion(!openListQuestion);
  };

  function selectCheckedChange(id) {
    const check = document.getElementById(id);
    if (check.checked) {
      setSelectChecked([...selectChecked, id]);
    } else {
      selectChecked.splice(selectChecked.indexOf(id), 1);
      setSelectChecked([...selectChecked]);
    }
  }

  const activeQuestion = selectQuestion.map((e) => e.parent_id);
  return (
    <div className="controlle">
      <div className="controlle-question">
        <div className="controlle-question__left">
          <p>20:00</p>
          {dataQuestion.map(
            (item, index) =>
              index === count && (
                <label htmlFor={item.id} key={`input${item.id}`}>
                  <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={selectChecked.includes(item.id)}
                    onChange={() => selectCheckedChange(item.id)}
                  />
                  Xem lại
                </label>
              )
          )}
        </div>
        <div>
          <i className="fa fa-caret-left" onClick={prevQuestion}></i>
          <i className="fa fa-caret-right" onClick={nextQuestion}></i>
          <i className="fa fa-ellipsis-h" onClick={handleListQuestionClick}></i>
        </div>
      </div>

      {openListQuestion && (
        <ul className="list-question">
          {dataQuestion.map((item, index) => (
            <li
              id={activeQuestion.includes(item.id) ? "select" : null}
              className={selectChecked.includes(item.id) ? "checked" : null}
              key={item.id}
              onClick={() => handleSelectQuestionClick(index)}
            >
              {item.name.slice(-1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Index;
