import React, { useState, useEffect } from "react";
import "./footer.css";
function Footer() {
	return (
		<div>
			<div className="Footer">
				{" "}
				
				<footer>
				<p>
					For code of this app{" "} 
						<a
							href="https://github.com/ionstone/youtube-playlist-length"
							target="blank"
						>
							 click here
						</a>
					</p>
				
					<p>
						Created by{" "}
						<a
							href="https://www.linkedin.com/in/vishesh-yadav-0a4841125/"
							target="blank"
						>
							Vishesh Yadav
						</a>
					</p>
					
					
				
				</footer>
			</div>
		</div>
	);
}
export default Footer;
