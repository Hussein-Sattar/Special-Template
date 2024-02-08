//selecte the landing Element
let landingPage = document.querySelector(".landing");
//check for color option
let mainColor = localStorage.getItem("color");
if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  //add and remove active class
  document.querySelectorAll(".settings .color-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
//array of background Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let randomBgId; //random background interval ID
function randomImgs(set) {
  if (set) {
    randomBgId = setInterval(() => {
      //get random number
      let randomNum = Math.floor(Math.random() * imgsArray.length);
      //change Backgorund Image url
      landingPage.style.backgroundImage = `url(images/${imgsArray[randomNum]})`;
    }, 10000);
  } else {
    clearInterval(randomBgId);
  }
}
randomImgs(true);

//check for the random background option
let randomBgcheck = localStorage.getItem("randomBg_option");
if (randomBgcheck) {
  if (randomBgcheck === "true") {
    document.getElementsByName("Random")[0].checked = true;
    randomImgs(false);
  } else {
    document.getElementsByName("Random")[0].checked = false;
    randomImgs(true);
  }
}

//====================================

//get the settings menue elements
let settings = document.querySelector(".settings");
let settingsIcon = document.querySelector(".settings .gear");
//open the settings menu
settingsIcon.onclick = function () {
  settings.classList.toggle("open");
  settingsIcon.classList.toggle("fa-spin");
  if (settings.classList.contains("open")) {
    sessionStorage.setItem("open_menu", "open");
  } else sessionStorage.removeItem("open_menu");
};
//sesstion storage check
if (sessionStorage.getItem("open_menu")) {
  settings.classList.add("open");
  settingsIcon.classList.add("fa-spin");
}

//switch colors

// let colorLi = document.querySelectorAll(".settings .color-list li");
// colorLi.forEach((li) => {
//     li.addEventListener("click", (e) => {
//         //changing the main color
//         document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
//         // save the color in the local storage
//         localStorage.setItem("color", e.target.dataset.color)
//         //remove and add active class to clicked element
//         colorLi.forEach((li) => {
//             li.classList.remove("active")
//         })
//         e.target.classList.add("active");
//     })
// })

let colorLi = document.querySelectorAll(".settings .color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //changing the main color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // save the color in the local storage
    localStorage.setItem("color", e.target.dataset.color);
    //remove and add active class to clicked element
    e.target.parentElement.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  });
});

// Random background option
let randomOpt = document.getElementsByName("Random")[0];
randomOpt.onchange = function () {
  if (randomOpt.checked) {
    //turn off the random background
    randomImgs(false);
    localStorage.setItem("randomBg_option", randomOpt.checked);
  } else {
    randomImgs(true);
    localStorage.setItem("randomBg_option", randomOpt.checked);
  }
};

// create popUp image
let images = document.querySelectorAll(".gallary img");
images.forEach((img) => {
  img.addEventListener("click", (e) => {
    // creat and add the overlay
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.append(overLay);

    // create the popUp box and the image
    let popUpBox = document.createElement("div");
    popUpBox.className = "popup-box";

    let popUpImage = document.createElement("img");
    popUpImage.src = img.src;

    popUpBox.append(popUpImage);
    overLay.append(popUpBox);

    if (img.alt) {
      let imgHeading = document.createElement("h3");
      imgHeading.innerHTML = img.alt;
      popUpBox.append(imgHeading);
    }

    // create close button
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "X";
    closeBtn.className = "close-button";
    popUpBox.append(closeBtn);
  });
});

// close the popUp
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    document.querySelector(".popup-box").remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// navigatate to a section

function navigateTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

let links = document.querySelectorAll(".links a");
let bullets = document.querySelectorAll(".nav-bullets .bullet");

navigateTo(links);
navigateTo(bullets);

// Show/Hide Navigation bullets
let showHideOpt = document.getElementsByName("Show")[0];
let bulletsOps = document.querySelector(".nav-bullets");

showHideOpt.onchange = function () {
  if (showHideOpt.checked) {
    //Hide The bullets
    localStorage.setItem("showHide_option", showHideOpt.checked);
    bulletsOps.style.display = "none";
  } else {
    //Show The bullets
    localStorage.setItem("showHide_option", showHideOpt.checked);
    bulletsOps.style.display = "block";
  }
};

if (localStorage.getItem("showHide_option")) {
  //Hide The bullets
  if (localStorage.getItem("showHide_option") === "true") {
    document.getElementsByName("Show")[0].checked = true;
    bulletsOps.style.display = "none";
  }
  //Show The bullets
  else {
    document.getElementsByName("Show")[0].checked = false;
    bulletsOps.style.display = "block";
  }
}

// Rest options button
document.querySelector(".settings .reset-option").onclick = function () {
  localStorage.clear();
  window.location.reload();
}
