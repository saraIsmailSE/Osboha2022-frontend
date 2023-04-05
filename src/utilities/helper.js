import { formatDistanceToNow } from "date-fns";
import ar from "date-fns/locale/ar-SA";
import { toast } from "vue3-toastify";

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

  toggleToast(message, type) {
    let backgroundColor;
    switch (type) {
      case "success":
        backgroundColor = "#278036";
        break;
      case "error":
        backgroundColor = "#d63031";
        break;
      case "warning":
        backgroundColor = "#ffc107";
        break;
      case "info":
        backgroundColor = "#17a2b8";
        break;
      default:
        backgroundColor = "#278036";
        break;
    }
    toast(message, {
      type,
      toastStyle: {
        "background-color": `${backgroundColor}`,
      },
    });
  },
};
