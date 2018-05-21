import fetch from '@/utils/fetch'

// 获取所有分类
export function classifyGetListMore(param) {
  const params = Object.assign({}, {
    todo: 'News_Class',
    type: 'GetListMore',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}

// 新增资讯
export function AddNews(param) {
  const params = Object.assign({}, {
    todo: 'News',
    type: 'AddNews',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'post',
    params
  })
}
// 修改资讯
// 比新增多一个 NewsID
export function UpNews(param) {
  const params = Object.assign({}, {
    todo: 'News',
    type: 'UpNews',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'post',
    params
  })
}
// 根据ID获取资讯详细数据
export function GetModel(param) {
  const params = Object.assign({}, {
    todo: 'News',
    type: 'GetModel',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}
