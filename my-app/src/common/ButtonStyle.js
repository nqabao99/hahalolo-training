import { makeStyles } from "@material-ui/core/styles";


export const useButtonStyles = makeStyles(() =>({
  button: {
    display: "block",
    margin: "10px auto",
    padding: "5px 20px",
    color: "#535353",
    background: "#f1f1f1",
    fontSize: "14px",
    "&:hover":{
      color: "#fff",
      background: "#ffb83c",
    },
    "&:disabled": {
      backgroundColor: "rgba(239, 239, 239, 0.5)",
      color: "rgba(59, 59, 59, 0.5)",
    }
    
  }

  ,startButton: {
    padding: "10px 40px",
    fontSize: "20px"
  } 
  ,mt:{
    marginTop: "20px"
  }
  ,mr:{
    marginRight: "20px"
  },
  icon: {
    fontSize: "18px",
  },
  controlleButton: {
    display: "inline",
    marginLeft: "10px",
    padding: "0",
    maxWidth: "50px"
  }

  
}))