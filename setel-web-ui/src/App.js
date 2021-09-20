import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import { createHashHistory } from "history";

import OrderList from "./pages/List";

import NewOrder from "./pages/New";

import Order from "./pages/Order";

import NotFound from "./pages/NotFound";

const history = createHashHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={OrderList} />
        <Route path="/order/create" component={NewOrder} />
        <Route path="/order/:id" component={Order} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
