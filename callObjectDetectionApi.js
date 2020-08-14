const fs = require('fs');
const axios = require('axios');
const FormData =  require('form-data');

const url =  "https://naveropenapi.apigw.ntruss.com/vision-obj/v1/detect";

function callObjectDetectionApi(name, extension) {
  let path = __dirname + `/public/image/${name}.${extension}`
  let formData = new FormData()
  formData.append('image', fs.readFileSync(path), {
    filepath: path,
    contentType: `image/${extension}`
  })
  let options = {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': 'o4tp8j5ggp',
      'X-NCP-APIGW-API-KEY': 'hb5knkp6JKPJNtnGLg6hLv88vmIV1Cs2ENqEqoXI',
      ...formData.getHeaders()
    }
  }
  return axios.post(url, formData, options) // .then(res => res.data)
}

module.exports = callObjectDetectionApi

/*
callObjectDetectionApi('Newyork-Stage-Destop', 'jpg')
.then(res => console.dir(res.data, { depth: null }))
.catch(err => console.error(err))
*/ 