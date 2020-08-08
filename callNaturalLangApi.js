// const request = require('request')

// function callNaturalLangApi(content) {
//   return new Promise((resolve, reject) => {
//     request('https://jsonplaceholder.typicode.com/users/2', (error, response, body) => {
//       if (!!error) {
//         resolve(content)
//       }
//       if (response.statusCode === 200) {
//         resolve(content)
//       }
//     })
//   })
// }

// module.exports = callNaturalLangApi

// version 1
"use strict";
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const key = `${process.env.SENTIMENT_ID}`;
const endpoint = "https://relay13.cognitiveservices.azure.com/";

const textAnalyticsClient = new TextAnalyticsClient(
  endpoint,
  new AzureKeyCredential(key)
);

async function sentimentAnalysis(client, input) {
  const sentimentInput = input;
  const sentimentResult = await client.analyzeSentiment(sentimentInput);
  return sentimentResult;
}

// const input = [
//     "I am sad. I am happy.",
//     "I am sad.",
//     "I am happy.",
//     "happy",
//   ];

// sentimentAnalysis(textAnalyticsClient, input);


function callNaturalLangApi(input){
  return sentimentAnalysis(textAnalyticsClient, input);
}

module.exports = {callNaturalLangApi};