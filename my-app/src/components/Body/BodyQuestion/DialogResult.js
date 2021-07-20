import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import { contextBodyQuestion } from "./BodyQuestion";
import { useSelector } from "react-redux";

const useStyleDialog = makeStyles(() => ({
  titleRusult: {
    background: "#3f51b5",
    color: "#fff",
    padding: "10px 0",
  },
  containerStatistical: {
    display: "flex",
    padding: "10px 0",
  },
  textStatistical: {
    margin: "0 20px",
  },

  listResult: {
    borderTop: "1px solid #cfcfe9",
    padding: "20px",
  },
  tableResult: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "15px 0",
  },
  itemTableResult: {
    border: "1px solid #cfcfe9",
    padding: "2px 7px",
  },

  correct: {
    backgroundColor: "rgb(175, 252, 124)",
  },
  wrong: {
    backgroundColor: "rgb(251, 102, 102)",
  },
}));

export default function CustomizedDialogs({ closeResultModalClick }) {
  const classes = useStyleDialog();
  const context = useContext(contextBodyQuestion);
  const timeOut = useSelector((state) => state.question.timeOut);
  const result = useSelector((state) => state.question.result);

  return (
    <Dialog open={true}>
      <Typography
        className={classes.titleRusult}
        component="h6"
        variant="h6"
        align="center"
      >
        KẾT QUẢ
      </Typography>

      <Box className={classes.containerStatistical}>
        <Typography className={classes.textStatistical} component="p">
          Thời gian: {context.formatTime(600 - timeOut).slice(-5)}
        </Typography>
        <Typography className={classes.textStatistical} component="p">
          Điểm số: {result.scores}
        </Typography>
        <Typography className={classes.textStatistical} component="p">
          Số câu đúng: {result.countQuestionCorrect}
        </Typography>
        <Typography className={classes.textStatistical} component="p">
          Số câu sai: {result.countQuestionWrong}
        </Typography>
      </Box>

      <Box className={classes.listResult}>
        <Typography align="center" component="p">
          Đáp án của bạn
        </Typography>
        <Box className={classes.tableResult}>
          {context.selectQuestion.map((item) => (
            <Typography
              component="span"
              key={item.answer_id}
              className={clsx(
                classes.itemTableResult,
                item.result ? classes.correct : classes.wrong
              )}
            >
              {`${
                item.parent_id.length > 10
                  ? item.parent_id.slice(-2)
                  : item.parent_id.slice(-1)
              } - 
                  ${item.content_answer.slice(0, 1)}`}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box className={classes.listResult}>
        <Typography align="center" component="p">
          Đáp án đúng
        </Typography>
        <Box className={classes.tableResult}>
          {context.dataQuestion.map((item, index) => (
            <Typography
              component="span"
              className={classes.itemTableResult}
              key={item.id}
            >
              {item.answers.map((i) =>
                i.result
                  ? `${index + 1} - 
                        ${i.content_answer.slice(0, 1)}`
                  : null
              )}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        style={{ border: "1px solid #cfcfe9" }}
        className={classes.tableResult}
      >
        <Button
          variant="contained"
          onClick={closeResultModalClick}
          color="primary"
        >
          Xong
        </Button>
      </Box>
    </Dialog>
  );
}
