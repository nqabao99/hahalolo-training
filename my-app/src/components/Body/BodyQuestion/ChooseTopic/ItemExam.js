import React from "react";
import { useStyleChooseTopic } from "./style";

function ItemExam({ title, number }) {
  const classes = useStyleChooseTopic();
  return (
    <div className={classes.exemItem}>
      <h3 className={classes.exemTitle}>{title}</h3>
      <p>
        {number} câu/{number}'
      </p>
    </div>
  );
}

export default ItemExam;
