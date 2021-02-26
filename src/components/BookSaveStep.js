import React, { Component } from "react";
import { Icon, Step } from "semantic-ui-react";

export default class BookSaveStep extends Component {
  render() {
    return (
      <div>
        <Step.Group fluid>
          <Step active={this.props.steps.stepOne}>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Kitap</Step.Title>
              <Step.Description>
                Kitap bilgilerini belirleyiniz
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active={this.props.steps.stepTwo}>
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Yazar</Step.Title>
              <Step.Description>
                Yazar bilgilerini belirleyiniz
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active={this.props.steps.stepTree}>
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Stok</Step.Title>
              <Step.Description>Stok bilgilerini belirleyiniz</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
    );
  }
}
