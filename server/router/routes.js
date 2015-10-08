exports.home = function(req, res) {
  res.render('layout');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.templates = function (req, res) {
  var name = req.params.name;
  res.render('includes/' + name);
};
