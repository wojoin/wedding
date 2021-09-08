import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Calendar, Badge } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { confirm } = Modal

class List extends PureComponent {
  state = { visible: true };

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

  onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <ul className="style.events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="style.notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  dayCellSelect = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD HH:mm:ss').toString()
    console.log(selectedDate)
    

    return (
      <Modal>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
    // return (
    //   <Modal {...this.modalProps} />
    // );
  }
  

  render() {
    const { onDeleteItem, onEditItem, datasource, onDateSelect, ...tableProps } = this.props

    // console.log("==========User List datasource===============", this.props.dataSource)
    console.log("==========2 Schedule List this.props===============", this.props)

    const columns = [
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
      },
      {
        title: <Trans><strong>铁艺</strong></Trans>,
        dataIndex: 'tieyi',
        key: 'tieyi',
        // width: '7%',
      },
      {
        title: <Trans><strong>布幔</strong></Trans>,
        dataIndex: 'buman',
        key: 'buman',
        // width: '7%',
      },
      {
        title: <Trans><strong>椅背结</strong></Trans>,
        dataIndex: 'chairknot',
        key: 'chairknot',
      },
      {
        title: <Trans><strong>地毯</strong></Trans>,
        dataIndex: 'carpet',
        key: 'carpet',
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
      
      <Calendar dateCellRender={this.dateCellRender} 
        monthCellRender={this.monthCellRender} 
        onPanelChange={this.onPanelChange}
        onSelect={onDateSelect}
      />
      /* <Table
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
      /> */
     
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
