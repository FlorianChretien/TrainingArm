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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // 
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var options = { frequency: 1000 };  // Update every 3 seconds

        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

    }
};

/** Chronomètre fonctionnel uniquement sur mobile avec phoneGap **/
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var msec;
var sec;
var min;
var hr;
function chrono(){
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    msec = diff.getMilliseconds()
    sec = diff.getSeconds()
    min = diff.getMinutes()
    hr = diff.getHours()-1
    if (min < 10){
        min = "0" + min
    }
    if (sec < 10){
        sec = "0" + sec
    }
    if(msec < 10){
        msec = "00" +msec
    }
    else if(msec < 100){
        msec = "0" +msec
    }
    document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
    timerID = setTimeout("chrono()", 50)
}

/** Lance le chrono **/
function chronoStart(){
    start = new Date()
    chrono()
    document.getElementById('preparation').style.display = 'none'
    boucle()
}

/** détecte et indique les mouvements du téléphone **/
function onSuccess(acceleration) {
    newX = acceleration.x;
    newY = acceleration.y;
    newZ = acceleration.z;
}

var newX;
var newY;
var newZ;
var oldX;
var oldY;
var oldZ;
var recordChrono = 0;
var data;

function boucle(acceleration){

    setInterval(function(){

        var newXstring = newX.toString().split('.')[0];
        var newYstring = newY.toString().split('.')[0];
        var newZstring = newY.toString().split('.')[0];

        if( newXstring == oldX && newYstring == oldY && newZstring == oldZ ){

            clearTimeout(timerID)

            nouveauScore = hr + min + sec + msec;

            nouveauScoreString = hr + ":" + min + ":" + sec + ":" + msec;
            
            if(recordChrono < nouveauScore){

                document.getElementById('record').innerHTML = "Record : " + nouveauScoreString;
                document.getElementById('recordTemp').style.display = 'none'

                recordChrono = nouveauScore;
                recordChronoString = nouveauScoreString;

                sessionStorage.setItem("recordChrono", recordChrono);
                sessionStorage.setItem("recordChronoString", recordChronoString);
            }
        }

        oldX = newXstring;
        oldY = newYstring;
        oldZ = newZstring;

    }, 800);

}

function record(){
    if( recordChrono == 0 ){
        document.getElementById('recordTemp').style.display = 'block';
        data = sessionStorage.getItem('recordChronoString');
        document.getElementById('recordTemp').innerHTML = "Record : " + data;
    }
}

function onError() {
    alert('onError!');
}

navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);





