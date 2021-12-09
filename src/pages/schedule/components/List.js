import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Calendar, Badge } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'

import axios from 'axios'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const weddinghotel1 = "香格里拉";
const weddinghotel2 = "绿地洲际酒店";
const weddinghotel3 = "金陵饭店";
const weddinghotel4 = "古南都饭店";
const weddinghotel5 = "南京世茂滨江希尔顿酒店";
const weddinghotel6 = "玄武饭店";

function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
      case 1: 
          return parseInt(Math.random()*minNum+1,10); 
      break; 
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default: 
              return 0; 
          break; 
  } 
} 

let hotelMap = {
  1: weddinghotel1,
  2: weddinghotel2,
  3: weddinghotel3,
  4: weddinghotel4,
  5: weddinghotel5,
  6: weddinghotel6
}

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
    const selectedDate = moment(value).format('MM/DD').toString()
    // const selectedDate = moment(value).format('YYYY-MM-DD').toString()
    let hotelIndex;
    let hotelIndex2;
    let hotelIndex3;
    let hotelValue;
    let hotelValue2;
    let hotelValue3;

    let listData = [];
    switch (value.date()) {
      case 8:
        hotelIndex = 2
        hotelIndex2 = 3
        // hotelIndex = randomNum(1, 6);
        // hotelIndex2 = randomNum(1, 6);
        hotelValue = hotelMap[hotelIndex];
        hotelValue2 = hotelMap[hotelIndex2];
        listData = [
          { type: 'success', content: selectedDate + ' ' + hotelValue },
          { type: 'warning', content: selectedDate + ' ' + hotelValue2 },
        ];
        console.log("=====8=======", listData)
        break;
      case 10:
        hotelIndex = 3
        hotelIndex2 = 5
        hotelIndex3 = 6
        // hotelIndex = randomNum(1, 6);
        // hotelIndex2 = randomNum(1, 6);
        // hotelIndex3 = randomNum(1, 6);
        hotelValue = hotelMap[hotelIndex];
        hotelValue2 = hotelMap[hotelIndex2];
        hotelValue3 = hotelMap[hotelIndex3];

        listData = [
          { type: 'success', content: selectedDate + ' ' + hotelValue },
          { type: 'warning', content: selectedDate + ' ' + hotelValue2 },
          { type: 'error', content: selectedDate + ' ' + hotelValue3 },
        ];
        console.log("=====10=======", listData)
        break;
      case 15:
        hotelIndex = 1
        hotelIndex2 = 3
        hotelIndex3 = 6
        // hotelIndex = randomNum(1, 6);
        // hotelIndex2 = randomNum(1, 6);
        // hotelIndex3 = randomNum(1, 6);
        hotelValue = hotelMap[hotelIndex];
        hotelValue2 = hotelMap[hotelIndex2];
        hotelValue3 = hotelMap[hotelIndex3];

        listData = [
          { type: 'success', content: selectedDate + ' ' + hotelValue },
          { type: 'warning', content: selectedDate + ' ' + hotelValue2 },
          { type: 'error', content: selectedDate + ' ' + hotelValue3 },
        ];
        console.log("=====15=======", listData)
        break;
      case 17:
        hotelIndex = 3
        // hotelIndex = randomNum(1, 6);
        hotelValue = hotelMap[hotelIndex];
        listData = [
          { type: 'success', content: selectedDate + ' ' + hotelValue },
        ];
        console.log("=====17=======", listData)
        break;
      // default:
    }
    return listData || [];
  }
  
  dateCellRender = (value) => {
    const selectedDate = moment(value).format('YYYY-MM-DD').toString()
    
    // axios.get('http://localhost:7000/schedule/' + selectedDate).then(response => {
    //   console.log("===dateCellRender===", response.data)
    // }).catch(error => {
    //   console.log(error)
    // })

    const listData = this.getListData(value);
    return (
      <div className="styles.events">
        {listData.map(item => (
          <div key={item.content}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
      </div>
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
      <div className="styles.notes-month">
        <section>婚礼场次</section>
        <span>16</span>
      </div>
    ) : null;
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
