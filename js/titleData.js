function titleData(){
    const canvasName = document.getElementById('name-bg');
    const ctx = canvasName.getContext('2d', {willReadFrequently: true});
    const fullData = []

    ctx.fillStyle = 'white'
    ctx.font = '25px bauhau93 ' ;
    ctx.fillText("Hello, I'm", 0, 20)
    ctx.font = 'bauhau93 25px';
    ctx.fillText('Eduardo', 5 ,40)
    // ctx.strokeStyle = 'white'
    // ctx.strokeRect(0,0, 122, 42)

    const textCoordinates1 = ctx.getImageData(0,0, 106, 40);
    
    let title1 = extractData(textCoordinates1)

    fullData.push(title1)

    ctx.clearRect(0, 0, canvasName.width, canvasName.height)

    ctx.fillStyle = 'white'
    ctx.font = '27px bauhau93 ' ;
    ctx.fillText("Skills", 0, 20)
    // ctx.strokeStyle = 'white'
    // ctx.strokeRect(0,0, 56, 22)

    const textCoordinates2 = ctx.getImageData(0,0, 60, 22);
    
    let title2 = extractData(textCoordinates2)

    fullData.push(title2)

    ctx.clearRect(0, 0, canvasName.width, canvasName.height)

    ctx.fillStyle = 'white'
    ctx.font = '27px bauhau93 ' ;
    ctx.fillText("Works", 0, 20)
    // ctx.strokeStyle = 'white'
    // ctx.strokeRect(0,0, 66, 22)

    const textCoordinates3 = ctx.getImageData(0,0, 72, 22);
    
    let title3 = extractData(textCoordinates3)

    fullData.push(title3)

    ctx.clearRect(0, 0, canvasName.width, canvasName.height)

    ctx.fillStyle = 'white'
    ctx.font = '27px bauhau93 ' ;
    ctx.fillText("About", 0, 20)
    // ctx.strokeStyle = 'white'
    // ctx.strokeRect(0,0, 66, 22)

    const textCoordinates4 = ctx.getImageData(0,0, 72, 22);
    
    let title4 = extractData(textCoordinates4)

    ctx.clearRect(0, 0, canvasName.width, canvasName.height)

    fullData.push(title4)


    return fullData
}


function extractData(textCoordinates){
    var nameData = []
    var value = 0

    for( let y = 0, y2 = textCoordinates.height; y < y2; y++){
        
        let nameDataLine = []

        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                    let pos = {
                    x: x,
                    y: y,
                }
                nameDataLine.push(pos)
                value++
            }
        }
        nameData.push(nameDataLine)

    }

    return {nameData,value}
}