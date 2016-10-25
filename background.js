'use strict';

var target = document.getElementsByClassName('c-content');
var content = document.createElement('h1');
var text = document.createTextNode('This content was injected by a chrome extension!');
content.appendChild(text);

for (var i = target.length - 1; i >= 0; i--) {
  console.log('tried adding a thing');
  target[i].appendChild(content);
}
