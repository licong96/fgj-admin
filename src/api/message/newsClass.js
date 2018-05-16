import fetch from '@/utils/fetch'

// 添加分类
export function AddClass(param) {
  const params = Object.assign({}, {
    todo: 'News_Class',
    type: 'AddClass',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}

// 修改分类
export function UpClass(param) {
  const params = Object.assign({}, {
    todo: 'News_Class',
    type: 'UpClass',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}
