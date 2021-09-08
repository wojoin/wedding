import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from 'utils/city'
import { t } from "@lingui/macro"
// import Rater from "../../../utils/Rater.js"
// import { Rate } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class ScheduleModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
        
        console.log("===schedule data===", data)
        
        // if(!data.longmenjia) {
        //   data.longmenjia = 60
        // }
        

        // 提交对话框的数据
        console.log("===submit ok===")
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  render() {
    console.log("==========3 Order Modal this.props==========", this.props)
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item }} layout="horizontal">
          <FormItem name='hotelname' rules={[{ required: true }]}
            label={t`酒店名`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='weddingdate' label={t`婚礼日期`} hasFeedback {...formItemLayout}>
          <Input />
          </FormItem>
          <FormItem name='weddingfloor' label={t`楼层`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='weddingtime' label={t`进场时间`} hasFeedback {...formItemLayout}>
          <Input />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

ScheduleModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ScheduleModal
