import React from "react";

const MusicList = ({ item, index, setItListIndex, isListIndex }) => {
	const listClick = (index) => {
		setItListIndex(index);
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
