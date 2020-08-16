const objectDetection = ({result, destination, fileName}) => {
    if (result['predictions'].length){
        const postsElement = document.getElementById('insertedButton')
        document.getElementById('insertedImage').innerHTML = `<img src="uploads/${fileName}" width="500px">`
        postsElement.innerHTML = `
        ${
            result['predictions'][0]['detection_names'].map((detectionObject, index) => {
                result['predictions'][0]['detection_boxes'][index]
                return `
                <button class   = 'objectTag'
                        onclick = "imageResizing(event)" 
                        name    = "detection_boxes"
                        data-file_path=${destination+fileName}
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
        
}
