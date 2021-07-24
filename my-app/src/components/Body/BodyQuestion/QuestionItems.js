import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";

function QuestionItems({
  itemQuestion,
  handleGetAnswerChange,
  selectQuestion,
}) {
  const activeAnswer = selectQuestion.map((e) => e.answer_id);
  return (
    <div className="body-question__items">
      <h3 className="name">{itemQuestion.name}</h3>
      <p className="content">{itemQuestion.content}</p>
      {itemQuestion.answers.map((i) => (
        <Box
          key={i.answer_id}
          style={{
            border: "1px solid #e2e2e2",
            paddingLeft: "10px",
            marginBottom: "5px",
          }}
        >
          <FormControl fullWidth>
            <RadioGroup
              aria-label={i.content_answer}
              onChange={() => handleGetAnswerChange(i)}
              name={i.parent_id}
            >
              <FormControlLabel
                checked={activeAnswer.includes(i.answer_id)}
                value={i.content_answer}
                control={<Radio color="primary" />}
                label={i.content_answer}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
    </div>
  );
}

export default QuestionItems;
