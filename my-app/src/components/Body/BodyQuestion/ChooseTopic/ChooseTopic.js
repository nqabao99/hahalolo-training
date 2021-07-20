import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ItemExam from "./ItemExam";

import { useStyleChooseTopic } from "./style";
import { useButtonStyles } from "../../../../common/ButtonStyle";
import clsx from "clsx";

export default function ChooseTopic({ handleStartClick }) {
  const classesBtn = useButtonStyles();
  const classes = useStyleChooseTopic();
  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" component="h2">
        Đề Trắc Nghiệm Lớp 6
      </Typography>
      <Box className={classes.mg}>
        <Typography className={classes.textRed} component="p">
          B1: Chọn lớp và môn
        </Typography>
        <Box className={classes.containerTextField}>
          <TextField
            className={classes.widthTextField}
            fullWidth
            label="Lớp"
            select
            value=""
          >
            <MenuItem value="6">Lớp 6</MenuItem>
            <MenuItem value="7">Lớp 7</MenuItem>
            <MenuItem value="8">Lớp 8</MenuItem>
            <MenuItem value="9">Lớp 9</MenuItem>
          </TextField>

          <TextField
            className={classes.widthTextField}
            fullWidth
            label="Môn"
            select
            value=""
          >
            <MenuItem value="toan">Toán</MenuItem>
            <MenuItem value="ta">Tiếng Anh</MenuItem>
            <MenuItem value="ly">Lý</MenuItem>
            <MenuItem value="hoa">Hóa</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Box className={classes.mg}>
        <Typography className={classes.textRed} component="p">
          B2: Chọn loại đề
        </Typography>
        <Box className={clsx(classes.containerTextField, classes.mgt)}>
          <ItemExam title="Đề kiểm tra 15 phút" number="10" active="active" />
          <ItemExam title="Đề kiểm tra 1 tiết" number="30" />
          <ItemExam title="Đề thi giữa kỳ, học kỳ" number="50" />
        </Box>
      </Box>

      <Button
        type="button"
        size="large"
        onClick={handleStartClick}
        className={clsx(classesBtn.button, classesBtn.startButton, classes.mgt)}
      >
        BẮT ĐẦU LÀM BÀI
      </Button>
    </Container>
  );
}
