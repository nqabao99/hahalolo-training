import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useButtonStyles } from "../../../common/ButtonStyle";
import Oclock from "../../../common/Oclock";

function Index({ prevQuestion, nextQuestion, handleSelectQuestionClick }) {
  const classes = useButtonStyles();
  const dataQuestion = useSelector((state) => state.question.dataQuestion);
  const count = useSelector((state) => state.question.count);
  const selectQuestion = useSelector((state) => state.question.selectQuestion);

  const [openListQuestion, setOpenListQuestion] = useState(false);

  const [selectChecked, setSelectChecked] = useState([]);

  const handleListQuestionClick = () => {
    setOpenListQuestion(!openListQuestion);
  };

  function selectCheckedChange(e, id) {
    const check = e.target.checked;
    if (check) {
      setSelectChecked([...selectChecked, id]);
    } else {
      selectChecked.splice(selectChecked.indexOf(id), 1);
      setSelectChecked([...selectChecked]);
    }
  }

  const activeQuestion = selectQuestion?.map((e) => e.parent_id);
  return (
    <div className="controlle">
      <div className="controlle-question">
        <div className="controlle-question__left">
          <Button
            variant="contained"
            className={clsx(classes.button, classes.mr)}
            type="submit"
          >
            Nộp bài
          </Button>
          {dataQuestion.map(
            (item, index) =>
              index === count && (
                <FormControlLabel
                  label="Xem Lại"
                  key={`input${item.id}`}
                  control={
                    <Checkbox
                      checked={selectChecked.includes(item.id)}
                      color="secondary"
                      id={item.id}
                      onChange={(e) => selectCheckedChange(e, item.id)}
                    />
                  }
                />
              )
          )}

          <Oclock />
        </div>
        <div>
          <Button
            disabled={count === 0 ? true : false}
            type="button"
            className={clsx(
              classes.button,
              classes.icon,
              classes.controlleButton
            )}
            onClick={prevQuestion}
          >
            <i className="fa fa-caret-left"></i>
          </Button>

          <Button
            disabled={count < dataQuestion.length - 1 ? false : true}
            type="button"
            className={clsx(
              classes.button,
              classes.icon,
              classes.controlleButton
            )}
            onClick={nextQuestion}
          >
            <i className="fa fa-caret-right"></i>
          </Button>

          <Button
            type="button"
            className={clsx(
              classes.button,
              classes.icon,
              classes.controlleButton
            )}
            onClick={handleListQuestionClick}
          >
            <i className="fa fa-ellipsis-h"></i>
          </Button>
        </div>
      </div>

      {openListQuestion && (
        <ul className="list-question">
          {dataQuestion.map((item, index) => (
            <li
              id={activeQuestion.includes(item.id) ? "select" : null}
              className={selectChecked.includes(item.id) ? "checked" : null}
              key={`ss${item.id}`}
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
