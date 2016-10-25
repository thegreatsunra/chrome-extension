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

function loadJSON(filename, element) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE ) {
     if (request.status == 200) {
       var parsedJSON = JSON.parse(request.responseText);
       console.log(parsedJSON.query.results.json.statuses);
       document.getElementById(element.id).innerHTML = parsedJSON.query.results.json.statuses[0].created_at;
     }
     else if (request.status == 400) {
      alert('There was an error 400');
     }
     else {
       alert('something else other than 200 was returned');
     }
    }
  };

  request.open('GET', chrome.extension.getURL(filename), true);
  request.send();
}

// id or class
// not both
var parentElement = {
  // id: 'parent-id',
  class: 'c-content',
}

// id, class, tag
var childElement = {
  id: 'id-new-element',
  class: 'c-new-element',
  tag: 'h1',
  text: 'This content was injected by a chrome extension!',
}
// loadJSON(jsonFile, childElement);
