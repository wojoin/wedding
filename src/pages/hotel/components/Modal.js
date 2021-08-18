import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from 'utils/city'
import { t } from "@lingui/macro"
// import Rater from "../../../utils/Rater.js"
import { Rate } from 'antd';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class HotelModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
        
        if(!data.level) {
          data.level = 4
        }
        if(!data.discount) {
          data.discount = 90
        }

        data.address = data.address.join(' ')
        // 提交对话框的数据
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  render() {
    console.log("==========3 User Modal this.props==========", this.props)
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item, address: item.address && item.address.split(' ') }} layout="horizontal">
          <FormItem name='name' rules={[{ required: true }]}
            label={t`名称`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='level' label={t`星级`} hasFeedback {...formItemLayout}>
            <Rate defaultValue={4} />
          </FormItem>
          <FormItem name='phone' rules={[{ required: true, pattern: /^1[34578]\d{9}$/, message: t`The input is not valid phone!`, }]}
            label={t`联系电话`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          
          <FormItem name='discount' label={t`优惠`} hasFeedback {...formItemLayout}>
            <InputNumber min={50} max={100} style={{ width: 275 }} defaultValue="90" />
          </FormItem>

          <FormItem name='address' rules={[{ required: true, }]}
            label={t`地址`} hasFeedback {...formItemLayout}>
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={t`Pick an address`}
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

HotelModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default HotelModal
