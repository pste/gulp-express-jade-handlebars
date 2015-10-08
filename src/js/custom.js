function handlebar_bind($elem, url) {
  if ($elem && $elem.length>=0) {
    if (typeof url == "string") {
      $.ajax({
        url: url,
        //jsonp: "callback",
        //dataType: "jsonp",
        dataType: "json",
        success: function(data) {
          var template = Handlebars.compile($elem.html());
          $elem.html(template(data));
        },
        error: function(XHR, textStatus, errorThrown) {
          console.log(XHR);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    }
    else { // url is an object or array
      var template = Handlebars.compile($elem.html());
      $elem.html(template(url));
    }
  }
}

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

$("a").click(function(e) {
  // prevent from going to the page
  e.preventDefault();

  // get the href
  var href = $(this).attr("href");
  $("#content").load(href, function() {
    // do something after content has been loaded
  });
});

/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::: */