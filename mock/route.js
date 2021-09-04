import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  // {
  //   id: '1',
  //   icon: 'dashboard',
  //   name: 'Dashboard',
  //   zh: {
  //     name: '仪表盘'
  //   },
  //   'pt-br': {
  //     name: 'Dashboard'
  //   },
  //   route: '/dashboard',
  // },
  {
    id: '2',
    breadcrumbParentId: '',
    name: '婚礼酒店',
    zh: {
      name: '婚礼酒店'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'home',
    route: '/hotel',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: '酒店详情',
    zh: {
      name: '酒店详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/hotel/:id',
  },
  {
    id: '3',
    breadcrumbParentId: '',
    name: '订单管理',
    zh: {
      name: '订单管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'home',
    route: '/order',
  },
  {
    id: '31',
    menuParentId: '-1',
    breadcrumbParentId: '3',
    name: '订单详情',
    zh: {
      name: '订单详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/order/:id',
  },

  {
    id: '6',
    breadcrumbParentId: '',
    name: '档期',
    zh: {
      name: '档期'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    icon: 'schedule',
    route: '/schedule',
  },
  {
    id: '8',
    breadcrumbParentId: '',
    name: '供应商管理',
    zh: {
      name: '供应商管理'
    },
    'pt-br': {
      name: '供应商管理'
    },
    icon: 'emcee',
  },
  {
    id: '11',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚礼司仪',
    zh: {
      name: '婚礼司仪'
    },
    'pt-br': {
      name: '婚礼司仪'
    },
    icon: 'emcee',
    route: '/post',
  },
  {
    id: '12',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '化妆师',
    zh: {
      name: '化妆师'
    },
    'pt-br': {
      name: '化妆师'
    },
    icon: 'dresser',
    route: '/wedding-plan',
  },
  {
    id: '13',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚纱摄影',
    zh: {
      name: '婚纱摄影'
    },
    'pt-br': {
      name: '婚纱摄影'
    },
    icon: 'video',
    route: '/wedding-video',
  },
  {
    id: '14',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚纱摄像',
    zh: {
      name: '婚纱摄像'
    },
    'pt-br': {
      name: '婚纱摄像'
    },
    icon: 'camera-o',
    route: '/wedding-photo',
  },
  {
    id: '15',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚纱照',
    zh: {
      name: '婚纱照'
    },
    'pt-br': {
      name: '婚纱照'
    },
    icon: 'wedding-album',
    route: '/wedding-album',
  },
  {
    id: '16',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚纱礼服',
    zh: {
      name: '婚纱礼服'
    },
    'pt-br': {
      name: '婚纱礼服'
    },
    icon: 'user',
    route: '/wedding-dress',
  },
  
  {
    id: '17',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚车租赁',
    zh: {
      name: '婚车租赁'
    },
    'pt-br': {
      name: 'Requisição'
    },
    icon: 'car',
    route: '/request',
  },
  {
    id: '4',
    // breadcrumbParentId: '2',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: '婚品商城',
    zh: {
      name: 'UI组件'
    },
    'pt-br': {
      name: 'Elementos UI'
    },
    icon: 'wedding-gift',
  },
  {
    id: '41',
    menuParentId: '4',
    breadcrumbParentId: '4',
    name: '酒',
    zh: {
      name: 'Editor'
    },
    'pt-br': {
      name: 'Editor'
    },
    icon: 'edit',
    route: '/editor',
  },
  {
    id: '5',
    menuParentId: '8',
    breadcrumbParentId: '8',
    name: 'Charts',
    zh: {
      name: 'Charts'
    },
    'pt-br': {
      name: 'Graficos'
    },
    icon: 'code-o',
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'ECharts',
    zh: {
      name: 'ECharts'
    },
    'pt-br': {
      name: 'ECharts'
    },
    icon: 'line-chart',
    route: '/chart/ECharts',
  },
  {
    id: '52',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'HighCharts',
    zh: {
      name: 'HighCharts'
    },
    'pt-br': {
      name: 'HighCharts'
    },
    icon: 'bar-chart',
    route: '/chart/highCharts',
  },
  {
    id: '53',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'Rechartst',
    zh: {
      name: 'Rechartst'
    },
    'pt-br': {
      name: 'Rechartst'
    },
    icon: 'area-chart',
    route: '/chart/Recharts',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
