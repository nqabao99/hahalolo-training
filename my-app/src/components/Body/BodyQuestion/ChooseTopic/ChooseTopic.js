import React from "react";
import "./style.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { useButtonStyles } from "../../../../common/ButtonStyle";
import clsx from "clsx";

export default function ChooseTopic({ handleStartClick }) {
  const classes = useButtonStyles();
  return (
    <div className="choose-topic">
      <h2 className="choose-topic_title">Đề Trắc Nghiệm Lớp 6</h2>
      <div className="choose-topic__step1">
        <h3 className="choose-topic__step1-title">B1: Chọn lớp và môn</h3>
        <div className="choose-topic__step1-select">
            <TextField  fullWidth label="Lớp" select value="">
              <MenuItem value="6">Lớp 6</MenuItem>
              <MenuItem value="7">Lớp 7</MenuItem>
              <MenuItem value="8">Lớp 8</MenuItem>
              <MenuItem value="9">Lớp 9</MenuItem>
            </TextField>
            <TextField  fullWidth label="Môn" select value="">
              <MenuItem value="toan">Toán</MenuItem>
              <MenuItem value="ta">Tiếng Anh</MenuItem>
              <MenuItem value="ly">Lý</MenuItem>
              <MenuItem value="hoa">Hóa</MenuItem>
            </TextField>
          
        </div>
      </div>
      <div className="choose-topic__step2">
        <h3 className="choose-topic__step2-title">B2: Chọn loại đề</h3>
        <div className="choose-topic__step2-exam">
        <div className="choose-topic__step2-exam-type active">
            <h3 className="title">Đề kiểm tra 15 phút</h3>
            <p>10 câu/10'</p>
          </div>

          <div className="choose-topic__step2-exam-type">
            <h3 className="title">Đề kiểm tra 1 tiết</h3>
            <p>30 câu/30'</p>
          </div>
          <div className="choose-topic__step2-exam-type ">
            <h3 className="title">Đề thi giữa kỳ, học kỳ</h3>
            <p>50 câu/50'</p>
          </div>
          
          
        </div>
      </div>
      <div className="choose-topic__step3">
        <Button
          type="button"
          size="large"
          onClick={handleStartClick}
          className={clsx(classes.button , classes.startButton) }
        >
        BẮT ĐẦU LÀM BÀI
        </Button>
      </div>
    </div>
  );
}
