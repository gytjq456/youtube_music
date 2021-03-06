import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { youtubeAction } from "../redux/youtubeAction";
import ClipLoader from "react-spinners/ClipLoader";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import { faBackward, faPlay, faForward, faPause } from "@fortawesome/free-solid-svg-icons";
import MusicList from "../component/MusicList";

const Main = () => {
	const dispatch = useDispatch();
	const { popularList, player } = useSelector((state) => state.youtube);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(youtubeAction.getYoutubeList(0)).then(() => setLoading(false));
	}, []);

	const [paused, setPaused] = useState(true);
	const [playerTarget, setPlayerTarget] = useState();
	const [isListIndex, setItListIndex] = useState(0);
	const [thumIsClick, setThumIsClick] = useState(false);
	const [playTime, setPlayTime] = useState(0);

	useEffect(() => {
		if (!thumIsClick && playerTarget) {
			setThumIsClick(true);
		}
	}, [thumIsClick]);


	let timer = null;
	useEffect(() => {
		if (!paused) {
			timer = setInterval(() => {
				console.log("playerTarget.playerInfo.currentTime", playerTarget.playerInfo.currentTime);
				setPlayTime(setDuration(playerTarget.playerInfo.currentTime));
			}, 1000);
		}
		return () => {
			clearInterval(timer);
		};
	}, [playerTarget, paused]);

	useEffect(() => {
		if (playerTarget && isListIndex >= 0) {
			dispatch(youtubeAction.getPlayer(isListIndex)).then(() => {
				setPaused(false);
			});
		}
	}, [isListIndex])

	const prevList = () => {
		if (isListIndex < 0) {
			setItListIndex(popularList.items.length - 1)
			return false;
		}
		setItListIndex(isListIndex - 1)
	}

	const nextList = () => {
		if (isListIndex >= popularList.items.length - 1) {
			setItListIndex(0)
			return false;
		}
		setItListIndex(isListIndex + 1)
	}

	const handleReady = (target) => {
		setPlayerTarget(target);

		if (!paused) {
			target.playVideo();
		} else {
			target.pauseVideo();
		}
	};

	const handleEnd = (target) => {
		console.log("??????", target.playerInfo.currentTime);
	};





	const musicPlay = () => {
		setPaused(!paused);
		if (paused) {
			playerTarget.playVideo();
		} else {
			playerTarget.pauseVideo();
		}
	};

	const setDuration = (time) => {
		time = Math.floor(time);
		let hours = Math.floor(time / 3600);
		let minutes = Math.floor((time - hours * 3600) / 60);
		let seconds = time - hours * 3600 - minutes * 60;
		if (isNaN(hours)) {
			return "00:00";
		}

		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (hours == 0) {
			return minutes + ":" + seconds;
		} else {
			return hours + ":" + minutes + ":" + seconds;
		}
	};

	if (loading) {
		return (
			<div className="loading">
				<ClipLoader color="red" loading={loading} size={150} />
			</div>
		);
	}
	return (
		<div>
			<div className="playWrap">
				<div className="cover">
					{playerTarget ? (
						<div
							className="thumnail"
							onClick={() => {
								musicPlay();
								setThumIsClick(!thumIsClick);
							}}
						>
							<img
								src={`https://img.youtube.com/vi/${player.snippet.resourceId.videoId}/maxresdefault.jpg`}
								alt=""
							/>
							<div className={`clickIcon ${thumIsClick ? "on" : ""}`}>
								<p>
									{!paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
								</p>
							</div>
						</div>
					) : (
						<ClipLoader color="red" size={150} />
					)}
				</div>

				<div className="music-list">
					<h2>?????? ??????</h2>
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
									setItListIndex={setItListIndex}
									isListIndex={isListIndex}
								/>
							))}
						</ul>
					</Scrollbars>
				</div>
			</div>
			<div className="controls">
				{playerTarget && (
					<>
						<div className="playButtons">
							<button className="prevButton" onClick={() => prevList()}>
								<FontAwesomeIcon icon={faBackward} />
							</button>
							<button className="play-paused" onClick={() => musicPlay()}>
								{paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}
							</button>
							<button className="nextButton" onClick={() => nextList()}>
								<FontAwesomeIcon icon={faForward} />
							</button>
						</div>
						<div className="duration">
							<p>
								{playTime === 0 ? "00:00" : playTime} /
								{setDuration(playerTarget.playerInfo.duration)}
							</p>
						</div>
					</>
				)}
			</div>
			{player && (
				<div className="youtubePlayer">
					<YouTube
						autoplay
						videoId={player.snippet.resourceId.videoId}
						onReady={(e) => handleReady(e.target)}
						onEnd={(e) => handleEnd(e.target)}
						onChangeState={(e) => console.log("onChangeState:", e.state)}
					/>
				</div>
			)}
		</div>
	);
};

export default Main;
