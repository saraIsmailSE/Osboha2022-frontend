import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faThumbsUp,
  faShare,
  faBookmark,
  faPen,
  faCircleExclamation,
  faBookOpen,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as farThumbsUp,
  faComment as farComment,
  faBookmark as farBookmark,
  faHeart as farHeart,
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
      faCircleExclamation,
      faBookOpen,
      faHeart,
      farHeart
    );
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
