(function() {
  "use strict";

  angular.module('app')
    .directive('mdlDialog', mdlDialog);

  function mdlDialog() {
    return {
      'restrict' : 'A',
      'link'     : link
    };

    function link(scope, _elem) {
      let elem = _elem[0];

      let dialog = {
        show  : (params) => {
          dialog.title   = params.title;
          dialog.content = params.content;

          elem.show();
        },
        close : () => elem.close(),
      };

      scope.ctrl.mdlDialog = dialog;
    }
  }
})();
