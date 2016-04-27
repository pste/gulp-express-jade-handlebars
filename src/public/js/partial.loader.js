
$("a").click(function(e) {
  // prevent from going to the page
  e.preventDefault();

  var href = $(this).attr("href");
  if (href !== '#') $("#content").load(href);
  return false;
});
