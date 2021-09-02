import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'

@connect(({ hotelDetail }) => ({ hotelDetail }))
class HotelDetail extends PureComponent {

  dataMap = {
    name: ""
  };

  render() {
    console.log("===hotelDetail this.props===", this.props)
    const { hotelDetail } = this.props
    const { data } = hotelDetail
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

HotelDetail.propTypes = {
  hotelDetail: PropTypes.object,
}

export default HotelDetail
