/**********************************************************************************************************************

	-- SCOPE ------------------------------------------------------------------------------

	Extend functions and allow some backward compatibility


	-- CHANGELOG --------------------------------------------------------------------------

	180615\s.zaglio: moved from app


	-- TODO -------------------------------------------------------------------------------


***********************************************************************************************************************/
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
};

/*
Object.prototype.forEach = function(fn) {
  var object = this, returned;

  Object.keys(object).forEach(function(key) {
    if (returned === false) {
      return;
    }

    returned = fn.call(null, object[key], key, object);
  });
};
*/