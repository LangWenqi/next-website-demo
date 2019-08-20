import React from "react";
const Title = props => {
  return (
    <div className="home-component-title">
      <div className="titleText">{props.title}</div>
      <div className="titleNav" />
    </div>
  );
};
export default Title;
