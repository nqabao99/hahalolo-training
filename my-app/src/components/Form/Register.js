import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { contextApp } from "../../App";
import Input from "../../common/Input";
import "./login-style.scss";
import { useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();
  const [message, setMessage] = useState(false);

  const context = useContext(contextApp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onHandleSubmit(data, e) {
    let ramdomID = Math.random().toString(36).substring(7);
    data.id = ramdomID;

    const check = context.listAccount.some(
      (item) => item.account === data.account
    );
    if (!check) {
      e.target.reset();
      setMessage(false);

      let result = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      context.handleReset("register");
      history.push("/");
    } else {
      setMessage(true);
    }
  }

  return (
    <div className="wrapper-login">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <h2>Đăng ký</h2>

        <div className="group-form">
          <Input type="button" value="ĐĂNG KÝ BẰNG FACEBOOK" />
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <span>hoặc</span>
          </div>
        </div>
        <div className="group-form group-form__cover">
          <div>
            <Input
              type="text"
              placeholder="Họ"
              {...register("fistName", { required: true })}
            />
            {errors.fistName && <p>Bạn chưa nhập trường này!</p>}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Tên"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <p>Bạn chưa nhập trường này!</p>}
          </div>
        </div>
        <div className="group-form">
          <Input
            type="email"
            placeholder="Tên đăng nhập/Email"
            {...register("account", { required: true })}
          />
          {errors.account ? (
            <p>Bạn chưa nhập trường này!</p>
          ) : message ? (
            <p>Trùng tên tài khoản</p>
          ) : null}
        </div>

        <div className="group-form">
          <Input
            type="password"
            placeholder="Mật khẩu"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Bạn chưa nhập trường này!</p>}
        </div>

        <div className="group-form">
          <Input type="submit" value="ĐĂNG KÝ" />
        </div>
      </form>
    </div>
  );
}

export default Register;
