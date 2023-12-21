import { handleError } from "vue";
import router from "../router";

export function customHandleError(error, page = "") {
  console.log(`[ERROR] ${page} =>`, error.response.data);
  if (error.response.data.statusCode === 404) {
    router.push({ name: "NotFound" });
  } else if (error.response.data.statusCode === 403) {
    router.push({ name: "NotAuthorized" });
  }
  handleError(error);
}
