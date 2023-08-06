video = "";
objects = [];
function preload()
{
    video = createVideo(video.mp4);
    video.hide();
}
function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw()
{
    image(video,0,0,480,380);
    if(status != true)
    {
        for(i = 0;i <= objects.length; i++)
        {
            percent = floor(objects[i].confidence * 100);
            Text(objects[i].label + "" + percent + "%" + objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


            if(objects[i].label == object_name)
            {
                videowebcamLiveView.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + "Found";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utterThis);

            }
        }
    }

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = 'status : Detecting objects';
    input = document.getElementById("input").value; 
    
}
function modelLoaded()
{
    console.log(modelLoaded);
    status = true;
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}