'use strict';

// var parent = document.getElementById('parent');
// var existingThing = document.getElementById('existing-thing');

var parent = document.getElementsByClassName('c-content');
var parent = parent[0];
var existingThing = parent.getElementsByClassName('o-layout');
var existingThing = existingThing[0];

var newThing = document.createElement('h1');
newThing.id = "new-thing";

var text = document.createTextNode('This content was injected by a chrome extension!');
newThing.appendChild(text);

parent.insertBefore(newThing, existingThing);

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               var parsedJSON = JSON.parse(xmlhttp.responseText);
               console.log(parsedJSON.query.results.json.statuses);
               document.getElementById('new-thing').innerHTML = parsedJSON.query.results.json.statuses[0].created_at;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.send();
}

loadXMLDoc();
