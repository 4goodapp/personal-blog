Session.getNonReactive = function (key) {
  return Deps.nonreactive(function () { return Session.get(key); });
};