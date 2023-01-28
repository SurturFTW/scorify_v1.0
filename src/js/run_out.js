let runOutModal = () => {
	// init
	document.querySelector("#runsTaken_r").value = 0;
	document.querySelector("#r_runs_from_div").classList.add("d-none");

	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;
	new bootstrap.Modal(document.querySelector("#run-out")).show();
	document
		.querySelector("#runsTaken_r")
		.addEventListener("change", function () {
			if (this.value > 0) {
				document.querySelector("#r_runs_from_div").classList.remove("d-none");
			} else {
				document.querySelector("#r_runs_from_div").classList.add("d-none");
			}
		});
	let elevenOption = "";
	elevenOption += `<option value="${match.onStrikeBatsman}">${match.onStrikeBatsman}</option>`;
	elevenOption += `<option value="${match.nonStrikeBatsman}">${match.nonStrikeBatsman}</option>`;
	document.querySelector("#whoGotOutOption_r").innerHTML = elevenOption;

	elevenOption = "";
	match.teamLineUp[1 - track].forEach((e) => {
		elevenOption += `<option value="${e.name}">${e.name}</option>`;
	});
	document.querySelector("#runOutByOption_r").innerHTML = elevenOption;
};

let runOut = () => {
	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;

	let runTaken = parseInt(document.querySelector("#runsTaken_r").value);
	let runFrom = document.querySelector("#runsFrom_r").value;

	let batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBowler
	);
	// batting team scoreboard
	match.teamScoreboard[track].ballsPlayed++;
	// batsman profile
	match.teamLineUp[track][batsmanId].hasBatted = true;
	match.teamLineUp[track][batsmanId].ballFaced++;
	// bowler profile
	match.teamLineUp[1 - track][bowlerId].hasBowled = true;
	match.teamLineUp[1 - track][bowlerId].ballBowled++;

	localStorage.setItem("match", JSON.stringify(match));
	loadScore();

	if (runTaken > 0) {
		console.log("taken", runTaken);
		// batting team scoreboard
		match.teamScoreboard[track].totalRunScored += runTaken;

		if (runFrom == "bat") {
			// batsman profile
			match.teamLineUp[track][batsmanId].runScored += runTaken;
		} else {
			// add to extra
			match.teamScoreboard[track].runsFromExtras++;
		}

		// bowler profile
		match.teamLineUp[1 - track][bowlerId].runGiven += runTaken;

		localStorage.setItem("match", JSON.stringify(match));
		loadScore();
	}

	match.lastBatsman = document.querySelector("#whoGotOutOption_r").value;
	console.log(match.lastBatsman);
	batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name == match.lastBatsman
	);

	// batting team scoreboard
	match.teamScoreboard[track].wicketFall++;
	// batsman profile
	match.teamLineUp[track][batsmanId].gotOut = true;

	if (match.teamScoreboard[track].wicketFall + 1 == match.noOfPlayers) {
		// all out
		localStorage.setItem("match", JSON.stringify(match));
		loadScore();
	} else {
		new bootstrap.Modal(document.querySelector("#new-batsman")).show();
		document.querySelector("#batting-modal-message").innerHTML =
			match.lastWicketFallMessage;

		elevenOption = "";
		match.teamLineUp[track].forEach((e) => {
			if (
				!e.gotOut &&
				e.name != match.onStrikeBatsman &&
				e.name != match.nonStrikeBatsman
			) {
				elevenOption += `<option value="${e.name}">${e.name}</option>`;
			}
		});
		document.querySelector("#newBatsman").innerHTML = elevenOption;

		document.querySelector("#setnewBatsman").addEventListener("click", () => {
			let newPickedBatsman = document.querySelector("#newBatsman").value;
			if (match.lastBatsman == match.onStrikeBatsman) {
				if (document.querySelector("#onWhichEnd_r").value == "bowlerEnd") {
					[match.onStrikeBatsman, match.nonStrikeBatsman] = [
						match.nonStrikeBatsman,
						match.onStrikeBatsman,
					];
					match.nonStrikeBatsman = newPickedBatsman;
					let batsmanId = match.teamLineUp[track].findIndex(
						(playerObj) => playerObj.name == match.onStrikeBatsman
					);
					match.teamLineUp[track][batsmanId].hasBatted = true;
					match.teamLineUp[track][batsmanId].status = "not out";
				} else {
					match.onStrikeBatsman = newPickedBatsman;
					let batsmanId = match.teamLineUp[track].findIndex(
						(playerObj) => playerObj.name == match.onStrikeBatsman
					);
					match.teamLineUp[track][batsmanId].hasBatted = true;
					match.teamLineUp[track][batsmanId].status = "not out";
				}
			} else {
				if (document.querySelector("#onWhichEnd_r").value == "keeperEnd") {
					[match.onStrikeBatsman, match.nonStrikeBatsman] = [
						match.nonStrikeBatsman,
						match.onStrikeBatsman,
					];
					match.onStrikeBatsman = newPickedBatsman;
					let batsmanId = match.teamLineUp[track].findIndex(
						(playerObj) => playerObj.name == match.onStrikeBatsman
					);
					match.teamLineUp[track][batsmanId].hasBatted = true;
					match.teamLineUp[track][batsmanId].status = "not out";
				} else {
					match.nonStrikeBatsman = newPickedBatsman;
					let batsmanId = match.teamLineUp[track].findIndex(
						(playerObj) => playerObj.name == match.onStrikeBatsman
					);
					match.teamLineUp[track][batsmanId].hasBatted = true;
					match.teamLineUp[track][batsmanId].status = "not out";
				}
			}

			localStorage.setItem("match", JSON.stringify(match));
			loadScore();
		});
	}
};
