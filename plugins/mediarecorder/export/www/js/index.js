/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Cordova stuff
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent();
    },
    // Launch the app when it's ready
    receivedEvent: function () {

        // time to launch the app
        videoRecordingApp();
    }
};
app.initialize();

var videoRecordingApp = function () {
    var recordingBtn = document.getElementById("recordingBtn");

    // setup the button's event listener in order to talk to the app's native side when clicked
    recordingBtn.addEventListener("click",
        function () {
            var action = recordingBtn.getAttribute("data-action"); // store the action to be executed on native side

            // tests the plugin : start/stop recording
            var cameraToBackground = true; // with option

            MediaRecorder.switchRecording(action, cameraToBackground, successCallback, errorCallback); // talk to native side
        });

    // exit the app
    var exitBtn = document.getElementById("exit");
    exitBtn.addEventListener("click",
        function () {
            navigator.app.exitApp(); // we've managed the onStop event on native side, we know the camera will be freed...
        });
};

// Callbacks
function successCallback(successMessage) {
    if (successMessage != "OK") { // the default message sent by Cordova is 'OK' (and we don't want to display it...)
        displayMsg(successMessage, "success"); // adding a green color to the message (see css file)
    }

    // switch the button's attributes for the next click (we're in the success callback so it won't be switched if something went wrong)
    var button = document.getElementById("recordingBtn");
    switchButton(button);
}

function errorCallback(errorMessage) {
    displayMsg(errorMessage, "error"); // adding a red color to the message (see css file)
    console.log(errorMessage); // for debugging purpose
}

// when clicked, the button needs to switch its behavior for the next click
function switchButton(button) {

    var buttonAction = button.getAttribute("data-action");

    if (buttonAction == "startRecording") {

        var newButtonClass = "btn-recording";
        var newButtonAction = "stopRecording";
        var newButtonText = "Stop recording"

    } else if (buttonAction == "stopRecording") {

        var newButtonClass = "btn-not-recording";
        var newButtonAction = "startRecording";
        var newButtonText = "Start recording";
    }

    button.setAttribute("class", newButtonClass);
    button.setAttribute('data-action', newButtonAction);
    button.firstChild.data = newButtonText;
}

// add a message on the app's display (a DOM "p" element)
function displayMsg(msg, classe) {

    var displayDiv = document.getElementById("msg");
    displayDiv.setAttribute("style", "text-align:center");
    var messageToDisplay = document.createElement("p");
    messageToDisplay.setAttribute("class", classe);
    messageToDisplay.innerHTML = msg;
    displayDiv.appendChild(messageToDisplay);
}