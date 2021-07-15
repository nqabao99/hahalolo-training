import { makeStyles } from "@material-ui/core/styles";

export const useFormStyle = makeStyles(() => ({
  wrapperLogin: {
    paddingBottom: "450px",
  },
  form: {
    border: "1px solid #e1e1e1",
    borderRadius: "10px",
    padding: "20px 40px 10px",
  },
  margin: {
    margin: "20px 0",
  },
  loginOr: {
    position: "relative",
    color: "#aaa",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  span: {
    position: "absolute",
    left: "50%",
    top: "-1px",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
  },
  errors: {
    fontSize: "14px",
    color: "red",
    paddingTop: "10px",
    marginLeft: "15px",
    marginBottom: "-10px",
  },
  a: {
    color: "#3f51b5",
    "&:hover": {
        textDecoration: "underline",
    }
  }
}));
