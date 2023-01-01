function overRidePlayerScore(player){
	if(player === "player1"){
		 updatedScore = document.getElementById("p1Score").value;
		 document.getElementById("player1").innerHTML = updatedScore;
		 document.getElementById("p1Score").value="0";
		 toggleId="playerOverrideDiv";
	}
	else if(player === "player2"){
			 updatedScore = document.getElementById("p2Score").value;
		 document.getElementById("player2").innerHTML = updatedScore;
		 toggleId="playerOverrideDiv2";
		 document.getElementById("p2Score").value="0";
	}
	if (playersScoreMap.hasOwnProperty(player)) playersScoreMap[player] = updatedScore;
	toggle(toggleId);
	document.getElementById("notify").innerHTML = "Batsman score overridden!";
}
function retirePlayer(player){
	if(player === "player1"){
		document.getElementById("strike1").checked = true;
		 toggleId="playerOverrideDiv";
	}
	else if(player === "player2"){
			document.getElementById("strike2").checked = true;
			 toggleId="playerOverrideDiv2";
	}
	changePlayer();
	toggle(toggleId);
	document.getElementById("notify").innerHTML = "Retired! Ensure who is on batting strike!";
}

function setTarget() {
	targetScore = document.getElementById("targetScore").value;
	targetBalls = document.getElementById("targetScore").value;
	if (targetScore > 0 && targetBalls != 0) {
		targetBalls = countBalls(document.getElementById("targetOvers").value);
		curScore = document.getElementById("totScore").innerHTML;
		reqRuns = targetScore - document.getElementById("totScore").innerHTML;
		ballsBowled = countBalls(document.getElementById("overNum").innerHTML);
		remBalls = targetBalls - ballsBowled;
		localStorage.setItem("targetScore", targetScore);
		localStorage.setItem("targetOvers", document.getElementById("targetOvers").value);
		document.getElementById("targetBoard").innerHTML = reqRuns + " runs required of " + remBalls + " balls";
		if (reqRuns <= 0) {
			document.getElementById("notify").innerHTML = "End of the match! Chasing Team won!";
		} else if (remBalls <= 0) {
			document.getElementById("notify").innerHTML = "End of the match! Defending Team won!";
		} 
	}
}

function countBalls(curOver) {
	var decimalDot = curOver.lastIndexOf(".");
	if (decimalDot == -1) {
		decimal = 0;
		balls = curOver * 6;
	} else {
		decimal = curOver.substring(decimalDot + 1, curOver.length);
		balls = curOver.substring(0, decimalDot) * 6;
	}
	totalBalls = (balls * 1) + (decimal * 1);
	return totalBalls;
}

function toggle(divId) {
	var div = document.getElementById(divId);
	if (div.style.display === "none") {
		div.style.display = "block";
	} else {
		div.style.display = "none";
	}
}

function editBatsMenScore() {
	toggle("editScores");
	document.getElementById("scoreArea").value = document.getElementById("BatsMenStore").innerHTML;
}

function UpdateBatsMenScore() {
	document.getElementById("BatsMenStore").innerHTML = document.getElementById("scoreArea").value;
	toggle("editScores");
}

var playersScoreMap = {};

function isSyncOn() {
	var checkBox = document.getElementById("syncFlagId");
	return checkBox.checked;
}

function doesWideCount() {
	var checkBox = document.getElementById("wideFlagId");
	return checkBox.checked;
}

function doesNoBallCount() {
	var checkBox = document.getElementById("noBallFlagId");
	return checkBox.checked;
}

function viewLinkCopy() {
	var url = "http://www.learnmodeon.com/cricket/view.php?inningsIdForm=" + document.getElementById("inningsIdForm").value;
	var textarea;
	var result;
	try {
		textarea = document.createElement('textarea');
		textarea.setAttribute('readonly', true);
		textarea.setAttribute('contenteditable', true);
		textarea.style.position = 'fixed';
		textarea.value = url;

		document.body.appendChild(textarea);

		//textarea.focus();
		textarea.select();

		const range = document.createRange();
		range.selectNodeContents(textarea);

		const sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);

		textarea.setSelectionRange(0, textarea.value.length);
		result = document.execCommand('copy');
	} catch (err) {
		console.error(err);
		result = null;
	} finally {
		document.body.removeChild(textarea);
	}
	document.getElementById("notify").innerHTML = "Link copied to clipboard!";
}

