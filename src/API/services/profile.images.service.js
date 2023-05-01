import { baseURL } from "../Intercepter";

class profileImagesService {
  /**
   * get profile picture or cover.
   *  @param  image size, image name, profile id
   * @return image url
   */
  resolve_porfile_img(size, imageName, profile_id) {
    let image = size + "_" + imageName;
    // const url = `${baseURL}/profile-image?fileName=${image}&profileID=${profile_id}`
    const url = `${baseURL}/profile-image/${profile_id}/${image}`;
    return url;
  }
}

export default new profileImagesService();
