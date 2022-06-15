import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { youtubeAction } from "../redux/youtubeAction";
import ClipLoader from "react-spinners/ClipLoader";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import { faBackward, faPlay, faForward, faPause } from "@fortawesome/free-solid-svg-icons";
import MusicList from "../component/MusicList";

// Import Swiper styles
const Main = () => {
  const dispatch = useDispatch();
  const { popularList, player } = useSelector((state) => state.youtube);
  // dispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(youtubeAction.getYoutubeList(0)).then(() => setLoading(false));
  }, []);

  const [paused, setPaused] = useState(true);
  const [playerTarget, setPlayerTarget] = useState();
  const [isListClick, setIsListClick] = useState(false);
  const [isListIndex, setItListIndex] = useState();

  const handleReady = (target) => {
    setPlayerTarget(target);
    if (!paused) {
      target.playVideo();
    }
  };
  if (isListClick) {
    // alert(isListIndex);
    dispatch(youtubeAction.getPlayer(isListIndex)).then(() => {
      setIsListClick(false);
      setPaused(false);
    });
  }

  const musicPlay = () => {
    setPaused(!paused);
    if (paused) {
      playerTarget.playVideo();
    } else {
      playerTarget.pauseVideo();
    }
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
              src={`https://img.youtube.com/vi/${player.snippet.resourceId.videoId}/maxresdefault.jpg`}
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
              {popularList.items.map((item, index) => (
                <MusicList
                  key={index}
                  item={item}
                  index={index}
                  setIsListClick={setIsListClick}
                  setItListIndex={setItListIndex}
                  isListIndex={isListIndex}
                />
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
            {paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
          </button>
          <button className="nextButton">
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
      {player && (
        <div className="youtubePlayer">
          <YouTube
            autoplay
            videoId={player.snippet.resourceId.videoId}
            onReady={(e) => handleReady(e.target)}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
