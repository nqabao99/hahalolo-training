import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { contextApp } from "../../App";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinkMUI from "@material-ui/core/Link";

import { useFormStyle } from "./FormStyle";

const schema = yup.object().shape({
  account: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn chưa nhập trường này!"),
  password: yup
    .string()
    .required("Bạn chưa nhập trường này!")
    .min(3, "Mật khẩu phải từ 3-30 ký tự")
    .max(30, "Mật khẩu phải từ 3-30 ký tự"),
});

function Login() {
  const classes = useFormStyle();
  let history = useHistory();
  const context = useContext(contextApp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onHandleSubmit = (data) => {
    if (context.listAccount) {
      let check = context.listAccount.find(
        (item) =>
          item.account === data.account && item.password === data.password
      );

      if (check) {
        localStorage.setItem("user-info", JSON.stringify(check));
        context.handleReset("login");
        history.push("/");
      } else {
        alert("Sai ten tai khoan hoac mat khau");
      }
    }
  };
  return (
    <Container className={classes.wrapperLogin} maxWidth="sm">
      <form onSubmit={handleSubmit(onHandleSubmit)} className={classes.form}>
        <Typography component="h4" variant="h4" align="center" color="primary">
          Đăng Nhập
        </Typography>

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.margin}
        >
          ĐĂNG NHẬP BẰNG FACEBOOK
        </Button>

        <Box className={classes.loginOr}>
          <Typography component="hr"></Typography>
          <Typography className={classes.span} component="span">
            hoặc
          </Typography>
        </Box>

        <Box className={classes.margin}>
          <TextField
            error={errors.account&& true}
            // helperText={errors.account && errors.account?.message}
            label="Nhập Email"
            fullWidth
            variant="outlined"
            autoComplete="true"
            {...register("account")}
          />
          <Typography className={classes.errors} component="p">
            {errors.account?.message}
          </Typography>
        </Box>
        <Box>
          <TextField
            error={errors.password&& true}
            // helperText={errors.password && errors.password?.message}
            type="password"
            label="Nhập mật khẩu"
            fullWidth
            variant="outlined"
            autoComplete="true"
            {...register("password")}
          />
          <Typography className={classes.errors} component="p">
            {errors.password?.message}
          </Typography>
        </Box>
        <Typography className={classes.margin} component="p" align="right">
          Quên mật khẩu? <LinkMUI href="/#"> Nhấn vào đây</LinkMUI>
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
        >
          ĐĂNG NHẬP
        </Button>

        <Typography className={classes.margin} component="p" align="right">
          Nếu bạn chưa có tài khoản?<Link className={classes.a} to="/register"> Đăng ký ngay</Link>
        </Typography>
      </form>
    </Container>
  );
}

export default Login;
