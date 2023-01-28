// DOM manupulations after loading the view
let setDomToss = () => {
	let match = JSON.parse(localStorage.getItem("match"));

	let teams = `<option value="${match.teams[0]}">${match.teams[0]}</option>
               <option value="${match.teams[1]}">${match.teams[1]}</option>`;
	document.querySelector("#teamNames").innerHTML = teams;

	let overOptions = "";
	for (let i = 1; i <= 50; i++) {
		overOptions += `<option value="${i}">${i}</option>`;
		document.querySelector("#overs").innerHTML = overOptions;
	}

	let playerOptions = "";
	for (let i = 3; i <= 11; i++) {
		playerOptions += `<option value="${i}">${i}</option>`;
		document.querySelector("#players").innerHTML = playerOptions;
	}
};

let setDomLineUp = (track) => {
	let match = JSON.parse(localStorage.getItem("match"));

	let playerNameOption = `<p class="mt-3 h4 text-center text-success">${match.teams[track]}</p>`;
	for (let i = 0; i < match.noOfPlayers; i++) {
		playerNameOption += `<div class="row my-3">
			<div class="col-12 col-lg-8">
				<input type="text" id="name_team${track}-${
			i + 1
		}" class="form-control bg-dark text-white">
			</div>`;
		playerNameOption += `<div class="col-12 col-lg-4">
				<select id="role_team${track}-${i + 1}" class="form-select form-select-sm">
					<option value="bat">Batsman</option>
					<option value="bowl">Bowler</option>
					<option value="all_r">All-rounder</option>
					<option value="wk">Wicketkeeper</option>
				</select>
			</div>
		</div>`;
	}

	if (track == 0) {
		document.querySelector("#teamOnePlayers").innerHTML = playerNameOption;
	} else {
		document.querySelector("#teamTwoPlayers").innerHTML = playerNameOption;
	}
};

let setDomOpeners = () => {
	let match = JSON.parse(localStorage.getItem("match"));

	// Opener batsman
	let track = match.batting == match.teams[0] ? 0 : 1;
	let elevenOneOption = "";
	let pc = 0;
	match.teamLineUp[track].forEach((e) => {
		elevenOneOption += `<option value="${e.name}">${e.name}</option>`;
	});
	document.querySelector("#onStrike").innerHTML = elevenOneOption;

	elevenOneOption = "";
	match.teamLineUp[track].forEach((e) => {
		pc++;
		if (pc == 2) {
			elevenOneOption += `<option value="${e.name}" selected>${e.name}</option>`;
		} else {
			elevenOneOption += `<option value="${e.name}">${e.name}</option>`;
		}
	});
	document.querySelector("#nonStrike").innerHTML = elevenOneOption;

	// Bowler on-strike
	pc = 0;
	elevenOneOption = "";
	match.teamLineUp[1 - track].forEach((e) => {
		pc++;
		if (pc == parseInt(match.noOfPlayers)) {
			elevenOneOption += `<option value="${e.name}" selected>${e.name}</option>`;
		} else {
			elevenOneOption += `<option value="${e.name}">${e.name}</option>`;
		}
	});
	document.querySelector("#onStrikeBowler").innerHTML = elevenOneOption;
};

// set values to localstorage
let matchDetailsSetup = () => {
	// initialization
	localStorage.clear();

	let title = document.querySelector("#matchTitle").value;
	let teamOne = document.querySelector("#teamOne").value;
	let teamTwo = document.querySelector("#teamTwo").value;
	let venue = document.querySelector("#venue").value;
	let startTime = document.querySelector("#startTime").value;

	if (title == "") {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Match title can't be empty!";
		return;
	} else if (teamOne == "" || teamTwo == "") {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Team name can't be empty!";
		return;
	} else if (teamOne == teamTwo) {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Team name can't be the same!";
		return;
	} else if (venue == "") {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Match venue can't be empty!";
		return;
	} else if (startTime == "") {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Match start time can't be empty!";
		return;
	}

	match = {
		title: title.trim(),
		teams: [teamOne.trim(), teamTwo.trim()],
		venue: venue.trim(),
		startTime: startTime.trim(),
	};

	localStorage.setItem("match", JSON.stringify(match));
	view("toss.html", setDomToss);

	document.querySelector("#running-match-nav").classList.remove("d-none");
};

let tossOverAndPlay = () => {
	let match = JSON.parse(localStorage.getItem("match"));

	match.tossWonBy = document.querySelector("#teamNames").value;
	match.tossDecision = document.querySelector("#tossDecision").value;

	if (match.tossWonBy == match.teams[0]) {
		match.tossLostBy = match.teams[1];
	} else {
		match.tossLostBy = match.teams[0];
	}

	if (match.tossDecision == "bat") {
		match.batting = match.tossWonBy;
		match.fielding = match.tossLostBy;
		match.firstBat = match.tossWonBy;
		match.secondBat = match.tossLostBy;
	} else {
		match.batting = match.tossLostBy;
		match.fielding = match.tossWonBy;
		match.firstBat = match.tossLostBy;
		match.secondBat = match.tossWonBy;
	}
	match.noOfOvers = document.querySelector("#overs").value;
	match.noOfPlayers = document.querySelector("#players").value;

	match.teamLineUp = [[], []];
	match.teamScoreboard = [[], []];

	localStorage.setItem("match", JSON.stringify(match));
	view("lineup_0.html", setDomLineUp, 0);
};

