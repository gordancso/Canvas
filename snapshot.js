function Previous() {
    currentFunction.reset();
    console.log(index, snapshot.length);
    if (currentFunction.draft){
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        currentFunction.draft = false;
    }
    else if (index > 0 && index < snapshot.length) {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextReal.putImageData(snapshot[--index], 0, 0);
    }
    console.log(index, snapshot.length);
}

function Next() {
    currentFunction.reset();
    console.log(index, snapshot.length);
    if (currentFunction.draft){}
    else if (index == (snapshot.length - 1)) { }

    else if (index => 0 && index < snapshot.length) {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextReal.putImageData(snapshot[++index], 0, 0);
    }
    console.log(index, snapshot.length);
}