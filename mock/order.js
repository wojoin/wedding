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

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}

const userPermission = {
  DEFAULT: {
    visit: ['2', '21'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
    avatar: randomAvatar(),
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
    avatar: randomAvatar(),
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
    avatar: randomAvatar(),
  },
]

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

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {
  // 两个基础接口 login and logout
  [`POST ${ApiPrefix}/user/login`](req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter(item => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie(
        'token',
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true,
        }
      )
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).end()
    }
  },

  [`GET ${ApiPrefix}/user/logout`](req, res) {
    res.clearCookie('token')
    res.status(200).end()
  },


  [`GET ${ApiPrefix}/user`](req, res) {
    console.log("==============GET user============")
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    let user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.find(_ => _.id === token.id)
      if (userItem) {
        const { password, ...other } = userItem
        user = other
      }
    }
    response.user = user
    res.json(response)
  },

  [`GET ${ApiPrefix}/orders`](req, res) {
    console.log("==============GET orders============")
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            )
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${ApiPrefix}/orders/delete`](req, res) {
    const { ids=[] } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },

  [`POST ${ApiPrefix}/order`](req, res) {
    const newData = req.body
    console.log("===============POST order data============", newData)
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')

    const weddingDate = moment(newData.weddingdate).format('YYYY-MM-DD').toString();

    // scheduleData.hasOwnProperty(weddingDate)
    if(weddingDate in scheduleData) {
      scheduleData[weddingDate].push(newData)
    } else {
      const arr = [];
      arr.push(newData)
      scheduleData[weddingDate] = arr;
    }

    console.log("===============scheduleData============", scheduleData)

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${ApiPrefix}/order/:id`](req, res) {
    console.log("==============GET order by id============", req.params)
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  [`DELETE ${ApiPrefix}/order/:id`](req, res) {
    console.log("==============DELETE order by id============")
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  [`PATCH ${ApiPrefix}/order/:id`](req, res) {
    console.log("==============UPDATE order by id============")
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    console.log("=============更新订单信息===========", editItem)

    database = database.map(item => {
      if (item.id === id) {
        isExist = true

        // 如果名字改变的话, 更新图片
        if(item.name != editItem.name) {
          editItem.avatar =
          editItem.avatar ||
          Mock.Random.image(
            '100x100',
            Mock.Random.color(),
            '#757575',
            'png',
            editItem.name
          )
        }
        
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(200).json(NOTFOUND)
    }
  },
}
