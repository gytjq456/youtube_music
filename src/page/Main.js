import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { youtubeAction } from "../redux/youtubeAction";
import ClipLoader from "react-spinners/ClipLoader";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import { faBackward, faPlay, faForward } from "@fortawesome/free-solid-svg-icons";

// Import Swiper styles
const Main = () => {
  const dispatch = useDispatch();
  const { popularList } = useSelector((state) => state.youtube);
  // dispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(youtubeAction.getYoutubeList()).then(() => setLoading(false));
  }, []);

  // const video = {
  //   id: popularList.items[0].snippet.resourceId.videoId,
  //   name: popularList.items[0].snippet.title,
  // };

  const [paused, setPaused] = useState(true);
  const [playerId, setPlayerId] = useState();
  const [player, setPlayer] = useState();

  const handleReady = (target) => {
    console.log("target", target);
    setPlayer(target);
  };

  // const listClick = (target) => {
  //   console.log("target22222222", target.snippet.resourceId.videoId);
  //   setPlayer({ id: target.snippet.resourceId.videoId, name: target.snippet.title });
  // };

  const musicPlay = () => {
    if (paused) {
      setPlayerId(popularList.items[0].snippet.resourceId.videoId);
      setTimeout(() => {
        player.playVideo();
      }, 1000);
    } else {
      player.pauseVideo();
    }
    setPaused(!paused);
  };

  if (loading) {
    return <ClipLoader color="red" loading={loading} size={150} />;
  }
  return (
    <div>
      <div className="playWrap">
        <div className="cover">
          <div className="thumnail">
            <img
              src={`https://img.youtube.com/vi/${popularList.items[0].snippet.resourceId.videoId}/maxresdefault.jpg`}
              alt=""
            />
          </div>
        </div>
        <div className="music-list">
          <h2>재생 목록</h2>
          <Scrollbars
            thumbSize={50}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                // className={s.scrollThumbVertical}
                style={{
                  ...style,
                  width: "8px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
                  backgroundColor: "#ffffff",
                }}
              />
            )}
          >
            <ul>
              {popularList.items.map((item) => (
                <li>
                  <div className="img">
                    <img
                      src={`https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/mqdefault.jpg`}
                      alt=""
                    />
                  </div>
                  <h1>{item.snippet.title}</h1>
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </div>
      <div className="controls">
        <div className="playButtons">
          <button className="prevButton">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button className="play-paused" onClick={() => musicPlay()}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="nextButton">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
      {playerId && (
        <YouTube
          autoplay
          controls={false}
          videoId={playerId}
          onReady={(e) => handleReady(e.target)}
        />
      )}
    </div>
  );
};

// autoplay: 1,
// controls: 0,
// rel: 0,
// showinfo: 0,
// mute: 1,
// loop: 1,

export default Main;
