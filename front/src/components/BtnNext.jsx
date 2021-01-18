import React from "react";

export default (props) => {
  const styles = {
    p: {
      width: "40%",
      display: "block",
    },
  };
  return (
    <button type="button" className="btn btn-lg" >
      <img
        src="/buttons/bt-next.png"
        alt=""
        style={styles.p}
        onClick={props.click}
      ></img>
    </button>
  );
};
