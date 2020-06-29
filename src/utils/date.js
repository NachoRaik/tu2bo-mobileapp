import moment from 'moment';

export const getFormatTimestamp = () => moment().format('MM/DD/YY HH:mm:ss');

export const formatFirebaseTimestampInWords = (timestamp) =>
  moment(timestamp.toDate()).fromNow();
