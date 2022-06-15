import api from "./api";
import { youtubeActions } from "./reducres/youtubeReduces";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function getYoutubeList(index) {
  return async (dispatch) => {
    const popularListAPI = await api.get(
      `/playlistItems?playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&maxResults=15&key=${API_KEY}`
    );

    // console.log("popularListAPI", popularListAPI);
    dispatch(
      youtubeActions.getPopularList({
        popularList: popularListAPI.data,
        player: popularListAPI.data.items[index],
      })
    );
  };
}
function getPlayer(index) {
  return async (dispatch) => {
    const popularListAPI = await api.get(
      `/playlistItems?playlistId=PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe&part=snippet&maxResults=15&key=${API_KEY}`
    );
    dispatch(
      youtubeActions.getPlayer({
        player: popularListAPI.data.items[index],
      })
    );
  };
}

export const youtubeAction = {
  getYoutubeList,
  getPlayer,
};
