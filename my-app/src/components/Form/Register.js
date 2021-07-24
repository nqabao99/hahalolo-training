import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import { regesterAccount, setIsSuccess } from "../../redux/actions/account";
import {
  makeSelectListAccount,
  makeSelectStatusFlags,
} from "../../redux/selectors/account";
import { useFormStyle } from "./FormStyle";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Bạn chưa nhập trường này!")
    .min(2, "Họ phải từ 3-30 ký tự")
    .max(30, "Họ phải từ 3-30 ký tự"),
  lastName: yup
    .string()
    .required("Bạn chưa nhập trường này!")
    .min(1, "Tên phải từ 3-30 ký tự")
    .max(30, "Tên phải từ 3-30 ký tự"),
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

function Register(props) {
  const { triggerRegisterAccount, triggerResetIsSuccess, listAccount, status } =
    props;
  const classes = useFormStyle();
  let history = useHistory();
  const [message, setMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onHandleSubmit(data, e) {
    let ramdomID = Math.random().toString(36).substring(7);
    data.id = ramdomID;

    const check = listAccount.some((item) => item.account === data.account);
    if (!check) {
      e.target.reset();
      triggerRegisterAccount(data);
    } else {
      setMessage(true);
    }
  }

  useEffect(() => {
    if (status.isSuccess) {
      setMessage(false);
      history.push("/");
      triggerResetIsSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.isSuccess]);

  return (
    <Container className={classes.wrapperLogin} maxWidth="sm">
      <form onSubmit={handleSubmit(onHandleSubmit)} className={classes.form}>
        <Typography component="h4" variant="h4" align="center" color="primary">
          Đăng ký
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
            error={errors.firstName && true}
            // helperText={errors.firstName && errors.firstName?.message}
            type="text"
            label="Họ"
            variant="outlined"
            fullWidth
            autoComplete="true"
            {...register("firstName")}
          />
          <Typography className={classes.errors} component="p">
            {errors.firstName?.message}
          </Typography>
        </Box>
        <Box>
          <TextField
            error={errors.lastName && true}
            // helperText={errors.lastName && errors.lastName?.message}
            type="text"
            label="Tên"
            fullWidth
            variant="outlined"
            autoComplete="true"
            {...register("lastName")}
          />
          <Typography className={classes.errors} component="p">
            {errors.lastName?.message}
          </Typography>
        </Box>

        <Box className={classes.margin}>
          <TextField
            error={(errors.account || message) && true}
            // helperText={errors.account && errors.account?.message
            //   ? errors.account?.message
            //   : message
            //   ? "Trùng tên tài khoản"
            //   : null}
            label="Email"
            fullWidth
            variant="outlined"
            autoComplete="true"
            {...register("account")}
          />
          <Typography className={classes.errors} component="p">
            {errors.account?.message
              ? errors.account?.message
              : message
              ? "Trùng tên tài khoản"
              : null}
          </Typography>
        </Box>

        <Box>
          <TextField
            error={errors.password && true}
            // helperText={errors.password && errors.password?.message}
            type="password"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            autoComplete="true"
            {...register("password")}
          />
          <Typography className={classes.errors} component="p">
            {errors.password?.message}
          </Typography>
        </Box>

        <Button
          className={classes.margin}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
        >
          ĐĂNG KÝ
        </Button>
      </form>
    </Container>
  );
}

Register.propTypes = {
  triggerRegisterAccount: PropTypes.func,
  triggerResetIsSuccess: PropTypes.func,
  listAccount: PropTypes.array,
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  listAccount: makeSelectListAccount(),
  status: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerRegisterAccount: (infoAccount) =>
      dispatch(regesterAccount(infoAccount)),

    triggerResetIsSuccess: () => dispatch(setIsSuccess()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Register);
