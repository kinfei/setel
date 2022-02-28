import React from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import OrderList from "./pages/List";

import NewOrder from "./pages/New";

import Order from "./pages/Order";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<OrderList />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/order/create" element={<NewOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
