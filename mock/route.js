import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘'
    },
    'pt-br': {
      name: 'Dashboard'
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: '婚礼酒店',
    zh: {
      name: '婚礼酒店'
    },
    'pt-br': {
      name: 'Usuário'
    },
    icon: 'home',
    route: '/user',
  },
  {
    id: '7',
    breadcrumbParentId: '1',
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
    id: '8',
    breadcrumbParentId: '1',
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
    id: '9',
    breadcrumbParentId: '1',
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
    id: '10',
    breadcrumbParentId: '1',
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
    id: '11',
    breadcrumbParentId: '1',
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
    id: '12',
    breadcrumbParentId: '1',
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
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/user/:id',
  },
  {
    id: '3',
    breadcrumbParentId: '1',
    name: '婚车',
    zh: {
      name: 'Request'
    },
    'pt-br': {
      name: 'Requisição'
    },
    icon: 'car',
    route: '/request',
  },
  {
    id: '4',
    breadcrumbParentId: '1',
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
    id: '45',
    breadcrumbParentId: '4',
    menuParentId: '4',
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
    breadcrumbParentId: '1',
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
