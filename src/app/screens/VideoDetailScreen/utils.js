import moment from 'moment';
import 'moment/locale/es';

export const formatDate = (stringDate) => {
  const date = moment(stringDate);
  return date.locale('es').format('LL');
};
