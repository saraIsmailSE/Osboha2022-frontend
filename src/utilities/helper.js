import { formatDistanceToNow } from "date-fns";
import ar from "date-fns/locale/ar-SA";

export default {
  formatDateToWritten(dateToConvert) {
    if (dateToConvert === null || dateToConvert === "") return null;
    return formatDistanceToNow(new Date(dateToConvert), {
      addSuffix: true,
      locale: ar,
    });
  },

  formatFullDate(dateToConvert) {
    //Saturday, March 25, 2017 at 10:30 PM
    return new Date(dateToConvert).toLocaleString("ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  },
};
