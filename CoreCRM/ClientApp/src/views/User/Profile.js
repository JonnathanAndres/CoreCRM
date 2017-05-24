/* eslint-env browser */
import React, { PropTypes } from 'react';
import { Form, Input, Button, Select, Radio, Upload, Icon, message } from 'antd';
import { connect } from 'dva';
import styles from './Profile.less';

function Profile({ form, dispatch }) {
  const { getFieldDecorator } = form;
  if (dispatch === undefined) dispatch({});

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  // options for avatar uploader
  const imageUrl = null;
  function getBase64(img, callback) {
    if (typeof window.FileReader === 'function') {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  }
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, () => {});
    }
  };
  const beforeUpload = (file) => {
    const isAllowedType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isAllowedType) {
      message.error('只支持 JPEG 和 PNG 格式的文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('头像文件大小不能大于 2MB');
    }
    return isAllowedType && isLt2M;
  };

  // prefix for phone input
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(<Select className={styles.icpSelector}>
    <Select.Option value="86">+86</Select.Option>
  </Select>);

  return (
    <div>
      <Form.Item
        label="头像"
        {...formItemLayout}
      >
        {getFieldDecorator('Avatar', {
          valuePropName: 'Avatar',
        })(<Upload
          className="avatar-uploader"
          name="avatar"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={handleAvatarChange}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt="" className="avatar" /> :
              <Icon type="plus" className="avatar-uploader-trigger" />
          }
        </Upload>)}
      </Form.Item>
      <Form layout="horizontal">
        <Form.Item
          label="用户名"
          {...formItemLayout}
        >
          {getFieldDecorator('UserName', {
            rules: [{
              required: true, message: '用户名不能为空',
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="账号状态"
          {...formItemLayout}
        >
          {getFieldDecorator('State', {

          })(<Select>
            <Option value="1">可用</Option>
            <Option value="0">停用</Option>
          </Select>)}
        </Form.Item>
        <Form.Item
          label="部门"
          {...formItemLayout}
        >
          {getFieldDecorator('Department', {

          })(<Select>
            <Select.Option value="1">办公室</Select.Option>
            <Select.Option value="2">销售部</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item
          label="岗位"
          {...formItemLayout}
        >
          {getFieldDecorator('Position', {

          })(<Select>
            <Select.Option value="1">CEO</Select.Option>
            <Select.Option value="2">秘书</Select.Option>
          </Select>)}
        </Form.Item>
        <Form.Item
          label="性别"
          {...formItemLayout}
        >
          {getFieldDecorator('Gender', {

          })(<Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>)}
        </Form.Item>
        <Form.Item
          label="邮箱"
          {...formItemLayout}
        >
          {getFieldDecorator('Email', {
            rules: [{
              type: 'email', message: '请输入有效的 Email 地址',
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="手机"
          {...formItemLayout}
        >
          {getFieldDecorator('Phone')(<Input addonBefore={prefixSelector} />)}
        </Form.Item>
        <Form.Item
          label="联系地址"
          {...formItemLayout}
        >
          {getFieldDecorator('Address')(<Input />)}
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" size="large">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Profile.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(Form.create()(Profile));