function pushData() {
	document.getElementById("score").value = document.getElementById("totScore").innerHTML;
	document.getElementById("overs").value = document.getElementById("overNum").innerHTML;
	document.getElementById("ballByBalls2").value = document.getElementById("ballByBall").innerHTML;
	document.getElementById("inningsIdFormForm").value = document.getElementById("inningsIdForm").value;
	document.getElementById("wktsdb").value = document.getElementById("wikts").innerHTML;
	document.getElementById("crrdb").value = document.getElementById("runRate").innerHTML;
	batsMenScore = "<tr><td>"+document.getElementById("player1Name").value+"*</td><td>"+document.getElementById("player1").innerHTML+"</td></tr>"+"<tr><td>"+document.getElementById("player2Name").value+"*</td><td>"+document.getElementById("player2").innerHTML+"</td></tr>"+document.getElementById("BatsMenStore").innerHTML;
	document.getElementById("bmScoresdb").value=batsMenScore;
	document.getElementById("pushData").submit();
}

function generateRandomId() {
	var milliseconds = (new Date).getTime();
	return milliseconds + Math.floor(Math.random() * 9999999999);
}

function startIng1() {
	clearStorage();
	startOver();
	document.getElementById("inningsIdForm").value = generateRandomId();
	localStorage.setItem("inningsIdForm1", document.getElementById("inningsIdForm").value);
}

function startOver() {
	document.getElementById("ballByBall").innerHTML = "[1] : ";
	document.getElementById("overNum").innerHTML = "0";
	document.getElementById("curOver").innerHTML = "0";
	document.getElementById("totScore").innerHTML = document.getElementById("initScore").value;
	document.getElementById("inningsIdForm").value = "";
	document.getElementById("runRate").innerHTML = "0.00";
	document.getElementById("wikts").innerHTML = "0";
	document.getElementById("nbExtras").value = "0";
	document.getElementById("wkRuns").value = "0";
	document.getElementById("wideFlagId").checked = true;
	document.getElementById("noBallFlagId").checked = true;
	document.getElementById("syncFlagId").checked = false;
	document.getElementById("player1Name").value = "player1";
	document.getElementById("player1").innerHTML = "0";
	document.getElementById("player2Name").value = "player2";
	document.getElementById("player2").innerHTML = "0";
	document.getElementById("BatsMenStore").innerHTML = "";
	document.getElementById("targetBoard").innerHTML = "";
	document.getElementById("targetScore").value = "0";
	document.getElementById("targetOvers").value = "0";
	playersScoreMap = {};
	document.getElementById("notify").innerHTML = "Innings1 Started!";
}

function saveIng() {
	if (localStorage.getItem("inningsIdForm1") == null) {
		alert("Please click on start to begin the innings!");
		clearStorage();
		document.getElementById("notify").innerHTML = "Please start an innings!";
	} else {
		saveIng1();
	}
}

function initScript() {
	if (localStorage.getItem("inningsIdForm1") != null) {
		loadIng1();
	} else {
		alert("Please click on start to beging the innings!");
		document.getElementById("notify").innerHTML = "Please start an innings!";
	}
}

function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

function loadIng1() {
	document.getElementById("inningsIdForm").value = localStorage.getItem("inningsIdForm1");
	if (localStorage.getItem("totScore1") != null) {
		document.getElementById("ballByBall").innerHTML = localStorage.getItem("ballByBall1");
		document.getElementById("overNum").innerHTML = localStorage.getItem("overNum1");
		document.getElementById("curOver").innerHTML = localStorage.getItem("curOver1");
		document.getElementById("totScore").innerHTML = localStorage.getItem("totScore1");
		document.getElementById("wikts").innerHTML = localStorage.getItem("wickets");
		document.getElementById("runRate").innerHTML = localStorage.getItem("crr");
		document.getElementById("wideFlagId").checked = (localStorage.getItem("wdFlag") == 'true');
		document.getElementById("noBallFlagId").checked = (localStorage.getItem("nbFlag") == 'true');
		document.getElementById("syncFlagId").checked = (localStorage.getItem("syncFlag") == 'true');
		document.getElementById("BatsMenStore").innerHTML = localStorage.getItem("outIndScore");
		document.getElementById("player1").innerHTML = localStorage.getItem("player1");
		document.getElementById("player2").innerHTML = localStorage.getItem("player2");
		playersScoreMap["player1"] = localStorage.getItem("player1");
		playersScoreMap["player2"] = localStorage.getItem("player2");
		if ((localStorage.getItem("targetOvers") === null) || (localStorage.getItem("targetScore") === null)) {
			//do nothing
		} else {
			document.getElementById("targetOvers").value = localStorage.getItem("targetOvers");
			document.getElementById("targetScore").value = localStorage.getItem("targetScore");
			setTarget();
		}
		document.getElementById("notify").innerHTML = " Innings 1 Score Retrieved!";

	} else {
		document.getElementById("notify").innerHTML = "No Storage found for innings1!"
	}
}


