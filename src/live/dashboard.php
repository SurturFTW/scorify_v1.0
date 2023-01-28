<?php 
ob_start();
include("../../config/connect.php");
$status = get_con();

session_start();

if (!isset($_SESSION['name'])) {
  // redirect if not set
  header("Location:../login.php");
}

$login_session = $_SESSION['name'];

ob_end_flush();
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> Scorify </title>
	<link rel="icon" href="assets/images/logo.png">
	<link rel="stylesheet" href="../css/style.css">
	<link rel="stylesheet" href="assets/live.css">

</head>

<body>
	<link rel="stylesheet" href="../css/home.css">
	<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light px-3 shadow shadow-lg">
		<a class="navbar-brand" href="javascript:void(0)" onclick="loadHome()">
			<span class="fw-bold">
				<img src="assets/images/logo.png" width="40" height="40" alt="">
				Scorify
			</span>
		</a>
		<a href="javascript:void(0)" class="h5 d-block d-lg-none" data-bs-toggle="collapse"
			data-bs-target="#nbcollapse">
			<img src="assets/images/toggler.png" width="25" height="25" alt="">
		</a>

		<div class="collapse navbar-collapse" id="nbcollapse">
			<ul class="navbar-nav my-2 my-lg-0">
				<li class="nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 rounded-pill">
					<a class="nav-link active rounded-pill text-primary" aria-current="page" href="javascript:void(0)"
						onclick="newMatch()">
						<span>
							<img src="assets/images/new-match.png" width="35" height="35" alt="">
						</span>
						<span> New match</span>
					</a>
				</li>
				<li id="running-match-nav"
					class="d-none nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 rounded-pill">
					<a class="nav-link active rounded-pill text-success" aria-current="page" href="javascript:void(0)"
						onclick="runningMatch()">
						<span>
							<img src="assets/images/running-match.png" width="35" height="35" alt="">
						</span>
						<span> Running match</span>
					</a>
				</li>
				<li id="score-nav"
					class="d-none nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 pt-lg-1 rounded-pill">
					<a class="nav-link active rounded-pill text-success" aria-current="page" href="javascript:void(0)"
						onclick="teamFullCard(0)">
						<span>
							<img src="assets/images/scoreboard.png" width="25" height="25" alt="">
						</span>
						<span> &nbspFull scorecard</span>
					</a>
				</li>
			</ul>
			<ul class="navbar-nav ms-auto">
				<li class="nav-item mx-1">
					<a class="nav-link active"> Welcome <?php echo $login_session; ?> </a>
				</li>
				<li class="nav-item mx-1">
					<a class="nav-link active" href="../login.php">Sign Out</a>
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-fluid" id="main-container"></div>

	<div class="modal fade" id="error-modal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Error Message</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div id="error-msg"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="new-match-modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Confirmation Message</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					A match is still running, Are you sure want to discard this match and start a new one?
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" id="new-match-btn" data-bs-dismiss="modal">Yes</button>
				</div>
			</div>
		</div>
	</div>

	<footer class="contact-footer">
        <div class="contact-separator"></div>
    </footer>

	<div class="d-flex">
    <footer class="contact-footer1">
        <p class="contact-text2">
			<a href="../index.php"> Scorify </a></p>
			<span class="contact-text3">
            © 2022 Pushkar Sane, All Rights Reserved.
          	</span>
			<div class="contact-icon-group1">
            <a
              href="https://www.twitter.com/SurturG"
              target="_blank"
              rel="noreferrer noopener"
              class="contact-link2"
            >
              <svg viewBox="0 0 950.8571428571428 1024" class="contact-icon08">
                <path
                  d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/pushkar.png"
              target="_blank"
              rel="noreferrer noopener"
              class="contact-link3"
            >
              <svg viewBox="0 0 877.7142857142857 1024" class="contact-icon10">
                <path
                  d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
                ></path>
              </svg>
            </a>
          </div>
        </footer>
		</div>

	<script src="../js/bootstrap.bundle.min.js"></script>
	<script src="../js/route.js"></script>
	<script src="../js/setup.js"></script>
	<script src="../js/scoreboard.js"></script>
	<script src="../js/run.js"></script>
	<script src="../js/wicket.js"></script>
	<script src="../js/run_out.js"></script>
	<script src="../js/wide_ball.js"></script>
	<script src="../js/no_ball.js"></script>

	<script data-section-id="navbar" src="https://unpkg.com/@teleporthq/teleport-custom-scripts"></script>

</body>
</html>