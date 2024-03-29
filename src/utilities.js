export const drawRect = (detections, ctx) =>{
    detections.forEach(prediction=>{

        //go to prediction result
        const [x,y,width,height] = prediction['bbox'];
        const text = prediction['class'];

        //set style
        const color = 'green'
        ctx.strokeStyle = color
        ctx.font = '18px Arial'
        ctx.fillStyle = color
        ctx.width = 5
        //Draw rectangles  and text
        ctx.beginPath()
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()
    })
}