import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'

@connect(({ orderDetail }) => ({ orderDetail }))
class OrderDetail extends PureComponent {
  render() {
    const { orderDetail } = this.props
    const { data } = orderDetail
    const content = []
    for (let key in data) {
      if(key == "id" || key == "statusCode" || key == "avatar")
        continue
      if ({}.hasOwnProperty.call(data, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
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
