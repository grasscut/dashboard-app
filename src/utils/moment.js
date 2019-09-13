import moment from 'moment';

moment.locale('en-gb');
moment.locale('en-gb', {
  calendar : {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'LL',
  },
});

export default moment;