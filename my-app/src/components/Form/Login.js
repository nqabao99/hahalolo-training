import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { contextApp } from "../../App";
import Input from "../../common/Input";
import "./login-style.scss";

function Login() {
  let history = useHistory();
  const context = useContext(contextApp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          <Input type="button" value="ĐĂNG NHẬP BẰNG FACEBOOK" />
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <span>hoặc</span>
          </div>
        </div>
        <div className="group-form">
          <Input
            type="email"
            placeholder="Nhập tên đăng nhập/Email"
            {...register("account", { required: true })}
          />
          {errors.account && <p>Bạn chưa nhập trường này!</p>}
        </div>
        <div className="group-form">
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Bạn chưa nhập trường này!</p>}
        </div>
        <p className="forget-password">
          Quên mật khẩu? <a href="/#"> Nhấn vào đây</a>
        </p>
        <div className="group-form">
          <Input type="submit" value="ĐĂNG NHẬP" />
        </div>
        <p className="signup">
          Nếu bạn chưa có tài khoản? <Link to="/register"> Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
