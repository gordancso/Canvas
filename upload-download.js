
function triggerClick (){
    document.getElementById('file').click();
   
}

document.getElementById('file').addEventListener('change',function(e){
    clearCanvas(); 
    URL = URL || webkitURL;  /*added to amke it compatible for older browser*/
    var temp = URL.createObjectURL(e.target.files[0]);
    var image = new Image ();
    image.src = temp;

    image.addEventListener('load',function(){
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;       
        imageWidth = image.naturalWidth;
        imageHeight = image.naturalHeight;
        newImageWidth = imageWidth;
        newImageHeight = imageHeight;
        originalImageRatio = imageWidth / imageHeight;

        if(newImageWidth > newImageHeight && newImageHeight > 1280){
            newImageWidth = 1280;
            newImageHeight = 1280 /originalImageRatio;
        }

        if(newImageWidth > newImageHeight && newImageHeight > 720){
            newImageHeight = 720;
            newImageWidth = 720 * originalImageRatio;
        }

        if(newImageHeight > newImageWidth && newImageHeight > 720){
            newImageHeight = 720;
            newImageWidth = 720 * originalImageRatio;
        }
        if(newImageWidth == newImageHeight && newImageHeight > 720){
            newImageHeight = 720;
            newImageWidth = 720 * originalImageRatio;
        }

        this.contextReal.drawImage(image, 0, 0, newImageWidth, newImageHeight);
        URL.revokeObjectURL(temp);
    });
});