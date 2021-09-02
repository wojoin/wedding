import { Mock, Constant, randomAvatar } from './_utils'
import qs from 'qs'
// import { Random } from 'antd'

const { ApiPrefix } = Constant

let hotelListData = Mock.mock({
  'data|8-10': [
    {
      id: '@id',
      "name|1":[
        "香格里拉",
        "绿地洲际酒店",
        "金陵饭店",
        "古南都饭店",
        "南京世茂滨江希尔顿酒店",
        "玄武饭店"
      ],
      'weddingdate': '@date',
      'weddingtables|1-100': 10,
      "weddingtheme|1": [
        "裸粉色",
        "滨河蓝",
        "浅艾兰",
        "中国红",
        "欧若拉红",
      ],
      'weddingfloor|1-80': 8,
      "weddingtime": Mock.Random.now('hour'),
      avatar() {
        return randomAvatar()
      },
    },
  ],
})

let database = hotelListData.data

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}

const userPermission = {
  DEFAULT: {
    visit: ['2', '21', '7', '5', '51', '52', '53'],
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
  // [`POST ${ApiPrefix}/user/login`](req, res) {
  //   const { username, password } = req.body
  //   const user = adminUsers.filter(item => item.username === username)

  //   if (user.length > 0 && user[0].password === password) {
  //     const now = new Date()
  //     now.setDate(now.getDate() + 1)

  //     // 登录成功后设置cookie
  //     res.cookie(
  //       'token',
  //       JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
  //       {
  //         maxAge: 900000,
  //         httpOnly: true,
  //       }
  //     )
  //     console.log("===user login success===")
  //     res.json({ success: true, message: 'Ok' })
  //   } else {
  //     res.status(400).end()
  //   }
  // },

  // [`GET ${ApiPrefix}/user/logout`](req, res) {
  //   res.clearCookie('token')
  //   res.status(200).end()
  // },

  [`GET ${ApiPrefix}/user`](req, res) {
    console.log("==============GET user============")
    const cookie = req.headers.cookie || ''
    // 登录成功后会设置cookie
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
    console.log("==============GET user response============", response)
    res.json(response)
  },

  [`GET ${ApiPrefix}/hotels`](req, res) {
    console.log("==============GET hotel============")
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    // console.log("==============GET wedding-hotel query============", query)

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
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

    console.log("==============GET hotel result return total============", newData.length)
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`POST ${ApiPrefix}/hotels/delete`](req, res) {
    const { ids=[] } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },

  [`POST ${ApiPrefix}/hotel`](req, res) {
    const newData = req.body
    console.log("===============POST hotel data============", newData)
    newData.createTime = Mock.mock('@now')
    newData.avatar =
      newData.avatar ||
      Mock.Random.image(
        '100x100',
        Mock.Random.color(),
        '#757575',
        'png',
        newData.name
      )
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${ApiPrefix}/hotel/:id`](req, res) {
    console.log("==============GET hotel by id============", req)
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  [`DELETE ${ApiPrefix}/hotel/:id`](req, res) {
    console.log("==============DELETE hotel by id============", req.params)
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  [`PATCH ${ApiPrefix}/hotel/:id`](req, res) {
    console.log("==============UPDATE hotel by id============")
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    console.log("=============更新酒店信息===========", editItem)

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
