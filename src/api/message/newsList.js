import fetch from '@/utils/fetch'

/**
 * 获取所有资讯
 * @export GetNewsList
 * @param {any} param 
 * num	int	需获取数据的条数
 * NewsClassID	char(32)	分类id
 */
export function GetNewsList(param) {
  const params = Object.assign({}, {
    todo: 'News',
    type: 'GetListMore',
  }, param)

  return fetch({
    url:'/Handler/Handler.ashx',
    method: 'get',
    params
  })
}
