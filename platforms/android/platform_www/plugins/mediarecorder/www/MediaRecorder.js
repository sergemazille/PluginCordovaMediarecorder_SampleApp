cordova.define("mediarecorder.MediaRecorder", function(require, exports, module) {
module.exports = {

    switchRecording: function (action, cameraToBackground, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "MediaRecorderBridge", action, [cameraToBackground]);
    }
};

});
