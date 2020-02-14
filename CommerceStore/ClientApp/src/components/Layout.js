import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NaviMenu from './NaviMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NaviMenu />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
