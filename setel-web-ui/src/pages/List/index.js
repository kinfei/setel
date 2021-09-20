/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Popconfirm, Table, Tag, Divider, Button, message } from "antd";

import { Link } from "react-router-dom";

import { getOrders, cancelOrder } from "../../service/api";

import { convertTimeString } from "../../utils";

import css from "./index.less";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price) => (
      <span className={css.priceWrapper}>{price.toFixed(2)}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      switch (status) {
        case "created":
          return <Tag color="default">Created</Tag>;
        case "confirmed":
          return <Tag color="processing">Confirmed</Tag>;
        case "delivered":
          return <Tag color="success">Delivered</Tag>;
        case "cancelled":
          return <Tag color="error">Cancelled</Tag>;
        default:
          return <></>;
      }
    },
  },
  {
    title: "Created On",
    dataIndex: "created",
    render: convertTimeString,
  },
  {
    title: "Updated On",
    dataIndex: "updated",
    render: convertTimeString,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <>
          <Link to={`/order/${record.id}`}>View</Link>
          {record.status !== "cancelled" && record.status !== "delivered" ? (
            <>
              <Divider type="vertical" />

              <Popconfirm
                title="Are you sure to cancel order？"
                okText="Yes"
                cancelText="No"
                onConfirm={async () => {
                  await cancelOrder(record.id);

                  message.success("Order cancelled.");
                }}
              >
                <a href="#">Cancel</a>
              </Popconfirm>
            </>
          ) : (
            <></>
          )}
        </>
      );
    },
  },
];

function OrderList() {
  const [loadingData, setLoadingData] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      setLoadingData(true);
      const result = await getOrders();
      setLoadingData(false);

      setOrders(result);
    }

    fetchOrders();

    const pollingFetchData = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(pollingFetchData);
  }, []);

  return (
    <div className={css.App}>
      <div className={css.tableWrapper}>
        <div className={css.buttonWrapper}>
          <Link to="/order/create">
            <Button type="primary">Create</Button>
          </Link>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={orders}
          loading={loadingData}
        />
      </div>
    </div>
  );
}

export default OrderList;
