import React from "react";
import "./login-style.scss";
import Input from "../../common/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onHandleSubmit = (data) => {
    console.log(data);
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
            type="text"
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
