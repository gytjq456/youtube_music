import React from "react";

const MusicList = ({ item, index, setIsListClick, setItListIndex, isListIndex }) => {
  const listClick = (index) => {
    setItListIndex(index);
    setIsListClick(true);
  };
  return (
    <li onClick={() => listClick(index)} className={isListIndex === index ? "on" : ""}>
      <div className="img">
        <img
          src={`https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/mqdefault.jpg`}
          alt=""
        />
      </div>
      <h1>{item.snippet.title}</h1>
    </li>
  );
};

export default MusicList;
