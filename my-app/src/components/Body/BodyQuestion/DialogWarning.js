import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";

const useStyleDialog = makeStyles(() => ({
  containerDialog: {
    padding: "30px",
  },
  mg: {
    margin: "15px 0 25px",
  },
  containerButon: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function CustomizedDialogs({
  warning,
  handleCloseWarning,
  handleWarningBoxSubmit,
}) {
  const classes = useStyleDialog();

  const dataQuestion = useSelector((state) => state.question.dataQuestion);
  const selectQuestion = useSelector((state) => state.question.selectQuestion);

  return (
    <Dialog onClose={handleCloseWarning} open={warning}>
      <Box className={classes.containerDialog}>
        <Typography component="h5" variant="h5" align="center">
          Bạn còn {dataQuestion.length - selectQuestion.length} câu chưa trả lời
        </Typography>
        <Typography className={classes.mg} align="center" component="p">
          Bạn đồng ý nộp chứ?
        </Typography>
        <Box className={classes.containerButon}>
          <Button
            variant="contained"
            onClick={handleWarningBoxSubmit}
            color="secondary"
          >
            Nộp bài
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseWarning}
            color="primary"
          >
            Làm tiếp
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
