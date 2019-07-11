import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import RoutesWrapper from './styles';
import NotFoundPage from '../containers/404Page';

class Routes extends Component {
  componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      setTimeout(() => {
        // fade out
        ele.classList.add('available');
        console.log('ele', ele.classList);
      }, 500);
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = '';
      }, 1500);
    }
  }

  render() {
    return (
      <RoutesWrapper>
        <PrivateRoutes />
        <PublicRoutes />
        <Route component={NotFoundPage} />
      </RoutesWrapper>
    );
  }
}

export default Routes;