let lineUpSetup = (track) => {
	let match = JSON.parse(localStorage.getItem("match"));

	for (let i = 0; i < match.noOfPlayers; i++) {
		if (document.querySelector(`#name_team${track}-${i + 1}`).value == "") {
			new bootstrap.Modal(document.querySelector("#error-modal")).show();
			document.querySelector("#error-msg").innerHTML = "Empty field";
			return;
		}
	}

	for (let i = 0; i < match.noOfPlayers; i++) {
		match.teamLineUp[track].push({
			name: document.querySelector(`#name_team${track}-${i + 1}`).value,
			role: document.querySelector(`#role_team${track}-${i + 1}`).value,
			hasBatted: false,
			batPosition: 12,
			status: "yet to bat",
			gotOut: false,
			gotRetiredHurt: false,
			runScored: 0,
			ballFaced: 0,
			ballDotted: 0,
			fourHitted: 0,
			sixHitted: 0,
			hasBowled: false,
			bowlPosition: 12,
			ballBowled: 0,
			runGiven: 0,
			dotGiven: 0,
			maidenGiven: 0,
			fourConsidered: 0,
			sixConsidered: 0,
			wideGiven: 0,
			noBallGiven: 0,
			wicketTaken: 0,
		});
	}

	match.teamScoreboard[track] = {
		runsFromBat: 0,
		runsFromExtras: 0,
		totalRunScored: 0,
		retiredHurt: 0,
		wicketFall: 0,
		ballsPlayed: 0,
		curOver: [],
	};
	match.runningInnings = 0;

	localStorage.setItem("match", JSON.stringify(match));
	if (track == 0) {
		view("lineup_1.html", setDomLineUp, 1);
	} else {
		view("openers.html", setDomOpeners);
	}
};

let openersSetup = () => {
	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;

	let onStrikeBatsman = document.querySelector("#onStrike").value;
	let nonStrikeBatsman = document.querySelector("#nonStrike").value;
	let onStrikeBowler = document.querySelector("#onStrikeBowler").value;

	if (onStrikeBatsman == nonStrikeBatsman) {
		new bootstrap.Modal(document.querySelector("#error-modal")).show();
		document.querySelector("#error-msg").innerHTML =
			"Choose different batsmen for both ends";
		return;
	}

	match.onStrikeBatsman = onStrikeBatsman;
	match.nonStrikeBatsman = nonStrikeBatsman;
	match.onStrikeBowler = onStrikeBowler;

	let batsmanId1 = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBatsman
	);
	let batsmanId2 = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name == match.nonStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBowler
	);

	match.teamLineUp[track][batsmanId1].hasBatted = true;
	match.teamLineUp[track][batsmanId1].batPosition = 1;
	match.teamLineUp[track][batsmanId1].status = "not out";

	match.teamLineUp[track][batsmanId2].hasBatted = true;
	match.teamLineUp[track][batsmanId2].batPosition = 2;
	match.teamLineUp[track][batsmanId2].status = "not out";
	match.teamScoreboard[track].noOfBatsmanBatted = 2;

	match.teamLineUp[1 - track][bowlerId].hasBowled = true;
	match.teamLineUp[1 - track][bowlerId].bowlPosition = 1;
	match.teamScoreboard[1 - track].noOfBowlerBowled = 1;

	document.querySelector("#score-nav").classList.remove("d-none");

	localStorage.setItem("match", JSON.stringify(match));
	document.querySelector(
		"#main-container"
	).innerHTML = `<div class="m-5 fw-bold">Processing...</div>`;
	view("play.html", loadScoreBoardAdditional);
	setTimeout(() => {
		if (
			document
				.querySelectorAll(".score-counter")[0]
				.classList.contains("d-none")
		) {
			for (yy of document.querySelectorAll(".score-counter")) {
				yy.classList.remove("d-none");
			}
		}
	}, 1000);
};

let newMatch = () => {
	let match = JSON.parse(localStorage.getItem("match"));
	if (!match) {
		// no match running, go to match details setup
		view("details.html", () => {});
		return;
	}
	// a match is already running, so confirm before start a new one
	new bootstrap.Modal(document.querySelector("#new-match-modal")).show();
	document.querySelector("#new-match-btn").addEventListener("click", () => {
		localStorage.clear();
		view("details.html", () => {});

		document.querySelector("#running-match-nav").classList.add("d-none");
		document.querySelector("#score-nav").classList.add("d-none");
	});
};

let showHideRuns = () => {
	document.querySelector("#fiveRun").classList.toggle("d-none");
	document.querySelector("#sevenRun").classList.toggle("d-none");
};
