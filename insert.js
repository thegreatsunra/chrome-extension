'use strict';

// var parent = document.getElementById('parent');
// var existingThing = document.getElementById('existing-thing');

var parent = document.getElementsByClassName('c-content');
var parent = parent[0];
var existingThing = parent.getElementsByClassName('o-layout');
var existingThing = existingThing[0];

var newThing = document.createElement('h1');
var text = document.createTextNode('This content was injected by a chrome extension!');
newThing.appendChild(text);

parent.insertBefore(newThing, existingThing);
