import axios from 'axios'
import qs from 'qs'

export default function fetch(obj) {
  let { url, method, params } = obj
  return new Promise(function(resolve, reject) {
    if (method === 'get') {
      axios.get(url, {
        params: params
      })
      .then(function (response) {
        // console.log(response)
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    } 
    else if (method === 'post' && !Object.keys(params).length) {      // 这是fromData，用来上传图片的接口
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'   // 头信息改成from-data
        }
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    } 
    else if (method === 'post') {
      axios({
        method: 'post',
        url: url,
        // data: qs.stringify(params),
        data: params,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'   // 头信息改成from-data
        }
      })
      .then(function (response) {
        console.log(response)
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    }
  });
}
