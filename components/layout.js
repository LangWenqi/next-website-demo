import React, { Component } from "react";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import Head from "../components/head";
import stylesheet from "../less/index.less";
export default props => (
  <div>
    <Head />
    {props.isAll ? null : <Header />}
    <div className={props.isAll ? null : "rootContainer"}>{props.children}</div>
    {props.isAll ? null : <Footer />}
    <style jsx global>
      {stylesheet}
    </style>
  </div>
);
