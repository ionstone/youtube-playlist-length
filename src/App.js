// import Yt from "./yt";
import "./app.css";

import Loading from "./Loading";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import Searchbar from "./searchbar";
import Footer from "./Footer";

//  <Yt/>;
const API = "AIzaSyBOWdJRYDvzwZJFuYLLTPQRfAD6DiVe6Uk";

const hours_pattern = /(\d+)H/;
const minutes_pattern = /(\d+)M/;
const seconds_pattern = /(\d+)S/;
const speeds = [1.25, 1.5, 1.75, 2];

function App() {
	const [loading, setLoading] = useState(false);
	const [totalTime, setTotalTime] = useState(0);
	const [vidCount, setVidCount] = useState(0);
	const [Vurl, setVurl] = useState(true);
	const getData = async (PID, API, PT) => {
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&pageToken=${PT}&playlistId=${PID}&key=${API}`;

		return await axios.get(url);
	};
	const getData2 = async (vidId, API) => {
		const url2 = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${vidId}&key=${API}`;
		return await axios.get(url2);
	};
	function getParameterByName(name, url) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return "";
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	const onSearch = async (url) => {
		setVidCount(0);
		setTotalTime(0);
		setVurl(true);
		let PT = "";
		let PID = getParameterByName("list", url);
		if (PID == null) {
			setVurl(false);
		}
		if (loading) return;
		setLoading(true);
		for (let i = 0; i <= 1000; i++) {
			let data = await getData(PID, API, PT);
			PT = data.data.nextPageToken;

			const vidId = data.data.items.map((item) => item.contentDetails.videoId);

			data = await getData2(vidId, API);
			const result = data.data.items.map((item) => {
				return item.contentDetails.duration;
			});

			const tsArr = result.map((ts) => getTsToSec(ts));
			const tt = tsArr.reduce((partialSum, el) => partialSum + el, 0);

			setTotalTime((prevTime) => tt + prevTime);
			setVidCount((prevVideoCount) => vidId.length + prevVideoCount);
			if (PT == null) break;
		}
		setLoading(false);
	};

	const getTsToSec = (ts) => {
		let sec = 0;
		const temp1 = minutes_pattern.exec(ts);
		if (temp1 != null) sec += parseInt(temp1[1]) * 60;
		const temp2 = hours_pattern.exec(ts);
		if (temp2 != null) sec += parseInt(temp2[1]) * 60 * 60;
		const temp3 = seconds_pattern.exec(ts);
		if (temp3 != null) sec += parseInt(temp3[1]);
		return sec;
	};

	const getTimeWithSpeed = (timeSecs, multiplier) => {
		let newTime = timeSecs / multiplier;
		let days = Math.floor(newTime / (24 * 60 * 60));
		newTime -= days * 24 * 60 * 60;
		let hr = Math.floor(newTime / (60 * 60));
		newTime -= hr * 60 * 60;
		let mn = Math.floor(newTime / 60);
		newTime -= mn * 60;
		let sec = newTime;
		let ans =
			(days > 0 ? `${days}  Days ` : "") +
			(hr > 0 ? `${hr}  Hrs ` : "") +
			(mn > 0 ? `${mn}  Mins ` : "") +
			(sec > 0 ? `${Math.round(sec)} Secs` : "");
		return ans;
	};
	if (Vurl == false) {
		return (
			<div>
				<Searchbar onSearch={onSearch} />
				<br></br>
				<div className="App">
					<h2>
						{" "}
						<strong>You have enter an invalid url.</strong>
					</h2>
				</div>
				{/* <footer ClassName="App">
  <p>Created by <a href="https://www.linkedin.com/in/vishesh-yadav-0a4841125/">Vishesh Yadav</a>
</p>
</footer>	 */}
			</div>
		);
	} else if (!loading & (totalTime === 0)) {
		return (
			<div>
				{/* less video--->PL3X65s-JgCM-r06MYmYtaMs4f8-tmtKny<br></br>
				more video--->PLu9TPBf--Typwc6TkRkYpn7PWQJ42B24t<br></br>
				62 video--->PLH4rVMDDprz-NdhXlwlpUtE9qJurxFBGC<br></br> */}
				<Searchbar onSearch={onSearch} />

				<Footer />
			</div>
		);
	} else if (loading) {
		return (
			<div>
				{/* less video--->PL3X65s-JgCM-r06MYmYtaMs4f8-tmtKny<br></br>
				more video--->PLu9TPBf--Typwc6TkRkYpn7PWQJ42B24t<br></br>
				62 video--->PLH4rVMDDprz-NdhXlwlpUtE9qJurxFBGC<br></br> */}
				<Searchbar onSearch={onSearch} />
				<Loading />
			</div>
		);
	} else {
		return (
			<div>
				{/* less video--->PL3X65s-JgCM-r06MYmYtaMs4f8-tmtKny<br></br>
				more video--->PLu9TPBf--Typwc6TkRkYpn7PWQJ42B24t<br></br>
				62 video--->PLH4rVMDDprz-NdhXlwlpUtE9qJurxFBGC<br></br> */}
				<Searchbar onSearch={onSearch} />
				<div className="App">
					<p>
						<strong>Total no of videos : {vidCount}</strong>
					</p>

					{/* <p>{totalTime}</p> */}
					<p>
						<strong>
							Average length of videos :{" "}
							{getTimeWithSpeed(totalTime / vidCount, 1)}
						</strong>{" "}
					</p>
					<p>
						<strong>
							Total length of videos : {getTimeWithSpeed(totalTime, 1)}
						</strong>{" "}
					</p>

					{speeds.map((el) => {
						return (
							<div key={el.toString()}>
								<p>
									{" "}
									<strong>
										At {el}x : {getTimeWithSpeed(totalTime, el)}
									</strong>
								</p>
							</div>
						);
					})}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
