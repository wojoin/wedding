import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'
import { Rate } from 'antd';

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
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

  render() {
    const { onDeleteItem, onEditItem, datasource, ...tableProps } = this.props

    // console.log("==========Hotel List datasource===============", this.props.dataSource)
    console.log("==========2 Hotel List this.props===============", this.props)

    const columns = [
      {
        title: <Trans><strong>图像</strong></Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        width: '5%',
        render: text => <Avatar src={text} />,
      },
      {
        title: <Trans><strong>名称</strong></Trans>,
        dataIndex: 'name',
        key: 'name',
        // width: '12%',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans><strong>星级</strong></Trans>,
        dataIndex: 'level',
        key: 'level',
        // width: '15%',
        render: (text, record) => <Rate disabled value={record.level} />,
      },
      {
        title: <Trans><strong>联系电话</strong></Trans>,
        dataIndex: 'phone',
        key: 'phone',
        // width: '10%',
      },
      {
        title: <Trans><strong>优惠(%)</strong></Trans>,
        dataIndex: 'discount',
        key: 'discount',
        // width: '7%',
      },
      {
        title: <Trans><strong>地址</strong></Trans>,
        dataIndex: 'address',
        key: 'address',
        width: '20%',
      },
      {
        title: <Trans><strong>操作</strong></Trans>,
        key: 'operation',
        // width: '8%',
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
      {
        title: <Trans><strong>创建时间</strong></Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
        // width: '12%',
      },
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
