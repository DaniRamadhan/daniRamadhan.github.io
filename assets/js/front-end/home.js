

var page = window.location.hash.substr(1);
if (page == "" || page == null) page = "home";
loadPage(page);

function loadPage(page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      var content = document.querySelector(".body-content");
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };

  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}

$('.carousel.carousel-slider').carousel({
  indicators: true
});

$(document).ready(function(){
  $('.sidenav').sidenav();
});