import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { useButtonStyles } from "../../../../common/ButtonStyle";
import Oclock from "../../../../common/Oclock";
import { contextBodyQuestion } from "../BodyQuestion";

function Index({ prevQuestion, nextQuestion, handleSelectQuestionClick }) {
  const classes = useButtonStyles()
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
                // <label htmlFor={item.id} key={`input${item.id}`}>
                //   <Input
                //     id={item.id}
                //     type="checkbox"
                //     defaultChecked={selectChecked.includes(item.id)}
                //     onChange={() => selectCheckedChange(item.id)}
                //   />
                  
                //   Xem lại
                // </label>

                <FormControlLabel
                key={`input${item.id}`}
                    checked={selectChecked.includes(item.id)}
                    control={
                      <Checkbox
                        color="secondary"
                        id={item.id}
                        onChange={() => selectCheckedChange(item.id)}
                      />
                    }
                    label="Xem Lại"
                  />
              
              )
          )}
        </div>
        <div>
          <Button
            disabled={context.count === 0 ? true : false}
            type="button"
            className={clsx(classes.button, classes.icon, classes.controlleButton)}
            onClick={prevQuestion}
          >
            <i className="fa fa-caret-left"></i>
          </Button>

          <Button
            disabled={
              context.count < context.dataQuestion.length - 1 ? false : true
            }
            type="button"
            className={clsx(classes.button, classes.icon, classes.controlleButton)}
            onClick={nextQuestion}
          >
            <i className="fa fa-caret-right"></i>
          </Button>

          <Button
            type="button"
            className={clsx(classes.button, classes.icon, classes.controlleButton)}
            onClick={handleListQuestionClick}
          >
            <i className="fa fa-ellipsis-h"></i>
          </Button>
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
