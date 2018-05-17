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
        console.log('formData', params)
        axios({
          method: 'post',
          url: url,
          data: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'   // 头信息改成from-data
          }
        })
        .then(function (response) {
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
