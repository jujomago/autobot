(function () {
  'use strict';

  function DateTimeService(
    Utils,
    moment)
  {
    const FORMAT_DATE_TIME = 'ddd MMM DD YYYY, hh:mm:ss A';

    function getDateTimeFormat(dateTime) {
      let zoneDate = moment(dateTime);
      zoneDate = Utils.isUndefinedOrNull(dateTime) || !zoneDate.isValid() ? 'N/A' : zoneDate.utc().format(FORMAT_DATE_TIME);

      return zoneDate;
    }

    function convertMillisecondsToTime(milliseconds) {
      let seconds = parseInt((milliseconds/1000)%60),
          minutes = parseInt((milliseconds/(1000*60))%60),
          hours = parseInt((milliseconds/(1000*60*60)));

      hours = (hours < 10) ? '0' + hours : hours;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;

      return hours + ':' + minutes + ':' + seconds;
    }

    return {
      convertMillisecondsToTime: convertMillisecondsToTime,
      getDateTimeFormat: getDateTimeFormat
    };
  }

  DateTimeService.$inject = [
    'Utils',
    'moment'
  ];

  angular.module('fakiyaMainApp').
  factory('DateTime', DateTimeService);
})();
