function Previous() {
    if (index > 0 && index < snapshot.length) {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextReal.putImageData(snapshot[--index], 0, 0);
    }
}

function Next() {
    if (index == (snapshot.length - 1)) { }

    else if (index => 0 && index < snapshot.length) {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextReal.putImageData(snapshot[++index], 0, 0);
    }
}