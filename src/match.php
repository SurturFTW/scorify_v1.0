<?php 
ob_start();
include("../config/connect.php");
$status = get_con();

session_start();

if (!isset($_SESSION['name'])) {
  // redirect if not set
  header("Location:../login.php");
}

$login_session = $_SESSION['name'];

ob_end_flush();
?>

<html>
<head>
  <meta charset="UTF-8">
  <meta name="description" content="Score Card for Cricket">
  <meta name="keywords" content="cricket,score,batting,bowling,scorecard,cric,match">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="-1" />
  <meta http-equiv="Content-Language" content="en">
  <title> Live Scoring </title>
  
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/match.css" />

</head>
<body>
   <br>
   <div style="overflow-x:auto;">
      <table border="3px 3px" class="table2" align="center">
         <tr>
            <td><input type="text" id="initScore" placeholder="0" value="0" style="display:none;"/>
            <button class="button" type="button" value="0" onClick="startIng1()">Start</button></td>
            <td><button class="button" type="button" value="0" onClick="clearStorage()">Clear</button></td>
         </tr>
      </table><br>
	   <table id="settingsTbl" border="1px 1px">
         <tr>
            <td><input type="checkbox" id="syncFlagId">Sync</td>
            <td><input type="checkbox" id="wideFlagId" Checked>Wide</td>
            <td><input type="checkbox" id="noBallFlagId" Checked>NoBall</td>
			<td><button id='helpButton' onclick="toggle('helpSection')">Help?</button></td>
         </tr>
      </table>
   </div>
   <table id="playerScoretbl">
      <div id="striking">
         <tr>
            <td><input type="radio" id="strike1" name="strike" value="player1" checked><input type="text" id="player1Name" value="player1"> : <b id="player1"></b>
			<button id='updP1Score' onclick="toggle('playerOverrideDiv')"><b>...</b></button><table id='playerOverrideDiv' style="display:none"><tr><td>
			<button id="p1Retd" onclick="retirePlayer('player1')">Retd.</button></td><td>
			<input type="text" value="0" id="p1Score"><button onclick="overRidePlayerScore('player1')" id="p1Ovrd">Update</button></td></tr></table>
			</td>
            <td><input type="radio" id="strike2" name="strike" value="player2"><input type="text" id="player2Name" value="player2"> : <b id="player2">0</b> 
            <button id='updP2Score' onclick="toggle('playerOverrideDiv2')"><b>...</b></button><table id='playerOverrideDiv2' style="display:none"><tr><td>
			<button id="p2Retd" onclick="retirePlayer('player2')">Retd.</button></td><td>
			<input type="text" value="0" id="p2Score"><button onclick="overRidePlayerScore('player2')" id="p2Ovrd">Update</button></td></tr></table></td>
         </tr>
      </div>
   </table>
   <table border="2px 2px" class="scoreBoard" align="center">
      <tbody>
         <tr>
            <td><b>CurOvr: <i id="curOver">0</i></b></td>
            <td><b id="sboard"><i id="totScore">0</i>/<i id="wikts">0</i></b>(<i id="overNum">0</i> ovrs)</td>
            <td><b>CRR: <i id="runRate">0</i></b></td>
         </tr>
   </table>
   <div style="overflow-x:auto;"><b id="notify">Notifications!</b></div>
   <div style="overflow-x:auto;">
      <table border="1px" align="center" class="scoringTool">
         <tr>
            <td><input type="number" id="nbExtras" value="0" placeholder="0" step=1 min=0/><b>+</b><button class="button" type="button" value="Nb" onClick="handleOver(this.value)">nb</button></td>
            <td><button class="button" type="button" value="0" onClick="handleOver(this.value)">dot</button></td>
            <td><button class="button" type="button" value="1" onClick="handleOver(this.value)">1</button></td>
         </tr>
         <tr>
            <td><input type="number" id="wkRuns" value="0" placeholder="0" step=1 min=0/><b>+</b><button class="button" type="button" value="Wkt" onClick="handleOver(this.value)">wkt</button></td>
            <td><button class="button" type="button" value="2" onClick="handleOver(this.value)">2</button></td>
            <td><button class="button" type="button" value="3" onClick="handleOver(this.value)">3</button></td>
         </tr>
         <tr>
            <td><button class="button" type="button" value="Wd" onClick="handleOver(this.value)">wd</button></td>
            <td><button class="button" type="button" value="4" onClick="handleOver(this.value)">4</button></td>
            <td><button class="button" type="button" value="6" onClick="handleOver(this.value)">6</button></td>
         </tr>
         <tr>
            <!-- <td><button class="button" type="button" value="0" onClick="saveIng()">Save</button></td> 
               <td><a id="wappLink" href="#" data-action="share/whatsapp/share" onClick="getShareText(); return false;"><button class="button" type="button">Share</button></a></td> -->
            <td colspan="3"><button class="button" type="button" value="0" onClick="undoLastBall()" >undo</button>
            <button class="button" type="button" value="0" onClick="nextOver()">nxt over</button>
            <button class="button" type="button" value="0" onClick="pushData()">sync</button></td>
         </tr>
      </table>
   </div>
   <br>
   <table>
      <tr>
         <td id="targetBoard"></td>
      </tr>
   </table>
   <div>
      <table>
         <tr>
            <td><button onclick="toggle('batsMenScoreDiv')" id="softMenu">Batsmen Score</button></td>
            <td><button onclick="toggle('ballByballDiv')" id="softMenu">BallByBall</button></td>
            <td><button onclick="toggle('targetDiv')" id="softMenu">Set Target</button></td>
         </tr>
      </table>
      <table>
         <tr id="targetDiv" style="display:none">
            <td>Target Score:<input type="text" id="targetScore" value="0" /> </td>
            <td>Total Overs:<input type="text" id="targetOvers" value="0" /></td>
            <td><button onclick="setTarget()">Update</button></td>
         </tr>
      </table>
      <table id="batsMensScoreTable" broder="3px 3px">
         <tr id="batsMenScoreDiv" style="display:none">
			<td><table><tbody id="BatsMenStore"></tbody></table></td>
            <td><button onclick="editBatsMenScore()">Edit</button></td>
               <div id="editScores" style="display:none"><textarea id="scoreArea"></textarea>
                  <button onclick="UpdateBatsMenScore()">Update</button>
               </div>
         </tr>
      </table>
      <table border="3px 3px" class="table1" id='ballByballDiv' style="display:none;overflow-x:auto;">
         <tr>
            <td><b>Ball By Ball</b></td>
            <td><i id="ballByBall">[1] : </i></td>
         </tr>
      </table>
   </div>
   
   </div>
   </td></tr></table>
   <hr>
   <div id="syncData" style="display: none;">
     <!--<form  action='update.php'  method='post' id='pushData'> -->
       <form method='post' id='pushData'>
         <input type="text" name="inningsId" id="inningsIdForm"><br>
         <input type="text" name="score" id="score">
         <input type="text" name="overs" id="overs">
         <input type="text" name="ballByBalls" id="ballByBalls2">
         <input type="text" name="wktsdb" id="wktsdb">
         <input type="text" name="crrdb" id="crrdb">
		     <input type="text" name="bmScoresdb" id="bmScoresdb">
         <input type="submit">
      </form>
   </div>

   <script src="./js/match.js"></script>
</body>
</html>