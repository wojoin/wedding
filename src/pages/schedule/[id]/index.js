import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'

@connect(({ scheduleDetail }) => ({ scheduleDetail }))
class ScheduleDetail extends PureComponent {
  render() {
    const { scheduleDetail } = this.props
    const { data } = scheduleDetail

    console.log("===schedule detail===", data)
    const content = []
    for (let key in data) {
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

ScheduleDetail.propTypes = {
  scheduleDetail: PropTypes.object,
}

export default ScheduleDetail
