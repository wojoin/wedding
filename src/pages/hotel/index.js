import React, { PureComponent } from 'react'
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
import moment from 'moment'

@connect(({ hotel, loading }) => ({ hotel, loading }))
class Hotel extends PureComponent {
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
    const { dispatch, hotel } = this.props
    const { list, pagination, selectedRowKeys } = hotel

    dispatch({
      type: 'hotel/multiDelete',
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

  get modalProps() {
    console.log("===4. Hotel modalProps() this.props===", this.props)
    const { dispatch, hotel, loading } = this.props
    const { currentItem, modalVisible, modalType } = hotel

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`hotel/${modalType}`],
      title: `${
        modalType === 'create' ? t`增加酒店` : t`更新酒店信息`
      }`,
      centered: true,
      onOk: data => {
        console.log("============hotel data=======", data)
        dispatch({
          type: `hotel/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'hotel/hideModal',
        })
      },
    }
  }

  get listProps() {
    console.log("===3. Hotel listProps() this.props===", this.props)
    const { dispatch, hotel, loading } = this.props
    const { list, pagination, selectedRowKeys } = hotel

    return {
      dataSource: list,
      loading: loading.effects['hotel/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'hotel/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        console.log("===edit item 1===", item)
        dispatch({
          type: 'hotel/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'hotel/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    // TODO why dispatch
    console.log("===2. Hotel filterProps() this.props===", this.props)
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
          type: 'hotel/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { hotel } = this.props
    const { selectedRowKeys } = hotel
    console.log("===1. Hotel render() this.props===", this.props)

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
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Hotel.propTypes = {
  hotel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Hotel
