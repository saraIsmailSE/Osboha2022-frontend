import { formatDistanceToNow } from "date-fns";
import ar from "date-fns/locale/ar-SA";
import { toast } from "vue3-toastify";
import Swal from "sweetalert2";

export default {
  /**
   * Transforms a date to a written format (ex: 5 minutes ago) in Arabic
   * @param {Date} dateToConvert
   * @returns {String} written date
   */
  formatDateToWritten(dateToConvert) {
    if (dateToConvert === null || dateToConvert === "") return null;
    return formatDistanceToNow(new Date(dateToConvert), {
      addSuffix: true,
      locale: ar,
    });
  },

  /**
   * Transforms a date to a full date format (ex: Saturday, March 25, 2017 at 10:30 PM) in Arabic
   * @param {Date} dateToConvert
   * @returns {String} full date
   */
  formatFullDate(dateToConvert) {
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

  /**
   * Toggle a toast message with a specific type
   * @param {String} message
   * @param {String} type
   */
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
      autoClose: type === "success" ? 1000 : 2000,
    });
  },

  toggleErrorToast(message = "حدث خطأ ما, يرجى المحاولة لاحقاً") {
    return this.toggleToast(message, "error");
  },

  /**
   * Toggle Swal alert (error type)
   * @param {String} title
   * @returns Swal.fire
   */
  handleErrorSwal(title = "حدث خطأ ما, يرجى المحاولة لاحقاً") {
    return Swal.fire({
      position: "top-end",
      title: title,
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "حسناً",
    });
  },

  /**
   * Toggle Swal alert (success type)
   * @param {String} title
   * @param {Number} timer
   * @returns Swal.fire
   * @default timer = 1500
   */
  handleSuccessSwal(title, timer = 1500) {
    return Swal.fire({
      position: "top-end",
      title: title,
      icon: "success",
      showConfirmButton: false,
      timer,
    });
  },

  /**
   * format a number to have a comma every 3 digits
   * @param {Number} number
   * @returns {String} formatted number
   */
  formatNumber(number) {
    if (!number) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};
