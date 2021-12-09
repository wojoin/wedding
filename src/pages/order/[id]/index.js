import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'

import { Image } from 'antd';

import {vesselDict, tieyiDict, ttaiDict, bumanDict, carpetDict} from '../components/Images'

@connect(({ orderDetail }) => ({ orderDetail }))
class OrderDetail extends PureComponent {
  render() {
    const { orderDetail } = this.props
    const { data } = orderDetail
    const content = []
    for (let key in data) {
      if(key == "id" || key == "statusCode" || key == "avatar")
        continue
      
        
      // if(key == "tieyi")
      //   continue
      // if(key == "ttaitool")
      //   continue
      // if(key == "buman")
      //   continue
      // if(key == "carpet")
      //   continue

      if ({}.hasOwnProperty.call(data, key)) {
        if(key == "vessel") {
          const value = data[key]
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{<Image src={vesselDict[value]} /> }</div>
            </div>
          )
        } if(key == "tieyi") {
          const value = data[key]
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{<Image src={tieyiDict[value]} /> }</div>
            </div>
          )
        } if(key == "ttaitool") {
          const value = data[key]
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{<Image src={ttaiDict[value]} /> }</div>
            </div>
          )
        } if(key == "buman") {
          const value = data[key]
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{<Image src={bumanDict[value]} /> }</div>
            </div>
          )
        } if(key == "carpet") {
          const value = data[key]
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{<Image src={carpetDict[value]} /> }</div>
            </div>
          )
        } else {
          content.push(
            <div key={key} className={styles.item}>
              <div>{key}</div>
              <div>{String(data[key])}</div>
            </div>
          )
        }
        
      }
    }
    return (
      <Page inner>
        <div className={styles.content}>{content}</div>
      </Page>
    )
  }
}

OrderDetail.propTypes = {
  orderDetail: PropTypes.object,
}

export default OrderDetail
