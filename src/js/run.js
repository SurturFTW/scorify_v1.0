let regularRunsCount = (x) => {
	let runTaken = parseInt(x);
	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;
	runningInnings = match.runningInnings;

	let batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBowler
	);

	// batting team scoreboard
	match.teamScoreboard[track].runsFromBat += runTaken;
	match.teamScoreboard[track].totalRunScored += runTaken;
	match.teamScoreboard[track].ballsPlayed++;
	match.teamScoreboard[track].curOver.push(x);

	// batsman profile
	match.teamLineUp[track][batsmanId].runScored += runTaken;
	match.teamLineUp[track][batsmanId].ballFaced++;

	// bowler profile
	match.teamLineUp[1 - track][bowlerId].ballBowled++;
	match.teamLineUp[1 - track][bowlerId].runGiven += runTaken;

	if (runTaken == 0) {
		match.teamLineUp[track][batsmanId].ballDotted++;
		match.teamLineUp[1 - track][bowlerId].dotGiven++;
	} else if (runTaken == 4) {
		match.teamLineUp[track][batsmanId].fourHitted++;
		match.teamLineUp[1 - track][bowlerId].fourConsidered++;
	} else if (runTaken == 6) {
		match.teamLineUp[track][batsmanId].sixHitted++;
		match.teamLineUp[1 - track][bowlerId].sixConsidered++;
	}

	// change strike
	if (runTaken % 2 == 1) {
		[match.onStrikeBatsman, match.nonStrikeBatsman] = [
			match.nonStrikeBatsman,
			match.onStrikeBatsman,
		];
	}

	localStorage.setItem("match", JSON.stringify(match));
	loadScore();
	overCompletionCheck();
};

let legByeCount = () => {
	let runTaken;
	for (const rb of document.querySelectorAll('input[name="lb_rb"]')) {
		if (rb.checked) {
			runTaken = parseInt(rb.value);
			break;
		}
	}

	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;
	runningInnings = match.runningInnings;

	let batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBowler
	);

	// batting team scoreboard
	match.teamScoreboard[track].runsFromExtras += runTaken;
	match.teamScoreboard[track].totalRunScored += runTaken;
	match.teamScoreboard[track].ballsPlayed++;
	match.teamScoreboard[track].curOver.push(runTaken + "lb");

	// batsman profile
	match.teamLineUp[track][batsmanId].ballFaced++;

	// bowler profile
	match.teamLineUp[1 - track][bowlerId].ballBowled++;
	match.teamLineUp[1 - track][bowlerId].runGiven += runTaken;

	// change strike
	if (runTaken % 2 == 1) {
		[match.onStrikeBatsman, match.nonStrikeBatsman] = [
			match.nonStrikeBatsman,
			match.onStrikeBatsman,
		];
	}

	localStorage.setItem("match", JSON.stringify(match));
	loadScore();
	overCompletionCheck();
};

let byeCount = () => {
	let runTaken;
	for (const rb of document.querySelectorAll('input[name="b_rb"]')) {
		if (rb.checked) {
			typeof rb.checked;
			runTaken = parseInt(rb.value);
			typeof runTaken;
			break;
		}
	}

	let match = JSON.parse(localStorage.getItem("match"));
	let track = match.batting == match.teams[0] ? 0 : 1;
	runningInnings = match.runningInnings;

	let batsmanId = match.teamLineUp[track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBatsman
	);
	let bowlerId = match.teamLineUp[1 - track].findIndex(
		(playerObj) => playerObj.name === match.onStrikeBowler
	);

	// batting team scoreboard
	match.teamScoreboard[track].runsFromExtras += runTaken;
	match.teamScoreboard[track].totalRunScored += runTaken;
	match.teamScoreboard[track].ballsPlayed++;
	match.teamScoreboard[track].curOver.push(runTaken + "b");

	// batsman profile
	match.teamLineUp[track][batsmanId].ballFaced++;

	// bowler profile
	match.teamLineUp[1 - track][bowlerId].ballBowled++;
	match.teamLineUp[1 - track][bowlerId].runGiven += runTaken;

	// change strike
	if (runTaken % 2 == 1) {
		[match.onStrikeBatsman, match.nonStrikeBatsman] = [
			match.nonStrikeBatsman,
			match.onStrikeBatsman,
		];
	}

	localStorage.setItem("match", JSON.stringify(match));
	loadScore();
	overCompletionCheck();
};
