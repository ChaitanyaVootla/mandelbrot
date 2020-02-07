onmessage = function(event) {
    postMessage(generateData(event.data));
}

function generateData(mainData) {
    var data = new Array(mainData.width);
    for(var x=0; x < mainData.width; x++) {
        data[x] = new Array(mainData.height);
    }

    for(var x=0; x < mainData.width; x++) {
        for(var y=0; y < mainData.height; y++) {
            data[x][y] = 
            checkIfBelongsToJuliaSet(x/mainData.magnificationFactor - mainData.panX,
                                                y/mainData.magnificationFactor - mainData.panY, mainData);
        }
    }
    return data;
}

function checkIfBelongsToJuliaSet(x, y, mainData) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var iterations = 80;

    for(var i = 0; i < iterations; i++) {
        // Calculate the real and imaginary components of the result
        // separately
        var tempRealComponent = realComponentOfResult * realComponentOfResult
                                - imaginaryComponentOfResult * imaginaryComponentOfResult
                                + mainData.juliax;

        var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                + mainData.juliay;

        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;
        if (realComponentOfResult*imaginaryComponentOfResult >= 5)
            return (i/iterations*100);
    }

    return 0;
}