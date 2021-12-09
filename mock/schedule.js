import { Mock, Constant, randomAvatar } from './_utils'
import qs from 'qs'
import { Rate } from 'antd'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { ApiPrefix } = Constant

let scheduleData = {};

let ordersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      "hengjia|1": [
        "0.2",
        "0.5",
        "0.8",
        "1.0",
        "2.0"
      ],
      "longmenjia|50-70": 60,
      "ttai|1":[
        "S型",
        "直型",
        "圆型"
      ],
      ttaitool: 1,
      tieyi: 1,
      "buman|20-80": 20,
      "chairknot|10-200": 60,
      "carpet|1-10": 2,
      "palight|1-80": 20,
      "led|1-200": 60,
      "audio|1-20": 5,
      createTime: '@datetime',
      avatar() {
        return randomAvatar()
      },
    },
  ],
})

let database = ordersListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}


const queryMap = (key) => {
  let data = []
  
  if (key in scheduleData) {
    data = scheduleData[key]
  }
  return data
}

const NOTFOUND = {
    message: 'Not Found',
    documentation_url: 'http://localhost:8000/request',
}

module.exports = {
  // 两个基础接口 login and logout
//   [`POST ${ApiPrefix}/user/login`](req, res) {
//     const { username, password } = req.body
//     const user = adminUsers.filter(item => item.username === username)

//     if (user.length > 0 && user[0].password === password) {
//       const now = new Date()
//       now.setDate(now.getDate() + 1)
//       res.cookie(
//         'token',
//         JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
//         {
//           maxAge: 900000,
//           httpOnly: true,
//         }
//       )
//       res.json({ success: true, message: 'Ok' })
//     } else {
//       res.status(400).end()
//     }
//   },

//   [`GET ${ApiPrefix}/user/logout`](req, res) {
//     res.clearCookie('token')
//     res.status(200).end()
//   },


//   [`GET ${ApiPrefix}/user`](req, res) {
//     console.log("==============GET user============")
//     const cookie = req.headers.cookie || ''
//     const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
//     const response = {}
//     let user = {}
//     if (!cookies.token) {
//       res.status(200).send({ message: 'Not Login' })
//       return
//     }
//     const token = JSON.parse(cookies.token)
//     if (token) {
//       response.success = token.deadline > new Date().getTime()
//     }
//     if (response.success) {
//       const userItem = adminUsers.find(_ => _.id === token.id)
//       if (userItem) {
//         const { password, ...other } = userItem
//         user = other
//       }
//     }
//     response.user = user
//     res.json(response)
//   },

  [`GET ${ApiPrefix}/schedule/:date`](req, res) {
    console.log("==============GET schedule by date============", req.params)
    const { date } = req.params
    const data = queryMap(date)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(200).json(NOTFOUND)
    }
  },
}
