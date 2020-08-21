const fs = require('fs')
const axios = require('axios')
const FormData =  require('form-data')
const dotenv = require('dotenv').config()

const url =  "https://naveropenapi.apigw.ntruss.com/vision-obj/v1/detect";

function callObjectDetectionApi(path) {
  let temp = path.split('.')
  path = `${__dirname}/${path}`
  let formData = new FormData()
  formData.append('image', fs.readFileSync(path), {
    filepath: path,
    contentType: `image/${temp[temp.length - 1]}`
  })
  let options = {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOUD_API_ID,
      'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOUD_API_KEY,
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