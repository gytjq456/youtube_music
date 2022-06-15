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
	const { popularList, player } = useSelector((state) => state.youtube);
	// dispatch();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(youtubeAction.getYoutubeList(0)).then(() => setLoading(false));
	}, []);

	console.log("player", player);
	const [playerId, setPlayerId] = useState();


	const handleReady = (target) => {
		target.playVideo();
	};

	const listClick = (target) => {
		target.playVideo();
	};

	const musicPlay = () => {
		setPlayerId(player.snippet.resourceId.videoId);
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
			{

				player && (
					<YouTube
						autoplay
						controls={false}
						videoId={playerId}
						onReady={(e) => handleReady(e.target)}
					/>
				)
			}
		</div>
	);
};


export default Main;
