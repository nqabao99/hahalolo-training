import { makeStyles } from "@material-ui/core/styles";

export const useStyleChooseTopic = makeStyles(() => ({
  container: {
    backgroundColor: "#fff",
    width: "67%",
    padding: 30,
    border: "solid 1px #d9d9d9",
    borderRadius: 8,
  },
  mg: {
    padding: "30px 0",
  },
  mgt: {
    marginTop: 20,
  },
  textRed: {
    color: "red",
  },
  containerTextField: {
    display: "flex",
    justifyContent: "space-between",
  },
  widthTextField: {
    width: "48%",
  },
  exemItem: {
    width: "30%",
    border: "solid 1px #d9d9d9",
    borderRadius: "5px",
    padding: 20,
    textAlign: "center",
    lineHeight: "20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1f31b4",
      color: "#fff",
      transition: "all 0.3s",
    },
  },
  exemTitle: {
    fontWeight: 700,
  },
}));
