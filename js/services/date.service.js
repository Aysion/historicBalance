"use strict";

(function() {
  angular.module('app')
    .factory('dateService', dateService);

  function dateService() {
    const that = {
      toDate
    };

    function toDate(dateStr) {
      return new Date(dateStr);
    }

    return that;
  }
})();
