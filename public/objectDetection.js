const result = {
    "predictions": [
        {
            "num_detections": 3,
            "detection_classes": [
                18.0,
                18.0,
                3.0
            ],
            "detection_names": [
                "dog",
                "dog",
                "car"
            ],
            "detection_scores": [
                0.998164,
                0.997666,
                0.622512
            ],
            "detection_boxes": [
                [
                    0.0565129,
                    0.376249,
                    0.960169,
                    0.979782
                ],
                [
                    0.0280469,
                    0.0325073,
                    0.867158,
                    0.314543
                ],
                [
                    0.0,
                    0.700688,
                    0.099921,
                    0.795676
                ]
            ]
        }
    ]
}

if (result['predictions'].length){
    console.log('hello')
    const postsElement = document.getElementById('insertedButton')
    console.log(result)
    console.log(result['predictions'][0]['detection_classes'])
    console.log(postsElement)
    postsElement.innerHTML = `${
        result['predictions'][0]['detection_names'].map((detectionObject, index) => {
            result['predictions'][0]['detection_boxes'][index]
            return `
            <button class   = 'objectTag'
                    onclick = "imageResizing(event)" 
                    data-detection_boxes=${result['predictions'][0]['detection_boxes'][index]}>
                    ${detectionObject}
            </button>
            `
        })    
    }
    `
}
else{
    alert(
        '객체가 없는데요?'
    )
}
