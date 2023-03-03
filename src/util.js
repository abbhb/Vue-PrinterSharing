

export function blobToImg (blob) {
    return new Promise((resolve, reject) => {
        console.log(reject)
        let reader = new FileReader()
        reader.addEventListener('load', () => {
            let img = new Image()
            img.src = reader.result
            img.addEventListener('load', () => resolve(img))
        })
        reader.readAsDataURL(blob)
    })
}

export function watermark (canvas, text) {
    return new Promise((resolve, reject) => {
        console.log(reject)
        let ctx = canvas.getContext('2d')
        // 设置填充字号和字体，样式
        ctx.font = "24px 宋体"
        ctx.fillStyle = "#FFC82C"
        // 设置右对齐
        ctx.textAlign = 'right'
        // 在指定位置绘制文字，这里指定距离右下角20坐标的地方
        ctx.fillText(text, canvas.width - 20, canvas.height - 20)
        canvas.toBlob(blob => resolve(blob))
    })
}

export function convertImageToCanvas(image) {
    // 创建canvas DOM元素，并设置其宽高和图片一样
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
}