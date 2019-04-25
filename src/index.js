import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { HashRouter, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from "axios";


import Reducers from "./reducers";
import Routes from "./routes";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import "react-bootstrap-typeahead/css/Typeahead.css";
import * as serviceWorker from "./serviceWorker";
import { API_URL } from './constants';

const store = createStore(Reducers, applyMiddleware(thunk));



axios.get(`${API_URL}/public/theme_customization/general_settings/1/item`, {
})
  .then((response) =>
  {
    console.log(response)
    ReactDOM.render(
      <HashRouter>
        <Provider store={store}>
          <Helmet>
            <title>{response.data.data.site_title}</title>
            <link rel="shortcut icon" href={`${API_URL}/${response.data.data.favicon_image}`} />
          </Helmet>
          <Route component={Routes} />
        </Provider>
      </HashRouter>,
      document.getElementById("root")
    );

  })
  .catch(function (error)
  {
  });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
