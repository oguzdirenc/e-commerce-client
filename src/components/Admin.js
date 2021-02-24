import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class Admin extends Component {
  state = {
    bookSearch: "",
  };

  render() {
    return (
      <div>
        <Input
          onChange={(event) => {
            this.setState({
              bookSearch: event.target.value,
            });
            {
              console.log(event);
            }
          }}
          placeholder="Search ..."
        ></Input>
      </div>
    );
  }
}

export default Admin;
