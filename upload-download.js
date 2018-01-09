
function triggerClick (){
    document.getElementById('file').click();

}

document.getElementById('file').addEventListener('change',function(e){
    /*clearCanvas();*/
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

        if(newImageWidth > newImageHeight && newImageHeight > 900){
            newImageWidth = 900;
            newImageHeight = 900 /originalImageRatio;
        }

        if(newImageWidth > newImageHeight && newImageHeight > 500){
            newImageHeight = 500;
            newImageWidth = 500 * originalImageRatio;
        }

        if(newImageHeight > newImageWidth && newImageHeight > 500){
            newImageHeight = 500;
            newImageWidth = 500 * originalImageRatio;
        }
        if(newImageWidth == newImageHeight && newImageHeight > 500){
            newImageHeight = 500;
            newImageWidth = 500 * originalImageRatio;
        }

        this.contextReal.drawImage(image, 0, 0, newImageWidth, newImageHeight);
        URL.revokeObjectURL(temp);
    });
});

/*==================== End upload ========================== */