function getShareText() {
	var score = document.getElementById("totScore").innerHTML;
	var overs = document.getElementById("overNum").innerHTML;
	var bByb = document.getElementById("ballByBall").innerHTML;
	bByb = bByb.replace(/<br>/g, '\r\n');
	var msg = "*[Cricket Score Card] -* " + getDate() + "\r\n\r\n*Total Score :* " + score + "\r\n*Overs :* " + overs + "\r\n*Ball By Ball :*\r\n" + bByb;
	var uri = "whatsapp://send?text=" + msg;
	location.href = encodeURI(uri);
	return true;
}

function shareUrl() {
	var url = "http://www.learnmodeon.com/cricket/view.php?inningsIdForm=" + document.getElementById("inningsIdForm").value;
	var uri = "whatsapp://send?text=" + url;
	//var uri = "https://wa.me/?text="+url;
	location.href = encodeURI(uri);
	return true;
}

String.prototype.count = function (s1) {
	return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
}

function updateWickets(ballByBall) {
	var wkts = ballByBall.count('Wkt');
	document.getElementById("wikts").innerHTML = wkts;
}

function getStrikerId() {
	if (document.getElementById("strike2").checked)
		return document.getElementById("strike2").value;
	else return document.getElementById("strike1").value;

}

function changeStrike() {
	if (document.getElementById("strike2").checked) {
		document.getElementById("strike2").checked = false;
		document.getElementById("strike1").checked = true;
	} else {
		document.getElementById("strike2").checked = true;
		document.getElementById("strike1").checked = false;
	}
}

function UpdatePlayerScores(runs) {
	var striker = getStrikerId();
	if (!playersScoreMap.hasOwnProperty(striker)) playersScoreMap[striker] = 0;
	playersScoreMap[striker] = (playersScoreMap[striker] * 1) + (runs * 1);
	//document.getElementById('batsmenboard').innerHTML = playerScores;
	document.getElementById(striker).innerHTML = playersScoreMap[striker];
	//document.getElementById('player2').innerHTML = playersScoreMap['player2'];
}

function changePlayer() {
	var striker = getStrikerId();
	var playerName = 'Player';
	if (striker == 'player1') {
		playerName = document.getElementById("player1Name").value;
		document.getElementById("player1Name").value = "player1";
	} else if (striker == 'player2') {
		playerName = document.getElementById("player2Name").value;
		document.getElementById("player2Name").value = "player2";
	}
	var outBatsmenList = document.getElementById("BatsMenStore").innerHTML;
	outBatsmenList = outBatsmenList + '<tr><td>' + playerName + '</td><td>' + document.getElementById(striker).innerHTML + '</td></tr>';
	document.getElementById("BatsMenStore").innerHTML = outBatsmenList;
	playersScoreMap[striker] = 0;
	document.getElementById(striker).innerHTML = 0;
}

function handleOver(runs) {
	var ballByBall = document.getElementById("ballByBall").innerHTML;

	if (runs == 1 || runs == 3) {
		UpdatePlayerScores(runs);
		changeStrike();
	} else if (runs == 2 || runs == 4 || runs == 6) {
		UpdatePlayerScores(runs);
	}
	if (runs === "Nb") {
		var xtras = document.getElementById("nbExtras").value;
		ballByBall = ballByBall + (runs + xtras + ",");
		if (doesNoBallCount()) {
			runs = 1 + (+xtras);
		} else {
			runs = 0;
		}
		/*if(xtras ==1 || xtras == 3){
			UpdatePlayerScores(xtras);
			changeStrike();
		}else if (xtras == 2 || xtras == 4 || xtras == 6) {
			UpdatePlayerScores(xtras);
		}*/
	} else if (runs == "Wd") {
		ballByBall = ballByBall + runs + ",";
		if (doesWideCount()) {
			runs = 1
		} else {
			runs = 0
		};
	} else if (runs === "Wkt") {
		var wRuns = document.getElementById("wkRuns").value;
		ballByBall = ballByBall + runs + wRuns + "|";
		runs = 0 + (+wRuns);
		updateWickets(ballByBall);
		changePlayer();
	} else {
		ballByBall = ballByBall + runs + "|";
	}
	var curOver = document.getElementById("curOver").innerHTML;
	var totScore = document.getElementById("totScore").innerHTML;
	curOver = (+curOver) + (+runs);
	var thisover = ballByBall.substring(ballByBall.lastIndexOf(":") + 1, );
	document.getElementById("overNum").innerHTML = (ballByBall.split(":").length - 2) + "." + (thisover.split("|").length - 1) % 6;
	document.getElementById("curOver").innerHTML = curOver.toString();
	totScore = (+totScore) + (+runs);
	document.getElementById("totScore").innerHTML = totScore.toString();
	document.getElementById("ballByBall").innerHTML = ballByBall;
	document.getElementById("notify").innerHTML = "This Over:" + thisover;

	if ((thisover.split("|").length - 1) == 6) {
		nextOver();
	}
	calcRunRate();
	document.getElementById("nbExtras").value = 0;
	document.getElementById("wkRuns").value = 0;
	setTarget();
	saveIng();
}

