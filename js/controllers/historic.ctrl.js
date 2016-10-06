(function() {
  "use strict";

  angular.module('app')
    .controller('historicCtrl', historicCtrl);

  historicCtrl.$inject = ['dateService'];

  function historicCtrl(dateService) {
    let that = this;

    that.mappingType = {
      '0': 'Deposito',
      '1': 'Saque'
    };

    that.historics = [];
    that.isNew     = true;

    that.balance   = {
      current  : 0,
      previous : 0
    };

    that.header = {
      date: {
        ascDescCLassArrow: null
      }
    };

    that.setHistoric             = setHistoric;
    that.getType                 = getType;
    that.removeHistoric          = removeHistoric;
    that.newHistoric             = newHistoric;
    that.cleanNew                = cleanNew;
    that.tableHeaderSortedArrow  = tableHeaderSortedArrow;

    function setHistoric(historic) {

      if (historic.value) {
        if (_calculateBalance(historic.type == 0, historic.value)) {

          if (historic.date) {
            historic.date = dateService.toDate(historic.date);
          } else  {
            historic.date = new Date();
          }

          that.historics.push(historic);

          return true;
        }
      }

      return false;
    }

    function getType(type) {
      return that.mappingType[type];
    }

    function removeHistoric(idx) {
      let historic = that.historics.splice(idx, 1)[0];

      _calculateBalance(historic.type != 0, historic.value);
    }

    function newHistoric() {
      that.new = {
        type  : '0',
        value : 0
      };
    }

    function cleanNew() {
      that.new = false;
    }

    function tableHeaderSortedArrow(obj) {
      const classArrowAsc  = 'mdl-data-table__header--sorted-ascending';
      const classArrowDesc = 'mdl-data-table__header--sorted-descending';

      obj.ascDescCLassArrow = (obj.ascDescCLassArrow === classArrowAsc ? classArrowDesc : classArrawAsc);
    }

    // metodos internos

    function _calculateBalance(isIncrement, value) {
      let success  = false;
      let previous = that.balance.current.toFixed(2);

      if (isIncrement) {
        that.balance.current += value;

        success = true;
      } else {
        if (previous - value < 0) {

          that.mdlDialog.show({
            title: 'Aviso',
            content: 'Saldo insuficiente'
          });

        } else {
          that.balance.current -= value;

          success = true;
        }
      }

      if (success) {
        that.balance.previous = previous;
      }

      return success;
    }

    //---end---metodos internos---

    // set dos mocks
    [
      {
        type: 0,
        value: 200.45,
        date: '2016-10-04 18:43'
      },
      {
        type: 1,
        value: 100,
        date: '2016-10-04 19:03'
      },
      {
        type: 0,
        value: 100.45,
        date: '2016-10-04 19:13'
      }
    ].forEach((historic) => setHistoric(historic));
    //---end---set dos mocks--------
  }
})();
