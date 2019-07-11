import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { ConfigProvider, Empty } from 'antd';
import store, { history } from './redux/store';
import theme from './configs/theme';
import Routes from './routes';
import './configs/language';
import * as serviceWorker from './serviceWorker';
import AppWrapper from './appStyle';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <ConnectedRouter history={history}>
          <ConfigProvider renderEmpty={() => <Empty />}>
            <Routes />
          </ConfigProvider>
        </ConnectedRouter>
      </AppWrapper>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
