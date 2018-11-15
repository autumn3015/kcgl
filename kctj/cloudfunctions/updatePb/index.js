'use strict';

const cloud = require('wx-server-sdk')
// 默认配置
cloud.init()
// 或者传入自定义配置
// cloud.init({
//   env: 'some-env-id'
// })
const db = cloud.database()


exports.main = async (event, context) => {

  return db.collection('pb').doc(event.id).update({
    data: {
      count: event.count
    },
  })
}

