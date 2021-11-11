import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, DatePicker, Select } from 'antd'
import city from 'utils/city'
import { t } from "@lingui/macro"
// import Rater from "../../../utils/Rater.js"
import locale from 'antd/es/date-picker/locale/zh_CN';

import TieyiImage from './Tieyi'
import TtaiImage from './Ttai'
import BumanImage from './Buman'
import CarpetImage from './Carpet'
import VesselImage from './Vessel'

const { Option } = Select;
const FormItem = Form.Item

const weddinghotel1 = "香格里拉";
const weddinghotel2 = "绿地洲际酒店";
const weddinghotel3 = "金陵饭店";
const weddinghotel4 = "古南都饭店";
const weddinghotel5 = "南京世茂滨江希尔顿酒店";
const weddinghotel6 = "玄武饭店";


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class OrderModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
        
        // console.log("===order data===", data)
        
        if(!data.longmenjia) {
          data.hengjia = 0.8
        }

        if(!data.longmenjia) {
          data.longmenjia = 60
        }
        if(!data.ttaitool) {
          data.ttaitool = 2
        }
        
        if(!data.tieyi) {
          data.tieyi = 1
        }
        if(!data.buman) {
          data.buman = 1
        }

        if(!data.vessel) {
          data.vessel = 1
        }

        if(!data.chairknot) {
          data.chairknot = 60
        }
        if(!data.carpet) {
          data.carpet = 2
        }

        if(!data.palight) {
          data.palight = 20
        }
        if(!data.led) {
          data.led = 60
        }
        if(!data.audio) {
          data.audio = 5
        }

        // 提交对话框的数据
        console.log("===submit ok===")
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  onChange = (value) => {
    console.log("==========wedding order change========", value)
  }

  render() {
    console.log("===4.1 Order Modal this.props==========", this.props)
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item }} layout="horizontal">
          <Form.Item name='hotelname' label={t`酒店名`} rules={[{ required: true }]} hasFeedback {...formItemLayout}>
            <Select placeholder="请选择酒店" onChange={this.onChange}>
              <Option value={weddinghotel1}>{weddinghotel1}</Option>
              <Option value={weddinghotel2}>{weddinghotel2}</Option>
              <Option value={weddinghotel3}>{weddinghotel3}</Option>
              <Option value={weddinghotel4}>{weddinghotel4}</Option>
              <Option value={weddinghotel5}>{weddinghotel5}</Option>
              <Option value={weddinghotel6}>{weddinghotel6}</Option>
            </Select>
          </Form.Item>

          <Form.Item name="weddingdate" label={t`婚期`} rules={[{ required: true, message: '请选择婚期', }]} hasFeedback {...formItemLayout}>
            <DatePicker locale={locale} format='YYYY-MM-DD' style={{ width: '100%' }}/>
          </Form.Item>
          
          <FormItem name='hengjia' rules={[{ required: true }]}
            label={t`桁架`} hasFeedback {...formItemLayout}>
            <Select placeholder="桁架" onChange={this.onChange}>
              <Option value="1">2米</Option>
              <Option value="2">1米</Option>
              <Option value="3">0.8米</Option>
              <Option value="4">0.5米</Option>
              <Option value="5">0.2米</Option>
            </Select>
          </FormItem>
          <FormItem name='longmenjia' label={t`龙门架`} hasFeedback {...formItemLayout}>
            <InputNumber min={50} max={70} style={{ width: 275 }}  />
          </FormItem>
          <FormItem name='ttai' label={t`T台`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='ttaitool' label={t`T台道具`} hasFeedback {...formItemLayout}>
            <Select placeholder="T台道具" onChange={this.onChange}>
              <Option value="1">T台1</Option>
              <Option value="2">T台2</Option>
              <Option value="3">T台3</Option>
              <Option value="4">T台4</Option>
            </Select>
            <TtaiImage />
          </FormItem>

          <FormItem name='tieyi' label={t`铁艺`} hasFeedback {...formItemLayout}>
            {/* <InputNumber min={1} max={10} style={{ width: 275 }} /> */}
            <Select placeholder="铁艺" onChange={this.onChange}>
              <Option value="1">铁艺1</Option>
              <Option value="2">铁艺2</Option>
              <Option value="3">铁艺3</Option>
              <Option value="4">铁艺4</Option>
              <Option value="5">铁艺5</Option>
              <Option value="6">铁艺6</Option>
              <Option value="7">铁艺7</Option>
              <Option value="8">铁艺8</Option>
              <Option value="9">铁艺9</Option>
              <Option value="10">铁艺10</Option>
            </Select>
            <TieyiImage />
          </FormItem>
          <FormItem name='buman' label={t`布幔`} hasFeedback {...formItemLayout}>
            {/* <InputNumber min={20} max={80} style={{ width: 275 }}  /> */}
            <Select placeholder="布幔" onChange={this.onChange}>
              <Option value="1">布幔1</Option>
              <Option value="2">布幔2</Option>
            </Select>
            <BumanImage />
          </FormItem>
          <FormItem name='vessel' label={t`主桌器皿`} hasFeedback {...formItemLayout}>
          <Select placeholder="主桌器皿" onChange={this.onChange}>
              <Option value="1">主桌器皿1</Option>
              <Option value="2">主桌器皿2</Option>
              <Option value="3">主桌器皿3</Option>
              <Option value="4">主桌器皿4</Option>
              <Option value="5">主桌器皿5</Option>
              <Option value="6">主桌器皿6</Option>
              <Option value="7">主桌器皿7</Option>
              <Option value="8">主桌器皿8</Option>
              <Option value="9">主桌器皿9</Option>
            </Select>
            <VesselImage />
          </FormItem>
          <FormItem name='chairknot' label={t`椅背结`} hasFeedback {...formItemLayout}>
            <InputNumber min={10} max={200} style={{ width: 275 }}  />
          </FormItem>
          <FormItem name='carpet' label={t`地毯`} hasFeedback {...formItemLayout}>
          <Select placeholder="地毯" onChange={this.onChange}>
              <Option value="1">地毯1</Option>
              <Option value="2">地毯2</Option>
            </Select>
            <CarpetImage />
          </FormItem>

          <FormItem name='palight' label={t`PA灯`} hasFeedback {...formItemLayout}>
            <InputNumber min={1} max={80} style={{ width: 275 }}  />
          </FormItem>
          <FormItem name='led' label={t`LED灯`} hasFeedback {...formItemLayout}>
            <InputNumber min={1} max={200} style={{ width: 275 }}  />
          </FormItem>
          <FormItem name='audio' label={t`音响`} hasFeedback {...formItemLayout}>
            <InputNumber min={1} max={20} style={{ width: 275 }} />
          </FormItem>

          {/* <FormItem name='address' rules={[{ required: true, }]}
            label={t`地址`} hasFeedback {...formItemLayout}>
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={t`Pick an address`}
            />
          </FormItem> */}
        </Form>
      </Modal>
    )
  }
}

OrderModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default OrderModal
