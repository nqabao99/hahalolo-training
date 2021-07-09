import React, { useContext, useState } from "react";
import Oclock from "../../../../common/Oclock";
import { contextBodyQuestion } from "../BodyQuestion";
import Button from "../../../../common/Button/index";
import Input from "../../../../common/Input";

function Index({ prevQuestion, nextQuestion, handleSelectQuestionClick }) {
  const context = useContext(contextBodyQuestion);

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

  const activeQuestion = context.selectQuestion.map((e) => e.parent_id);
  return (
    <div className="controlle">
      <div className="controlle-question">
        <div className="controlle-question__left">
          <Oclock />
          {context.dataQuestion.map(
            (item, index) =>
              index === context.count && (
                <label htmlFor={item.id} key={`input${item.id}`}>
                  <Input
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
          <Button
            disabled={context.count === 0 ? true : false}
            type="button"
            className="btn-next"
            onClick={prevQuestion}
            icon="fa fa-caret-left"
          ></Button>

          <Button
            disabled={
              context.count < context.dataQuestion.length - 1 ? false : true
            }
            type="button"
            className="btn-next"
            onClick={nextQuestion}
            icon="fa fa-caret-right"
          ></Button>

          <Button
            type="button"
            className="btn-next"
            onClick={handleListQuestionClick}
            icon="fa fa-ellipsis-h"
          ></Button>
        </div>
      </div>

      {openListQuestion && (
        <ul className="list-question">
          {context.dataQuestion.map((item, index) => (
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
