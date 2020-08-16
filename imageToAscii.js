const jimp = require('jimp')
const asciify = require('asciify-image')
const Convert = require('ansi-to-html')
const convert = new Convert()

async function imageToAscii(path, position) {
    const image = await jimp.read(path)
    let w = image.bitmap.width
    let h = image.bitmap.height

    position = position.split(",").map( n => n*1)
    let x1 = position[0] * h
    let y1 = position[1] * w
    let x2 = position[2] * h
    let y2 = position[3] * w
    let tw = x2 - x1
    let th = y2 - y1

    image.crop(y1, x1, th, tw, err => {if(err) throw err}).write(path)

    let options = {
        fit: 'width',
        width: 24
    }

    let result = await asciify(path, options)
    return convert.toHtml(result)
}

module.exports = {imageToAscii}
