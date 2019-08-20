import React, { Component } from "react";

class NewsEmpty extends Component {
  render() {
    return (
      <div className="news-empty-container">
        <img src="" alt="" />
        <div className="text">{this.props.text}</div>
      </div>
    );
  }
}
export default NewsEmpty;