function nextOver() {
	alert("Over Complete!");
	var curOverNum = document.getElementById("overNum").innerHTML;
	document.getElementById("notify").innerHTML = "curOverNum:" + curOverNum;
	ballByBall = document.getElementById("ballByBall").innerHTML;
	var curOver = document.getElementById("curOver").innerHTML;
	nxtOver = Math.floor(curOverNum) + 1;
	document.getElementById("overNum").innerHTML = (nxtOver).toString();
	document.getElementById("ballByBall").innerHTML = ballByBall + "=" + curOver + "<br>[" + (nxtOver + 1) + "] : ";
	document.getElementById("curOver").innerHTML = "0";
	saveIng();
	calcRunRate();
	changeStrike();
	if (isSyncOn()) {
		pushData();
	}
	document.getElementById("notify").innerHTML = (+nxtOver) + " overs completed!";
	return false;
}

function undoLastBall() {

	if (document.getElementById("overNum").innerHTML < 0.1 && document.getElementById("totScore").innerHTML <= 0) {
		alert("Not Valid Request! Click on start innings!");
		document.getElementById("notify").innerHTML = "Please click on start innings!";
		return;
	}
	var ballByBallStr = document.getElementById("ballByBall").innerHTML;
	var lastPipeIdx = ballByBallStr.lastIndexOf("|");
	var lastCommaIdx = ballByBallStr.lastIndexOf(",");
	var endSymbolIdx = -1;
	var startSymbolIdx = -1;
	var endScoreIdx = -1;
	if (lastPipeIdx > lastCommaIdx) {
		endSymbolIdx = lastPipeIdx;
	} else {
		endSymbolIdx = lastCommaIdx;
	}
	var endSymbolIdx1 = endSymbolIdx;
	while (endSymbolIdx1 >= 0) {

		endSymbolIdx1 = endSymbolIdx1 - 1;
		if (ballByBallStr[endSymbolIdx1] === "|") {
			startSymbolIdx = endSymbolIdx1;
			endScoreIdx = startSymbolIdx + 1;
			break;
		} else if (ballByBallStr[endSymbolIdx1] === ",") {
			startSymbolIdx = endSymbolIdx1;
			endScoreIdx = startSymbolIdx + 1;
			break;
		} else if (ballByBallStr[endSymbolIdx1] === " " && ballByBallStr[endSymbolIdx1 - 1] === ":") {
			startSymbolIdx = endSymbolIdx1;
			endScoreIdx = startSymbolIdx;
			break;
		}
	}
	var undoStr = ballByBallStr.slice(startSymbolIdx + 1, endSymbolIdx);
	var overBorderIdx = undoStr.lastIndexOf(":");
	if (overBorderIdx !== -1) {
		undoStr = undoStr.substring(overBorderIdx + 1, undoStr.length);
	}
	var lessScore = calcUndoRuns(undoStr);
	var lessBalls = calcUndoBalls(undoStr);
	undoOperation(lessScore, endScoreIdx, lessBalls);
	saveIng();
	updateWickets(document.getElementById("ballByBall").innerHTML);
	calcRunRate();
	var d = new Date();
	document.getElementById("notify").innerHTML = "Undone last ball at " + d.toLocaleTimeString();
}

function calcUndoRuns(lastScoreStr) {
	var lessScore = 0;
	var len = lastScoreStr.length;
	if (lastScoreStr.startsWith("Wkt") && len > 3) {
		lessScore = lessScore + Number(lastScoreStr.substr(3, len));
	} else if (lastScoreStr.startsWith("Nb") && len > 2) {
		if (doesNoBallCount()) {
			lessScore = lessScore + 1 + Number(lastScoreStr.substr(2, len));
		} else {
			lessScore = 0;
		};
	} else if (lastScoreStr.startsWith("Wd")) {
		if (doesWideCount()) {
			lessScore = lessScore + 1;
		} else {
			lessScore = 0;
		};
	} else {
		lessScore = (lessScore) + Number(lastScoreStr);
	}
	return lessScore;
}

