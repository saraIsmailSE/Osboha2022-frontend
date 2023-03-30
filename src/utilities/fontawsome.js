import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faThumbsUp,
  faShare,
  faBookmark,
  faPen,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as farThumbsUp,
  faComment as farComment,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";

export default {
  install(app) {
    library.add(
      faThumbsUp,
      farThumbsUp,
      farComment,
      faShare,
      farBookmark,
      faBookmark,
      faPen,
      faCircleExclamation
    );
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
