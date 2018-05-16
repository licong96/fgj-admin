import fetch from '@/utils/fetch'

// 用户登录验证
export function MobileLogin(param) {
  const params = Object.assign({}, {
    todo: 'User',
    type: 'MobileLogin',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}
