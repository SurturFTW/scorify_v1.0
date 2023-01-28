let view = (url, fun, params) => {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.send();
	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState == 4) {
			document.querySelector("#main-container").innerHTML = xhr.responseText;
			fun(params);
		}
	});
};

let loadHome = () => {
	view("home.html", () => {
		let match = JSON.parse(localStorage.getItem("match"));

		if (match && match.title) {
			document.querySelector("#running-match-nav").classList.remove("d-none");
		}
		if (match && match.onStrikeBatsman) {
			document.querySelector("#score-nav").classList.remove("d-none");
			document.querySelector("#home-rm").classList.remove("d-none");
		}
	});
};

let loadAbout = () => {
	view("about.html", () => {});
};

let loadManual = () => {
	view("manual.html", () => {});
};

let loadScoreBoardAdditional = () => {
	let match = JSON.parse(localStorage.getItem("match"));

	let options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	let date_time = new Date(match.startTime);
	date_time = date_time.toLocaleDateString("en-US", options);
	document.querySelector(
		"#toss-win"
	).innerHTML = `${match.tossWonBy}, chose to ${match.tossDecision} | `;

	let ii = match.runningInnings == 0 ? "1st" : "2nd";
	document.querySelector(
		"#innings-indicator"
	).innerHTML = `${ii} innings running`;
	document.querySelector(
		"#match-heading"
	).innerHTML = `${match.title} <span class="text-dark fw-bold">|</span> ${date_time} <span class="text-dark fw-bold">|</span> ${match.teams[0]} vs ${match.teams[1]} <span class="text-dark fw-bold">|</span> ${match.venue}`;

	loadScore();

	if (
		!match.verdict ||
		(match.verdict &&
			!match.verdict.includes("won") &&
			!match.verdict.includes("tied"))
	) {
		for (yy of document.querySelectorAll(".score-counter")) {
			yy.classList.remove("d-none");
		}
	}
};

let runningMatch = () => {
	if (localStorage.getItem("match") === null) {
		view("details.html", () => {});
	} else {
		match = JSON.parse(localStorage.getItem("match"));
		if (match.onStrikeBatsman) {
			view("play.html", loadScoreBoardAdditional);
		} else if (match.teamLineUp && match.teamLineUp[1].length > 0) {
			view("openers.html", setDomOpeners);
		} else if (match.teamLineUp && match.teamLineUp[0].length > 0) {
			view("lineup_1.html", setDomLineUp, 1);
		} else if (match.tossWonBy) {
			view("lineup_0.html", setDomLineUp, 0);
		} else if (match.title) {
			view("toss.html", setDomToss);
		}
	}
};

let teamFullCard = (track) => {
	view("scorecard.html", loadFullScorecard, track);
};

window.addEventListener("load", () => {
	loadHome();
});
