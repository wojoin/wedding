import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'

import {vesselDict, tieyiDict, ttaiDict, bumanDict, carpetDict} from './Images'

const { confirm } = Modal



// let carpet = {1: }

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

    console.log("===3.1 Order List this.props==========", this.props, datasource)

    const columns = [
      // {
      //   title: <Trans><strong>图像</strong></Trans>,
      //   dataIndex: 'avatar',
      //   key: 'avatar',
      //   width: '5%',
      //   render: text => <Avatar src={text} />,
      // },
      {
        title: <Trans><strong>桁架(米)</strong></Trans>,
        dataIndex: 'hengjia',
        key: 'hengjia',
        // width: '12%',
        render: (text, record) => <Link to={`order/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans><strong>龙门架(米)</strong></Trans>,
        dataIndex: 'longmenjia',
        key: 'longmenjia',
        // width: '15%',
        // render: (text, record) => <Rate disabled value={record.level} />,
      },
      {
        title: <Trans><strong>T台</strong></Trans>,
        dataIndex: 'ttai',
        key: 'ttai',
        // width: '10%',
      },
      {
        title: <Trans><strong>T台道具</strong></Trans>,
        dataIndex: 'ttaitool',
        key: 'ttaitool',
        // width: '10%',
        render: text => <Avatar size={64} src={ttaiDict[text]} />
      },
      {
        title: <Trans><strong>铁艺</strong></Trans>,
        dataIndex: 'tieyi',
        key: 'tieyi',
        // width: '7%',
        render: text => <Avatar size={64} src={tieyiDict[text]} />
      },
      {
        title: <Trans><strong>布幔</strong></Trans>,
        dataIndex: 'buman',
        key: 'buman',
        // width: '7%',
        render: text => <Avatar size={64} src={bumanDict[text]} />
      },
      {
        title: <Trans><strong>主桌器皿</strong></Trans>,
        dataIndex: 'vessel',
        key: 'vessel',
        // width: '7%',
        render: text => <Avatar size={64} src={vesselDict[text]} />
      },
      {
        title: <Trans><strong>地毯</strong></Trans>,
        dataIndex: 'carpet',
        key: 'carpet',
        render: text => <Avatar size={64} src={carpetDict[text]} />
      },
      {
        title: <Trans><strong>椅背结</strong></Trans>,
        dataIndex: 'chairknot',
        key: 'chairknot',
      },
      {
        title: <Trans><strong>PA灯</strong></Trans>,
        dataIndex: 'palight',
        key: 'palight',
      },
      {
        title: <Trans><strong>LED灯</strong></Trans>,
        dataIndex: 'led',
        key: 'led',
      },
      {
        title: <Trans><strong>音响</strong></Trans>,
        dataIndex: 'audio',
        key: 'audio',
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
        title: <Trans><strong>下单时间</strong></Trans>,
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
