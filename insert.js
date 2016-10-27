'use strict';

function insertElement(parentObject, elementObject) {
  var newElement = document.createElement(elementObject.tag);
  // var text = document.createTextNode(elementObject.text);
  var markup = '<div class="c-carousel__controls"><a href="#" class="c-carousel__control-link c-carousel__control-link--previous c-carousel__control-link--disabled" id="id-carousel-control-link-previous"><i class="c-carousel__control-icon c-carousel__control-icon-chevron c-carousel__control-icon-chevron--previous"></i></a><a href="#" class="c-carousel__control-link c-carousel__control-link--next" id="id-carousel-control-link-next"><i class="c-carousel__control-icon c-carousel__control-icon-chevron c-carousel__control-icon-chevron--next"></i></a></div><div class="c-carousel__viewport"><div class="c-carousel" id="id-carousel"><div class="c-carousel__card">' + elementObject.text + '</div><div class="c-carousel__card">Another thing with content!</div></div></div>';
  // grab the element with that id
  if (parentObject.id) {
    var parent = document.getElementById(parentObject.id);
  } else if (parentObject.class) {
    // grab the first element that has that class
    var parent = document.getElementsByClassName(parentObject.class);
    var parent = parent[0];
  }
  var firstChild = parent.firstChild;

  newElement.id = elementObject.id;
  newElement.classList.add(elementObject.class); 

  newElement.innerHTML = markup;

  parent.insertBefore(newElement, firstChild);
}

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
  id: 'id-socialator',
  class: 'c-socialator',
  tag: 'div',
  text: 'This content was injected by a chrome extension!',
}

// var jsonFile = 'foobar.json';
// var jsonFile = 'twitter.json';

insertElement(parentElement, childElement);
// loadJSON(jsonFile, childElement);
