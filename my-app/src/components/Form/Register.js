import React from "react";
import "./login-style.scss";
import Input from "../../common/Input";
import { useForm } from "react-hook-form";

function Register() {
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
          {errors.account && <p>Bạn chưa nhập trường này!</p>}
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
