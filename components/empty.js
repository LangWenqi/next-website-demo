import React, { Component } from "react";
class Empty extends Component {
  render() {
    return <div className="empty-wrapper">{this.props.children}</div>;
  }
}

export default Empty;
