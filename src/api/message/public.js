import fetch from '@/utils/fetch'

/**
 * 获取所有分类
 * @export GetListMore
 * @param {any} param 
 * num	int	需获取数据的条数
 * ParentID	char(32)	父级分类id
 */
export function GetListMore(param) {
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
