// version 1
"use strict";
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");
const fs = require('fs');

const {convertFormatForUI} = require('./convertFormat')

const key = process.env.SUBSCRIPTION_KEY;
const endpoint = `${process.env.ENDPOINT}/`;

const textAnalyticsClient = new TextAnalyticsClient(
  endpoint,
  new AzureKeyCredential(key)
);

async function sentimentAnalysis(client, sentimentInput) {
  return await client.analyzeSentiment(sentimentInput);
}

// const input = [
//     "I am sad. I am happy.",
//     "I am sad.",
//     "I am happy.",
//     "happy",
//   ];

// sentimentAnalysis(textAnalyticsClient, input);


function callNaturalLangApi(input) {
  return sentimentAnalysis(textAnalyticsClient, input);
}

// 추가(index.js)
function process_sentimentAnalysis(data, res) {
  return new Promise((resolve, reject) => {
    const sentiment_input = data.map(el => el.translatedText || el.text); // sentiment_input = [문장1, 문장2, ...]
    const promise = callNaturalLangApi(sentiment_input);
    promise.then(api_result => {
      const only_sentiment = api_result.map(el => el.sentiment); // [ 'positive', 'negative' ]

      // 기존의 게시글 id 문장 번호와 합치기
      const result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({...data[i], sentiment: only_sentiment[i]});
      }
      // res.json(result);
      console.log('감정 분석 처리 완료');

      // 파일로 저장
      const saved = convertFormatForUI([...result]);
      const jsonArray = JSON.stringify(saved, undefined, 4);
      fs.writeFile("./public/sentiment.json", jsonArray, function (err) {
        if (err) {
          console.log(err);
        }
      });

      resolve(result);
    }).catch(e => {
      throw new Error('감정 분석 api 호출 간 문제가 발생했습니다.')
    });

    // const result = data2.map(el=>el.sentiment); // [ 'positive', 'negative' ]
  });
}

/*
  // 번역
  [
    {"postId":"1","contentId":"0","text":"제목 입니다.","translatedText":"It's the title."},
    {"postId":"1","contentId":"1","text":"안녕하세요.","translatedText":"Hello"},
    {"postId":"1","contentId":"2","text":"첫번째 글 입니다.","translatedText":"Here's the first one."},
    {"postId":"1","contentId":"3","text":"잘 부탁드립니다.","translatedText":"Nice to meet you."},
    {"postId":"2","contentId":"0","text":"이것도 제목이에요","translatedText":"This is also a title."},
    {"postId":"2","contentId":"1","text":"반갑습니다.","translatedText":"Nice to meet you."},
    {"postId":"2","contentId":"2","text":"두번째 글 입니다.","translatedText":"Here's the second one."},
    {"postId":"2","contentId":"3","text":"안녕히 계세요.","translatedText":"Goodbye."}
  ]
*/

module.exports = process_sentimentAnalysis
