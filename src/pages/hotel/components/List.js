import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Space } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    console.log("==========Hotel list this.props=============", this.props, record, e)
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  getWeddingDate = (date) => {
    const dateAndTime = date.split('T');
    return dateAndTime[0];
  };

  getWeddingTime = (date) => {
    const weddingTime = moment(date).format('YYYY-MM-DD HH:mm:ss').toString()
    return weddingTime;
  };

  render() {
    const { onDeleteItem, onEditItem, datasource, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans><strong>图像</strong></Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        // width: '6%',
        render: text => <Avatar src={text} />,
      },
      {
        title: <Trans><strong>酒店名</strong></Trans>,
        dataIndex: 'name',
        key: 'name',
        // width: '6%',
        render: (text, record) => <Link to={`hotel/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans><strong>婚期</strong></Trans>,
        dataIndex: 'weddingdate',
        key: 'weddingdate',
        render: (date) => {
          return (
            this.getWeddingDate(date)
          )}

        // render: (text, record) => {
        //   return (
        //     <Space size="middle">
        //       {/* {moment(record.weddingdate, 'YYYY-MM-DD').toDate()} */}
        //       {text}
        //     </Space>
        // )},
      },
      {
        title: <Trans><strong>桌数</strong></Trans>,
        dataIndex: 'weddingtables',
        key: 'weddingtables',
        // width: '6%',
      },
      {
        title: <Trans><strong>色系</strong></Trans>,
        dataIndex: 'weddingtheme',
        key: 'weddingtheme',
        // width: '8%',
      },
      {
        title: <Trans><strong>酒店层高</strong></Trans>,
        dataIndex: 'weddingfloor',
        key: 'weddingfloor',
        // width: '8%',
      },
      {
        title: <Trans><strong>进场时间</strong></Trans>,
        dataIndex: 'weddingtime',
        key: 'weddingtime',
        // width: '12%',
        render: (date) => {
          return (
            this.getWeddingTime(date)
        )},
      },
      {
        title: <Trans><strong>操作</strong></Trans>,
        key: 'operation',
        // width: '5%',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: t`Update` },
                { key: '2', name: t`Delete` },
              ]}
            />
          )
        },
      },
      // {
      //   title: <Trans><strong>创建时间</strong></Trans>,
      //   dataIndex: 'createTime',
      //   key: 'createTime',
      //   // width: '12%',
      // },
    ]

    return (
      <Table
        columns={columns}
        dataSource={datasource}
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
