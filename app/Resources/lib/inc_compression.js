
function resizeKeepAspectRatioPercentage(blob, imageWidth, imageHeight, percentage) {
    // only run this function if suitable values have been entered
    if (imageWidth <= 0 || imageHeight <= 0 || percentage <= 0)
        return blob;

    var w = imageWidth * (percentage / 100);
    var h = imageHeight * (percentage / 100);

    Ti.API.info('w: ' + w);
    Ti.API.info('h: ' + h);

    return ImageFactory.imageAsResized(blob, { width:w, height:h });
}

function resizeKeepAspectRatioNewWidth(blob, imageWidth, imageHeight, newWidth) {
    // only run this function if suitable values have been entered
    if (imageWidth <= 0 || imageHeight <= 0 || newWidth <= 0)
        return blob;

    var ratio = imageWidth / imageHeight;

    var w = newWidth;
    var h = newWidth / ratio;

    Ti.API.info('ratio: ' + ratio);
    Ti.API.info('w: ' + w);
    Ti.API.info('h: ' + h);

    return ImageFactory.imageAsResized(blob, { width:w, height:h });
}

function resizeKeepAspectRatioNewHeight(blob, imageWidth, imageHeight, newHeight) {
    // only run this function if suitable values have been entered
    if (imageWidth <= 0 || imageHeight <= 0 || newHeight <= 0)
        return blob;

    var ratio = imageWidth / imageHeight;

    var w = newHeight * ratio;
    var h = newHeight;

    Ti.API.info('ratio: ' + ratio);
    Ti.API.info('w: ' + w);
    Ti.API.info('h: ' + h);

    return ImageFactory.imageAsResized(blob, { width:w, height:h });
}