/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createArticleApi, getChannelApi } from "@/api/article";
const { Option } = Select;

const Publish = () => {
  const [channels, setChannels] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imageType, setImageType] = useState(1);

  function onFinish(values: any) {
    console.log(values);
    const reqData = {
      title: values.title,
      content: values.content,
      cover: {
        type: 0,
        images: [],
      },
      channel_id: values.channel_id,
    };
    createArticleApi(reqData);
  }

  function onChange(value: any) {
    console.log(value);
    setFileList(value.fileList);
    console.log(fileList);
  }

  function onTypeChange(item: any) {
    setImageType(item.target.value);
  }

  useEffect(() => {
    async function getChannelList() {
      const res = await getChannelApi();
      setChannels(res.data.channels);
    }
    getChannelList();
  }, []);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: imageType }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item: any) => (
                <Select key={item.id} value={item.id}>
                  {item.name}
                </Select>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action="https://geek.itheima.net/api/v1_0/upload"
                name="image"
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
