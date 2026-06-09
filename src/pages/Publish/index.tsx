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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createArticleApi, getArticleDetailApi } from "@/api/article";
import { useChannel } from "@/hooks/useChannel";
const { Option } = Select;

const Publish = () => {
  const [fileList, setFileList] = useState([]);
  const [imageType, setImageType] = useState(1);
  const { channels } = useChannel();

  function onFinish(values: any) {
    if (fileList.length !== imageType)
      return message.warning("封面类型与上传数量不匹配");

    const reqData = {
      title: values.title,
      content: values.content,
      cover: {
        type: imageType,
        images: fileList.map((item: any) => item.response.data.url),
      },
      channel_id: values.channel_id,
    };
    console.log(reqData);
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

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form] = Form.useForm();
  // 回填数据
  useEffect(() => {
    async function getArticle() {
      const res = await getArticleDetailApi(id);
      setImageType(res.data.cover.type);
      setFileList(
        res.data.cover.images.map((url) => {
          return { url };
        }),
      );
      console.log(
        res.data.cover.images.map((url) => {
          return { url };
        }),
      );
      form.setFieldsValue({ ...res.data, type: res.data.cover.type });
    }
    id&&getArticle();
  }, [id, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${id ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          form={form}
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
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
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
                action="https://geek.itheima.net/v1_0/upload"
                name="image"
                onChange={onChange}
                maxCount={imageType}
                fileList={fileList}
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
