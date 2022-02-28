import React, { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import { Form, Tag, Button } from "antd";

import { getOrder } from "../../service/api";

import { convertTimeString, validateObjectId } from "../../utils";

import css from "./index.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const renderStatus = (status) => {
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
};

function ViewOrder(props) {
  const { id: orderId } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState({
    name: "",
    price: 0,
    description: "",
    status: "",
    created: "",
    updated: "",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (!orderId || !validateObjectId(orderId)) {
      return navigate("/404");
    }

    async function fetchOrder() {
      const result = await getOrder(orderId);

      setOrder(result);
    }

    fetchOrder();
  }, [orderId, navigate]);

  return (
    <div className={css.wrapper}>
      <Form {...formItemLayout} layout="horizontal" form={form}>
        <Form.Item label="Name">{order.name}</Form.Item>

        <Form.Item label="Price">{order.price.toFixed(2)}</Form.Item>

        <Form.Item label="Description">
          <div className={css.descWrapper}>{order.description || "-"}</div>
        </Form.Item>

        <Form.Item label="Status">{renderStatus(order.status)}</Form.Item>

        <Form.Item label="Created on">
          {order.created ? convertTimeString(order.created) : "-"}
        </Form.Item>

        <Form.Item label="Updated on">
          {order.updated ? convertTimeString(order.updated) : "-"}
        </Form.Item>

        <Form.Item>
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ViewOrder;
