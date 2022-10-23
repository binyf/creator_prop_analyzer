const { hslToRgb } = require('@mui/material');
const _ = require('lodash')


const sumValues = (obj) => Object.values(obj).reduce((a,b) => a+b,0);

const data_process = (data) =>  {
    let n = data['comment_num'];
    let properties = data['totalsum'];
    let top_3 = data['top_3'];
    let hatespeech = _.cloneDeep(properties)
    let clean = properties['clean'];
    let badwords = properties['악플/욕설'];
    let sum = sumValues(properties);
    delete hatespeech['clean'];
    delete hatespeech['악플/욕설']
    hatespeech = sumValues(hatespeech);
    let bar_data =  [
        {
          "비율": "비율",
          "clean": (clean / sum)*100,
          "cleanColor": "hsl(129, 70%, 40%)",
          "일반 악성 댓글": (badwords / sum)*100,
          "일반 악성 댓글Color": "hsl(41, 80%, 50%)",
          "혐오표현": (hatespeech/sum)*100,
          "혐오표현Color": "hsl(2, 75%, 50%)",
        }
      ]
    let radar_data = [
        {
            "혐오분류": "남성",
            "비율(%)": properties["남성"]/sum*100,
        },
        {
            "혐오분류" : "성소수자",
            "비율(%)" : properties["성소수자"]/sum*100,
        },
        {
            "혐오분류" : "여성/가족",
            "비율(%)" : properties["여성/가족"]/sum*100,
        },
        {
            "혐오분류" : "연령",
            "비율(%)" : properties["연령"]/sum*100,
        },
        {
            "혐오분류" : "인종/국적",
            "비율(%)" : properties["인종/국적"]/sum*100,
        },
        {
            "혐오분류" : "종교",
            "비율(%)" : properties["종교"]/sum*100,
        },
        {
            "혐오분류" : "지역",
            "비율(%)" : properties["지역"]/sum*100,
        },
        {
            "혐오분류" : "기타 혐오",
            "비율(%)" : properties["기타 혐오"]/sum*100,
        },
    ]
    let pie_data = [
        {
            "id" : "male",
            "label" : "남성",
            "value" : properties["남성"]/hatespeech*100,
            "color" : "hsl(244,70%,50%)"
        },
        {
            "id" : "female",
            "label" : "여성/가족",
            "value" : properties["여성/가족"]/hatespeech*100,
            "color" : "hsl(14,70%,50%)"
        },
        {
            "id" : "lgbtq",
            "label" : "성소수자",
            "value" : properties["성소수자"]/hatespeech*100,
            "color" : "hsl(283,70%,50%)"
        },
        {
            "id" : "age",
            "label" : "연령",
            "value" : properties["연령"]/hatespeech*100,
            "color" : "hsl(157,70%,50%)"
        },
        {
            "id" : "race",
            "label" : "인종/국적",
            "value" : properties["인종/국적"]/hatespeech*100,
            "color" : "hsl(59,70%,50%)"
        },
        {
            "id" : "religion",
            "label" : "종교",
            "value" : properties["종교"]/hatespeech*100,
            "color" : "hsl(0,40%,50%)"
        },
        {
            "id" : "region",
            "label" : "지역",
            "value" : properties["지역"]/hatespeech*100,
            "color" : "hsl(60,70%,50%)"
        },
        {
            "id" : "etc",
            "label" : "기타 혐오",
            "value" : properties["기타 혐오"]/hatespeech*100,
            "color" : "hsl(60,1%,50%)"
        },
    ]
    let top3_array = []
    for(let i=0;i<top_3.length;i++){
        top3_array.push(top_3[i])
    }
    // top3_array = new Array(top3_array)

    return [bar_data, radar_data, pie_data,top3_array];
}

export {data_process};