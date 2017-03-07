'use strict';

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:8080/api/projects',
    success: function success(result) {}
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   console.log('the dom has loaded')
// })