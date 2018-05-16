import axios from 'axios'

export default function fetch(obj) {
  let { url, method, params } = obj
  return new Promise(function(resolve, reject) {
    switch (method) {
      case 'get':
        axios.get(url, {
          params: params
        })
        .then(function (response) {
          // console.log(response)
          resolve(response)
        })
        .catch(function (error) {
          alert(error)
          reject(error)
        })
        break
      case 'post':
        axios({
          method: 'post',
          url: url,
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
          alert(error)
          reject(error)
        })
        break
      default:
        console.log('怎么可能到这里来')
    }
  });
}
