import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { contextBodyQuestion } from "./BodyQuestion";

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
  const context = useContext(contextBodyQuestion);

  return (
    <Dialog onClose={handleCloseWarning} open={warning}>
      <Box className={classes.containerDialog}>
        <Typography component="h5" variant="h5" align="center">
          Bạn còn {context.dataQuestion.length - context.selectQuestion.length}{" "}
          câu chưa trả lời
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
