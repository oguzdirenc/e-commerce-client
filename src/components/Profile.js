import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {}
  render() {
    return <div>hi</div>;
  }
}

const mapStateToProps = (state) => {
  const { security } = state;

  return { security: security };
};
export default connect(mapStateToProps, null)(Profile);
