<?php 
ob_start();
include("../config/connect.php");
$status = get_con();

session_start();
$status = session_status(); //1st measure
if ($status == PHP_SESSION_ACTIVE) {
  //There is  active session
  session_destroy();
}

// if session is already running, it destroys previous session 
// and starts a new if redirected to this page
session_start();

if (isset($_POST['login'])) {
  $username =  $_POST['username'];
  $password = $_POST['password'];

  $con = get_con();
  $sql = "SELECT * FROM `members` WHERE Username = '$username' AND Pass = '$password';";
  $result = mysqli_query($con, $sql);
  $result_user_type = mysqli_fetch_array($result);
  
  $row = mysqli_num_rows($result);

  if ($row > 0) {
    header("Location:./dashboard.php");
    //session set
    $_SESSION['name'] = $result_user_type['Username'];
  }
  else{
    echo"
    <script>
      alert('Invalid username or password.');
    </script>
    ";
  }
  // close connection
  mysqli_close($con);
} 

  // login block ends here  
  // for cheching 
  // echo $status;
  ob_end_flush();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title> Scorify </title>
    <link rel="icon" type="image/x-icon" href="../imgs/vector-logo.png">
    <meta property="og:title" content="Scorify" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    <meta property="twitter:card" content="summary_large_image" />

    <style data-tag="reset-style-sheet">
      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6,figure,blockquote,figcaption {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button,[type="button"],[type="reset"],[type="submit"] {  -webkit-appearance: button;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}input {  padding: 2px 4px;}img {  display: block;}html { scroll-behavior: smooth  }
    </style>
    <style data-tag="default-style-sheet">
      html {
        font-family: Fira Mono;
        font-size: 16px;
      }

      body {
        font-weight: 400;
        font-style:normal;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.15;
        color: var(--dl-color-gray-black);
        background-color: var(--dl-color-gray-white);

      }
    </style>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&amp;display=swap"
      data-tag="font"
    />
    <!--This is the head section-->
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <!-- <style> ... </style> -->
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/login.css" />
  </head>
  <body>
    <div>
      <link href="./css/home.css" rel="stylesheet" />

      <div class="contact-container">
        <header data-role="Header" class="contact-header">
          <p class="contact-text">
            <a href="../index.php"> Scorify </a></p>
          <div class="contact-nav">
            <nav
              class="navigation-links2-nav navigation-links2-root-class-name10"
            >
              <span class="navigation-links2-text"> 
                <a href="../index.php"> Home </a></span>
              <span class="navigation-links2-text1"> 
                <a href="./about.php"> About </a></span>
              <span class="navigation-links2-text2"> 
                <a href="./contact.php"> Contact </a></span>
            </nav>
          </div>
          <div class="contact-btn-group">
            <button class="contact-login button">
              <a href="./login.php"> Login </a></button>
            <button class="contact-register button"> 
              <a href="./register.php"> Register </a></button>
          </div>
          <div data-role="BurgerMenu" class="contact-burger-menu">
            <svg viewBox="0 0 1024 1024" class="contact-icon">
              <path
                d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
          <div data-role="MobileMenu" class="contact-mobile-menu">
            <div class="contact-nav1">
              <div class="contact-container1">
                <span class="contact-text1">
                  <a href="../index.php"> Scorify </a></span>
                <div data-role="CloseMobileMenu" class="contact-menu-close">
                  <svg viewBox="0 0 1024 1024" class="contact-icon02">
                    <path
                      d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                    ></path>
                  </svg>
                </div>
              </div>
              <nav class="navigation-links2-nav navigation-links2-root-class-name11">
                <span class="navigation-links2-text"> 
                  <a href="../index.php"> Home </a> </span>
                <span class="navigation-links2-text1"> 
                  <a href="./about.php"> About </a> </span>
                <span class="navigation-links2-text2"><span>
                  <a href="./contact.php"> Contact </a></span>
                </span>
              </nav>
              <div class="contact-container2">
                <button class="contact-button button">
                  <a href="./src/login.php"> Login </a></button>
                <button class="contact-button1 button">
                  <a href="./src/register.php"> Register </a></button>
              </div>
            </div>
            <div>
              <a
                href="https://www.twitter.com/SurturG"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  viewBox="0 0 950.8571428571428 1024"
                  class="contact-icon04"
                >
                  <path
                    d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pushkar.png"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  class="contact-icon06"
                >
                  <path
                    d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </header>

        
        <div class="container">
          <div class="forms">
            <div class="form login">
                <span class="title"> Login </span>

                <form method="POST">
                    <div class="input-field">
                        <input type="text" id="name" placeholder="Enter your username" name="username" >
                        <i class="uil uil-user"></i>
                    </div>

                    <div class="input-field">
                        <input type="password" class="password" id="password" placeholder="Enter your password" name="password" >
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="login-signup">
                      <span class="text"> <a href="./forgotpass.php"> Forgot Password? </a>
                        <a href="./register.php" class="text signup-link"> Click here to reset</a>
                      </span>
                    </div>

                    <div class="subbutton">
                      <!-- <input type="submit" class="contact-button1 button" name="login" id="submit" value="Login"> -->
                      <button type="submit" class="loginbutton" name="login" id="submit" value="login"> Login </button>
                    </div>
                </form>

                <div class="login-signup">
                  <a href="./register.php" class="text signup-link">Register Now</a>
                    </span>
                </div>
            </div>
          </div>
        </div>

        <footer class="contact-footer">
          <div class="contact-separator"></div>
        </footer>
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
    </div>
    <script
      data-section-id="navbar"
      src="https://unpkg.com/@teleporthq/teleport-custom-scripts"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js"></script>
    <script src="./js/login.js"></script>
    <script src="./js/main.js"></script>
  </body>
</html>
