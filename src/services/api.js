export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryOrder: '/order/:id',
  queryOrderList: '/orders',
  createOrder: 'POST /order',
  updateOrder: 'PATCH /order/:id',
  removeOrder: 'DELETE /order/:id',
  removeOrderList: 'POST /orders/delete',

  // hotel
  queryHotelInfo: '/hotel',
  queryHotelList: '/hotels',
  queryHotel: '/hotel/:id',
  createHotel: 'POST /hotel',
  updateHotel: 'PATCH /hotel/:id',
  removeHotel: 'DELETE /hotel/:id',
  removeHotelList: 'POST /hotels/delete',

  // schedule
  querySchedule: '/schedule/:date',


  queryPostList: '/posts',

  queryPostList1: '/wedding-plan',
  queryPostList2: '/wedding-video',
  queryPostList3: '/wedding-photo',
  queryPostList4: '/wedding-album',
  queryPostList5: '/wedding-car',

  // queryDashboard: '/dashboard',
}
