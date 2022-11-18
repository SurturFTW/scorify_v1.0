<!DOCTYPE html>
<html lang="en">
  <head>
    <title>scorify</title>
    <meta property="og:title" content="scorify" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    <meta property="twitter:card" content="summary_large_image" />

    <style data-tag="reset-style-sheet">
      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6,figure,blockquote,figcaption {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button,[type="button"],[type="reset"],[type="submit"] {  -webkit-appearance: button;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}input {  padding: 2px 4px;}img {  display: block;}html { scroll-behavior: smooth  }
    </style>
    <style data-tag="default-style-sheet">
      html {
        font-family: Inter;
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
    <!-- <style> ... </style> -->
    <link rel="stylesheet" href="./src/css/style.css" />
  </head>
  <body>
    <div>
      <link href="./src/css/home.css" rel="stylesheet" />

      <div class="home-container">
        <header data-role="Header" class="home-header">
          <div class="home-nav">
            <p class="home-text">
              <a href="./index.php"> Scorify </a>
            </p>
          </div>
          <nav class="navigation-links-nav navigation-links-root-class-name10">
            <span class="navigation-links-text"><span>
              <a href="./index.php"> Home </a></span></span>
            <span class="navigation-links-text1"><span>
              <a href="./src/about.php"> About </a></span></span>
            <span class="navigation-links-text2"><span>
              <a href="./src/contact.php"> Contact </a></span></span>
          </nav>
          <div class="home-btn-group">
            <button class="home-login button">
              <a href="./src/login.php"> Login </a></button>
            <button class="home-register button">
              <a href="./src/register.php"> Register </a></button>
          </div>
          <div data-role="BurgerMenu" class="home-burger-menu">
            <svg viewBox="0 0 1024 1024" class="home-icon">
              <path
                d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              ></path>
            </svg>
          </div>
          <div data-role="MobileMenu" class="home-mobile-menu">
            <div class="home-nav1">
              <div class="home-container1">
                <span class="home-text01">
                  <a href="./index.php"> Scorify </a></span>
                <div data-role="CloseMobileMenu" class="home-menu-close">
                  <svg viewBox="0 0 1024 1024" class="home-icon02">
                    <path
                      d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                    ></path>
                  </svg>
                </div>
              </div>
              <nav
                class="navigation-links-nav navigation-links-root-class-name11"
              >
                <span class="navigation-links-text"><span>
                  <a href="./index.php"> Home </a></span></span>
                <span class="navigation-links-text1"><span>
                  <a href="./src/about.php"> About </a></span></span>
                <span class="navigation-links-text2"><span>
                  <a href="./src/contact.php"> Contact </a></span></span>
              </nav>
              <div class="home-container2">
                <div class="home-container3">
                  <button class="button home-button">
                    <span class="home-text02">
                      <span> <a href="./src/login.php"> Login </a></span>
                      <br />
                      <br />
                    </span>
                  </button>
                </div>
                <button class="button home-button1">
                <a href="./src/register.php"> Register </a></button>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" class="home-icon04">
                <path
                  d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
                ></path></svg
              ><svg viewBox="0 0 877.7142857142857 1024" class="home-icon06">
                <path
                  d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
                ></path>
              </svg>
            </div>
          </div>
        </header>
        <div class="home-hero">
          <div class="home-container4">
            <h1 class="home-text06">Let's keep things organised</h1>
            <h2 class="home-text07">Magnificent things are very simple.</h2>
            <div class="home-btn-group1">
              <button class="home-button2 button">
                <a href="./src/register.php"> Get Started </a></button>
              <button class="home-button3 button">
                <a href="./src/about.php"> Learn More </a></button>
            </div>
            <span class="home-text08">
              <span>
                "You don't play for the crowd, You Play for the Country."
              </span>
              <br class="home-text10" />
              <br />
              <span>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- MS Dhoni
              </span>
            </span>
          </div>
          <img
            alt="image"
            src="./imgs/dhoni.jpg"
            class="home-image"
          />
        </div>
        <div class="home-banner">
          <div class="home-container5">
            <h1 class="home-text13">
              <span>Be the first to get the latest features</span>
            </h1>
            <span class="home-text15">
              Enter your email below to get alert of updates on our website
            </span><br>

            <form action="index.php" method="POST">
              <?php
                $email = "";
                if(isset($_POST['emailclick'])){
                  $email = $_POST['email'];

                  if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                    $subject = "Thanks For Subscribing 🤘 - Scorify";
                    $message = "Thankyou for subscribing to Scorify. You'll always receive latest updates from us.";
                    $sender = "From: flicks4186@gmail.com";

                    if(mail($email, $subject, $message, $sender)){
                      ?>
                      <div id="subscribed"> ✅ Subscribed Successfully! </div>
                      <?php 
                        $email = "";
                      
                    } else{
                      ?>
                      <div id="not-sub"> ❌ Failed to send mail. </div>
                      <?php
                    }
                  
                  } else{
                      ?>
                      <div id="not-sub">
                        ❌ <?php echo $email?> is not a valid email!
                      </div>
                      <?php 
                  }
                }
              ?>
            <div class="home-container6">
              <input
                type="email"
                placeholder="Email here..."
                class="home-textinput input"
                id="emailval" 
                name="email"
                required
                value=" <?php echo $email?>"
              />
              <button class="home-button4 button" name="emailclick">Subscribe</button>
            </div>
          </div>
          <img
            alt="image"
            src="./imgs/meme1.jpeg"
            class="home-image1"
          />
          </form>
        </div>
        <footer class="home-footer">
          <span class="home-text16">Scorify</span>
          <span class="home-text17">
            © 2022 Pushkar Sane, All Rights Reserved.
          </span>
          <div class="home-icon-group1">
            <a
              href="https://www.twitter.com/SurturG"
              target="_blank"
              rel="noreferrer noopener"
              class="home-link"
            >
              <svg viewBox="0 0 950.8571428571428 1024" class="home-icon08">
                <path
                  d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/pushkar.png"
              target="_blank"
              rel="noreferrer noopener"
              class="home-link1"
            >
              <svg viewBox="0 0 877.7142857142857 1024" class="home-icon10">
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
      data-section-id="header"
      src="https://unpkg.com/@teleporthq/teleport-custom-scripts"
    ></script>
  </body>
</html>
