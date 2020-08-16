const size = 500;
const objectDetection = ({result, destination, fileName}) => {
    console.log('object')
    if (result['predictions'].length){
        const postsElement = document.getElementById('insertedButton')
        document.getElementById('insertedImage').innerHTML = `<canvas id = 'canvas' width="500px" height="500px"></canvas>`
        const img = new Image();
        img.width = `${size}px`
        img.onload = () => {
            const ctx = document.getElementById('canvas').getContext('2d')
            ctx.drawImage(img, 0, 0, size, size)
            result['predictions'][0]['detection_boxes'].forEach((points,index) => {
                const [x1,y1,x2,y2] = points;
                ctx.strokeRect(x1*size,y1*size,(x2-x1)*size,(y2-y1)*size)
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.strokeStyle = 'black';
                ctx.fill();
                ctx.stroke();
                ctx.strokeText(result['predictions'][0]['detection_names'][index],x1 * size, y1 * 480)
                ctx.fillText(  result['predictions'][0]['detection_names'][index],x1 * size, y1 * 480);
                ctx.lineWidth = 3
            });
        }
        img.src = `uploads/${fileName}`;
        // document.getElementById('insertedImage').innerHTML = `<img src="uploads/${fileName}" width="500px">`
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
