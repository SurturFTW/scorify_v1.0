let noBallModal = () => {
	// init
	document.querySelector("#runsTaken_nb").value = 0;
	document.querySelector("#nb_runs_from_div").classList.add("d-none");
	document.querySelector("#isRunOut").checked = false;
	document.querySelector("#nb_who_got_out_div").classList.add("d-none");
	document.querySelector("#nb_on_which_end_div").classList.add("d-none");
	document.querySelector("#nb_run_out_by").classList.add("d-none");

	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;
	new bootstrap.Modal(document.querySelector("#no-ball")).show();
	document
		.querySelector("#runsTaken_nb")
		.addEventListener("change", function () {
			if (this.value > 0) {
				document.querySelector("#nb_runs_from_div").classList.remove("d-none");
			} else {
				document.querySelector("#nb_runs_from_div").classList.add("d-none");
			}
		});

	document.querySelector("#isRunOut").addEventListener("change", function () {
		if (this.checked) {
			document.querySelector("#nb_who_got_out_div").classList.remove("d-none");
			document.querySelector("#nb_on_which_end_div").classList.remove("d-none");
			document.querySelector("#nb_run_out_by").classList.remove("d-none");

			let elevenOption = "";
			elevenOption += `<option value="${match.onStrikeBatsman}">${match.onStrikeBatsman}</option>`;
			elevenOption += `<option value="${match.nonStrikeBatsman}">${match.nonStrikeBatsman}</option>`;
			document.querySelector("#whoGotOutOption_nb").innerHTML = elevenOption;

			elevenOption = "";
			match.teamLineUp[1 - track].forEach((e) => {
				elevenOption += `<option value="${e.name}">${e.name}</option>`;
			});
			document.querySelector("#runOutByOption_nb").innerHTML = elevenOption;
		} else {
			document.querySelector("#nb_who_got_out_div").classList.add("d-none");
			document.querySelector("#nb_on_which_end_div").classList.add("d-none");
			document.querySelector("#nb_run_out_by").classList.add("d-none");
		}
	});
};

let noBall = () => {
	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;

	let runTaken = parseInt(document.querySelector("#runsTaken_nb").value);
	let runFrom = document.querySelector("#runsFrom_nb").value;

	let batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name == match.onStrikeBowler
	);
	// batting team scoreboard
	match.teamScoreboard[track].totalRunScored++;
	match.teamScoreboard[track].runsFromExtras++;
	match.teamScoreboard[track].curOver.push("0nb");
	// batsman profile
	match.teamLineUp[track][batsmanId].ballFaced++;
	// bowler profile
	match.teamLineUp[1 - track][bowlerId].runGiven++;
	match.teamLineUp[1 - track][bowlerId].noBallGiven++;

	localStorage.setItem("match", JSON.stringify(match));
	loadScore();

	if (runTaken > 0) {
		// batting team scoreboard
		match.teamScoreboard[track].totalRunScored += runTaken;
		match.teamScoreboard[track].curOver.pop();
		match.teamScoreboard[track].curOver.push(runTaken + "nb");
		if (runFrom == "bat") {
			// batsman profile
			match.teamLineUp[track][batsmanId].runScored += runTaken;
		} else {
			// add to extra
			match.teamScoreboard[track].runsFromExtras++;
		}

		// bowler profile
		match.teamLineUp[1 - track][bowlerId].runGiven += runTaken;

		if (runTaken % 2 == 1) {
			[match.onStrikeBatsman, match.nonStrikeBatsman] = [
				match.nonStrikeBatsman,
				match.onStrikeBatsman,
			];
		}

		localStorage.setItem("match", JSON.stringify(match));
		loadScore();
	}

	if (document.querySelector("#isRunOut").checked) {
		if (runTaken % 2 == 1) {
			[match.onStrikeBatsman, match.nonStrikeBatsman] = [
				match.nonStrikeBatsman,
				match.onStrikeBatsman,
			];
		}

		match.lastBatsman = document.querySelector("#whoGotOutOption_nb").value;
		batsmanId = match.teamLineUp[track].findIndex(
			(playerObj) => playerObj.name == match.lastBatsman
		);

		// batting team scoreboard
		match.teamScoreboard[track].wicketFall++;
		match.teamScoreboard[track].curOver.pop();
		match.teamScoreboard[track].curOver.push(1 + runTaken + "nb W");
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
					if (document.querySelector("#onWhichEnd_nb").value == "bowlerEnd") {
						[match.onStrikeBatsman, match.nonStrikeBatsman] = [
							match.nonStrikeBatsman,
							match.onStrikeBatsman,
						];
						match.nonStrikeBatsman = newPickedBatsman;
						let batsmanId = match.teamLineUp[track].findIndex(
							(playerObj) => playerObj.name == newPickedBatsman
						);
						match.teamLineUp[track][batsmanId].hasBatted = true;
						match.teamLineUp[track][batsmanId].status = "not out";
					} else {
						match.onStrikeBatsman = newPickedBatsman;
						let batsmanId = match.teamLineUp[track].findIndex(
							(playerObj) => playerObj.name == newPickedBatsman
						);
						match.teamLineUp[track][batsmanId].hasBatted = true;
						match.teamLineUp[track][batsmanId].status = "not out";
					}
				} else {
					if (document.querySelector("#onWhichEnd_nb").value == "keeperEnd") {
						[match.onStrikeBatsman, match.nonStrikeBatsman] = [
							match.nonStrikeBatsman,
							match.onStrikeBatsman,
						];
						match.onStrikeBatsman = newPickedBatsman;
						let batsmanId = match.teamLineUp[track].findIndex(
							(playerObj) => playerObj.name == newPickedBatsman
						);
						match.teamLineUp[track][batsmanId].hasBatted = true;
						match.teamLineUp[track][batsmanId].status = "not out";
					} else {
						match.nonStrikeBatsman = newPickedBatsman;
						let batsmanId = match.teamLineUp[track].findIndex(
							(playerObj) => playerObj.name == newPickedBatsman
						);
						match.teamLineUp[track][batsmanId].hasBatted = true;
						match.teamLineUp[track][batsmanId].status = "not out";
					}
				}

				localStorage.setItem("match", JSON.stringify(match));
				loadScore();
			});
		}
	}
};
