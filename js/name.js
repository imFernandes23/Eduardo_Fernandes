const canvasName = document.getElementById('paper-background');
const ctx = canvasName.getContext('2d');

ctx.fillStyle = 'white'
ctx.font = 'italic bold 25px serif' ;
ctx.fillText("Hello, I'm", 0, 20)
ctx.font = 'italic bold 25px serif';
ctx.fillText('Eduardo', 5 ,40)
ctx.strokeStyle = 'white'
ctx.strokeRect(0,0, 122, 42)
const textCoordinates = ctx.getImageData(0,0, 122, 40);

var nameData = []

for( let y = 0, y2 = textCoordinates.height; y < y2; y++){
    
    let nameDataLine = []

    for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
        if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let pos = {
                x: x,
                y: y,
            }
            nameDataLine.push(pos)
        }
    }
    nameData.push(nameDataLine)

}

ctx.clearRect(0, 0, canvasName.width, canvasName.height)
