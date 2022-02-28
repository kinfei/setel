import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Form, Input, Button, message } from "antd";

import { createOrder } from "../../service/api";

import css from "./index.less";

function NewOrder(props) {
  const [form] = Form.useForm();

  const [loadingData, setLoadingData] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.name && values.price) {
      setLoadingData(true);
      const result = await createOrder(values);
      setLoadingData(false);

      if (result.id) {
        message.success("Order created.");

        navigate("/");
      }
    }
  };

  return (
    <div className={css.wrapper}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name: "", price: 0, description: "" }}
      >
        <Form.Item
          label="Name"
          name="name"
          maxLength="100"
          rules={[{ required: true, message: "Please enter name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price." }]}
        >
          <Input type="number" min={0} max={999999} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            maxLength="1000"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Form.Item>
          <div className={css.btnWrapper}>
            <Button type="primary" htmlType="submit" loading={loadingData}>
              Submit
            </Button>

            <Link to="/">
              <Button>Cancel</Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewOrder;
