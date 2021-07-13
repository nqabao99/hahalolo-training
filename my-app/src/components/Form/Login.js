import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { contextApp } from "../../App";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login-style.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


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
    <div className="wrapper-login">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <h2>Đăng Nhập</h2>
        <div className="group-form">
          <Button 
          type="button"
          fullWidth
          variant="contained" 
          color="primary"  
          size="large"
          >ĐĂNG NHẬP BẰNG FACEBOOK</Button>
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <span>hoặc</span>
          </div>
        </div>
        <div className="group-form">
          <TextField  
          id="outlined-basic" 
          type="email"
          label="Nhập Email" 
          fullWidth
          variant="outlined"
          {...register("account")} />
          <p>{errors.account?.message}</p>
        </div>
        <div className="group-form">
          <TextField  
          id="outlined-basic" 
          type="password"
          label="Nhập mật khẩu" 
          fullWidth
          variant="outlined"
          {...register("password")}/>
          <p>{errors.password?.message}</p>
        </div>
        <p className="forget-password">
          Quên mật khẩu? <a href="/#"> Nhấn vào đây</a>
        </p>
        <div className="group-form">
          <Button 
          type="submit"
          fullWidth
          variant="contained" 
          color="secondary"  
          size="large"
          >ĐĂNG NHẬP</Button>
        </div>
        <p className="signup">
          Nếu bạn chưa có tài khoản? <Link to="/register"> Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
