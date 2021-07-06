import React, { useState } from "react";
import Oclock from "../../../../common/Oclock";

function Index({
  prevQuestion,
  nextQuestion,
  dataQuestion,
  selectQuestion,
  handleSelectQuestionClick,
  count,
  stopTime,
  formatTime,
  getTimerOclock,
  getTimeNow,
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
          <Oclock
            getTimeDown={getTimerOclock}
            stop={stopTime}
            formatTime={formatTime}
            getTimeNow={getTimeNow}
          />
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
          <button
            disabled={count === 0 ? true : false}
            type="button"
            className="btn-next"
            onClick={prevQuestion}
          >
            <i className="fa fa-caret-left"></i>
          </button>

          <button
            disabled={count < dataQuestion.length - 1 ? false : true}
            type="button"
            className="btn-next"
            onClick={nextQuestion}
          >
            <i className="fa fa-caret-right"></i>
          </button>

          <button
            type="button"
            className="btn-next"
            onClick={handleListQuestionClick}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
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
              {index + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Index;
