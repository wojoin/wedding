import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, DatePicker, Radio,Select, Modal, Cascader } from 'antd'
import city from 'utils/city'
import { t } from "@lingui/macro"
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

// const Form.Item = Form.Item

const weeedingtheme1 = "裸粉色"
const weeedingtheme2 = "滨河蓝"
const weeedingtheme3 = "浅艾兰"
const weeedingtheme4 = "中国红"
const weeedingtheme5 = "欧若拉红"

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

// const dateFormat = 'YYYY-MM-DD';

class HotelModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {

    console.log("=====modal data before====")
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }

        console.log("=====modal data====", data)
        
        if(!data.weddingtables) {
          data.weddingtables = 10
        }
        if(!data.weddingfloor) {
          data.weddingfloor = 8
        }

        // data.weddingdate = moment(data.weddingdate, 'DD-MM-YYYY')
        // data.weddingtime = moment(data.weddingtime, 'DD-MM-YYYY HH:00:00')

        // data.weddingdate
        // data.weddingtime

        // 提交对话框的数据
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  onThemeChange = (value) => {
    // console.log("==========wedding change========", value)
      // switch (value) {
      //   case 'male':
      //     this.formRef.setFieldsValue({ note: 'Hi, man!' });
      //     return;
      //   case 'female':
      //     this.formRef.setFieldsValue({ note: 'Hi, lady!' });
      //     return;
      //   case 'other':
      //     this.formRef.setFieldsValue({ note: 'Hi there!' });
      // }

  }
  

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" layout="horizontal" initialValues={{ ...item}}>
          <Form.Item name='name' rules={[{ required: true }]}
            label={t`酒店名`} hasFeedback {...formItemLayout}>
            <Input />
          </Form.Item>
          <Form.Item name="weddingdate" label={t`婚期`} rules={[{ required: true, message: '请选择婚期', }]} hasFeedback {...formItemLayout}>
            <DatePicker locale={locale} format='YYYY-MM-DD' style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item name='weddingtables' label={t`桌数`} hasFeedback {...formItemLayout}>
            <InputNumber min={1} max={100} style={{ width: 275 }} />
          </Form.Item>

          <Form.Item name='weddingtheme' label={t`色系`} rules={[{ required: true }]} hasFeedback {...formItemLayout}>
            <Select placeholder="请选择色系" onChange={this.onThemeChange}>
              <Option value={weeedingtheme1}>{weeedingtheme1}</Option>
              <Option value={weeedingtheme2}>{weeedingtheme2}</Option>
              <Option value={weeedingtheme3}>{weeedingtheme3}</Option>
              <Option value={weeedingtheme4}>{weeedingtheme4}</Option>
              <Option value={weeedingtheme5}>{weeedingtheme5}</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name='weddingfloor' label={t`酒店层高`} hasFeedback {...formItemLayout}>
            <InputNumber min={1} max={80} style={{ width: 275 }} />
          </Form.Item>

          <Form.Item name='weddingtime' label={t`进场时间`} hasFeedback {...formItemLayout}>
            <DatePicker locale={locale} showTime format='YYYY-MM-DD HH:mm:ss' style={{ width: '100%' }}/>
          </Form.Item>
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
