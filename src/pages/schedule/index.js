import React, { PureComponent, Badge } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { t } from "@lingui/macro"
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

import axios from 'axios'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import api from 'api'

const { queryOrder } = api

@connect(({ schedule, loading }) => ({ schedule, loading }))
class Schedule extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleDeleteItems = () => {
    const { dispatch, schedule } = this.props
    const { list, pagination, selectedRowKeys } = schedule

    dispatch({
      type: 'schedule/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    }).then(() => {
      this.handleRefresh({
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
      })
    })
  }

  // modal对话框
  get modalProps() {
    const { dispatch, schedule, loading } = this.props
    const { currentItem, modalVisible, modalType } = schedule

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`schedule/${modalType}`],
      title: `${
        modalType === 'create' ? t`增加档期` : t`更新档期信息`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `schedule/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'schedule/hideModal',
        })
      },
    }
  }

  dayCellSelect = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD').toString()
    console.log("===in dayCellSelect===",selectedDate)
    
    const { dispatch, schedule, loading } = this.props
    const { currentItem, modalVisible, modalType } = schedule

    // axios.get('http://localhost:7000/schedule/' + selectedDate).then(response => {
    //   console.log("===dayCellSelect in schedule===", response.data)
    // }).catch(error => {
    //   console.log(error)
    // })
    

    return {
      item: modalType === 'query',
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`schedule/${modalType}`],
      title: `${
        modalType === 'query'
      }`,
      centered: true,
      onOk: selectedDate => {
        dispatch({
          type: `schedule/${modalType}`,
          payload: selectedDate,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'schedule/hideModal',
        })
      },
    }

    // dispatch({
    //   type: 'schedule/showModal',
    //   payload: {
    //     modalType: 'query',
    //   },
    // })
  }

  // List 用于展示table
  get listProps() {

    console.log("===page schedule listProps this.props===", this.props)
    // const { dispatch, schedule, loading } = this.props
    // const { list, pagination, selectedRowKeys } = schedule

    const { dispatch, schedule, loading } = this.props
    const { currentItem, modalVisible, modalType } = schedule

    return {
      // loading: loading.effects['schedule/query'],
      onDateSelect: date => {
        console.log("====schedule date select===", date)
        this.dayCellSelect(date)
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    // TODO why dispatch
    console.log("=====page schedule index filterProps(), why dispatch====", this.props)
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'schedule/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { schedule } = this.props
    const { selectedRowKeys } = schedule
    console.log("===page schedule render() this.props===", this.props)

    return (
      <Page inner>
        <Filter {...this.filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...this.listProps}/>
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Schedule.propTypes = {
  schedule: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Schedule
