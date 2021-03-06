'use strict';

function moveCarousel(currentMargin, direction) {
  var carousel = document.getElementById('id-carousel');
  console.log('direction: ' + direction)
  if (direction === 'previous') {
    currentCarouselMargin = currentMargin + 300;
    carousel.style.marginLeft = (currentCarouselMargin + 'px');
    currentCarouselCard = currentCarouselCard - 1;
  } else {
    currentCarouselMargin = currentMargin - 300;
    carousel.style.marginLeft = (currentCarouselMargin + 'px');
    currentCarouselCard = currentCarouselCard + 1;
  }
}

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
  // check if class property has multiple classes delimited by spaces
  if (elementObject.class.indexOf(' ') !== -1) {
    // if it has spaces, create an array containing each class
    var classes = elementObject.class.split(' ');
    // loop through array and apply each class
    for (var i = classes.length - 1; i >= 0; i--) {
      newElement.classList.add(classes[i]);
    }
  } else {
    // there aren't any spaces so applt just the one class
    newElement.classList.add(elementObject.class); 
  }
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
var socialatorElement = {
  id: 'id-socialator',
  class: 'c-socialator',
  tag: 'div',
  text: 'This content was injected by a chrome extension!',
}

// var jsonFile = 'foobar.json';
// var jsonFile = 'twitter.json';

// loadJSON(jsonFile, childElement);
insertElement(parentElement, socialatorElement);

var carouselControlLinkNext = document.getElementById('id-carousel-control-link-next');
var carouselControlLinkPrevious = document.getElementById('id-carousel-control-link-previous');

var currentCarouselCard = 0;
var currentCarouselMargin = 0;

carouselControlLinkNext.addEventListener('click', function(event) {
  event.preventDefault();
  if (currentCarouselCard < 14) {
    moveCarousel(currentCarouselMargin);
  }
  if (currentCarouselCard > 0) {
    carouselControlLinkPrevious.classList.remove('c-carousel__control-link--disabled');
  }
  if (currentCarouselCard === 14) {
    carouselControlLinkNext.classList.add('c-carousel__control-link--disabled');
  } else {
    carouselControlLinkNext.classList.remove('c-carousel__control-link--disabled');
  }
  console.log('current card: ' + currentCarouselCard)
});

carouselControlLinkPrevious.addEventListener('click', function(event) {
  event.preventDefault();
  if (currentCarouselCard > 0) {
    moveCarousel(currentCarouselMargin, 'previous');
  }
  if (currentCarouselCard < 14) {
    carouselControlLinkNext.classList.remove('c-carousel__control-link--disabled');
  }
  if (currentCarouselCard === 0) {
    carouselControlLinkPrevious.classList.add('c-carousel__control-link--disabled');
  } else {
    carouselControlLinkPrevious.classList.remove('c-carousel__control-link--disabled');
  }
  console.log('current card: ' + currentCarouselCard)
});
