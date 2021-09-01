export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'PATCH /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  // hotel
  queryHotelInfo: '/hotel',
  queryHotelList: '/hotels',
  queryHotel: '/hotel/:id',
  createHotel: 'POST /hotel',
  updateHotel: 'PATCH /hotel/:id',


  queryPostList: '/posts',

  queryPostList1: '/wedding-plan',
  queryPostList2: '/wedding-video',
  queryPostList3: '/wedding-photo',
  queryPostList4: '/wedding-album',
  queryPostList5: '/wedding-car',

  // queryDashboard: '/dashboard',
}