function calcUndoBalls(lastScoreStr) {
	var lessBalls = 0;
	var len = lastScoreStr.length;
	if (lastScoreStr.startsWith("Wkt") && len > 3) {
		lessBalls = 1;
	} else if (lastScoreStr.startsWith("Nb") && len > 2) {
		lessBalls = 0;
	} else if (lastScoreStr.startsWith("Wd")) {
		lessBalls = 0;
	} else {
		lessBalls = 1;
	}
	return lessBalls;
}

function undoOperation(lessScore, startIdx, lessBalls) {
	//undoScore
	var ballByball = document.getElementById("ballByBall").innerHTML;
	document.getElementById("ballByBall").innerHTML = ballByball.substring(0, startIdx);

	//reduce from total Score
	var totScore = document.getElementById("totScore").innerHTML;
	document.getElementById("totScore").innerHTML = totScore - lessScore;

	//reduce from current Over Score
	var curOverScore = document.getElementById("curOver").innerHTML - lessScore;
	document.getElementById("curOver").innerHTML = curOverScore;

	if (lessBalls > 0) {
		var curOver = document.getElementById("overNum").innerHTML;
		var decimalDot = curOver.lastIndexOf(".");
		if (decimalDot == -1) {
			decimal = 0;
		} else {
			decimal = curOver.substring(decimalDot, curOver.length);
		}

		if (decimal == 0) {
			var prevScore = ballByball.slice(ballByball.lastIndexOf("=") + 1, ballByball.lastIndexOf("<"));
			curOver = curOver - 1 + 0.5;
			document.getElementById("curOver").innerHTML = prevScore - lessScore;
		} else {
			curOver = (curOver - 0.1).toFixed(1);
		}
		document.getElementById("overNum").innerHTML = curOver;
	}
}

function calcRunRate() {
	var score = document.getElementById("totScore").innerHTML;
	var overs = document.getElementById("overNum").innerHTML;
	var decimalDot = overs.lastIndexOf(".");
	if (decimalDot > 0) {
		over = overs.substring(0, decimalDot);
		balls = overs.substring(decimalDot + 1, overs.length);
		totalOvers = (over * 1) + (balls / 6);
	} else {
		totalOvers = overs;
	}
	var avg = (score / totalOvers).toFixed(2);
	document.getElementById("runRate").innerHTML = avg;
}

//Innings wise storage
function saveIng1() {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("ballByBall1", document.getElementById("ballByBall").innerHTML);
		localStorage.setItem("overNum1", document.getElementById("overNum").innerHTML);
		localStorage.setItem("curOver1", document.getElementById("curOver").innerHTML);
		localStorage.setItem("totScore1", document.getElementById("totScore").innerHTML);
		localStorage.setItem("inningsIdForm1", document.getElementById("inningsIdForm").value);
		localStorage.setItem("wickets", document.getElementById("wikts").innerHTML);
		localStorage.setItem("crr", document.getElementById("runRate").innerHTML);
		localStorage.setItem("wdFlag", document.getElementById("wideFlagId").checked);
		localStorage.setItem("nbFlag", document.getElementById("noBallFlagId").checked);
		localStorage.setItem("syncFlag", document.getElementById("syncFlagId").checked);
		localStorage.setItem("outIndScore", document.getElementById("BatsMenStore").innerHTML);
		localStorage.setItem("player1", document.getElementById("player1").innerHTML);
		localStorage.setItem("player2", document.getElementById("player2").innerHTML);
		//document.getElementById("notify").innerHTML = "Innings1 data saved!";
	} else {
		document.getElementById("notify").innerHTML = "No Web Storage supported in this browser!";
	}
}

function clearIng1() {
	localStorage.removeItem("ballByBall1");
	localStorage.removeItem("overNum1");
	localStorage.removeItem("curOver1");
	localStorage.removeItem("totScore1");
	localStorage.removeItem("inningsIdForm1");
	localStorage.removeItem("wickets");
	localStorage.removeItem("crr");
	localStorage.removeItem("wdFlag");
	localStorage.removeItem("nbFlag");
	localStorage.removeItem("syncFlag");
	localStorage.removeItem("outIndScore");
	localStorage.removeItem("player1");
	localStorage.removeItem("player2");
	localStorage.removeItem("targetScore");
	localStorage.removeItem("targetOvers");
}

function clearStorage() {
	clearIng1();
	startOver();
	//document.getElementById("ing").innerHTML = "innings1";
	document.getElementById("notify").innerHTML = "All local storage has has been removed!"
}