import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { youtubeAction } from "../redux/youtubeAction";
import ClipLoader from "react-spinners/ClipLoader";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media, Player, controls } from "react-media-player";
import "swiper/css";
const { PlayPause, MuteUnmute } = controls;
// Import Swiper styles
const Main = () => {
  const dispatch = useDispatch();
  const { popularList } = useSelector((state) => state.youtube);
  // dispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(youtubeAction.getYoutubeList()).then(() => setLoading(false));
  }, []);
  const opts = {
    width: "320px",
    height: "200px",
    playerVars: {
      autoplay: 1,
    },
  };
  if (loading) {
    return <ClipLoader color="red" loading={loading} size={150} />;
  }
  return (
    <div className="inner1350">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {popularList.items.map((item) => (
          <SwiperSlide>
            <img src={item.snippet.thumbnails.high.url} alt="" />
            <h1>{item.snippet.title}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    // <YouTube videoId={item.snippet.resourceId.videoId} />
    // <div>
    //   {popularList.items.map((item) => (
    //     <div>
    //       <YouTube videoId={item.id} opts={opts} />
    //     </div>
    //   ))}
    // </div>
  );
};

export default Main;
