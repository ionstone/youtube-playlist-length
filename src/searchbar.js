import React from "react";
import "./searchbar.css";

import { useState } from "react";

function Searchbar(props) {
	const { onSearch } = props;

	const [searchText, setSearchText] = useState("");

	const handleInput = (e) => {
		const text = e.target.value;
		setSearchText(text);
	};

	const handleEnterKeyPressed = (e) => {
		if (e.key === "Enter") {
			onSearch(searchText);
		}
	};

	return (
		<div>
			<div class="search-container">
				<p class="App">
					
				<strong>Enter the link of any youtube Playlist  below:</strong>		
				
					
				</p>
				<input
					id="search-bar"
					onChange={handleInput}
					onKeyPress={handleEnterKeyPressed}
					type="text"
					value={searchText}
					placeholder="youtube.com/playlist?list=id"
				/>
			</div>
		</div>
	);
}

export default Searchbar;
