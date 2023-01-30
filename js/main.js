// Open Menu Icon 
const menuEle = document.querySelector('.menu-icon')
const menu = document.querySelector('.menu')
menuEle.addEventListener("click", ()=> {
    menu.classList.toggle("open-menu")
})

// Change Background Image Every 4 Seconds
const landing = document.querySelector(".landing")
let imgsArr = [];
let bgRandomize = true;
let bgInterval;

for(let i = 1; i <= 5; i++ ) {
    imgsArr.push(`landing-0${i}`)
}

function randomizeImgs() {
    if (bgRandomize) {
        bgInterval = setInterval( () => {
            const random = Math.floor(Math.random() * imgsArr.length)
            landing.style.backgroundImage = `url(./images/${imgsArr[random]}.jpg)`
        }, 4000 )
    }
}

function settingsToggle() {
    var sideBar = document.querySelector(".settings");
    var gear = document.querySelector(".fa-gear");
    gear.classList.toggle("fa-spin");
    sideBar.classList.toggle("open-close");
}


const colorLis = document.querySelectorAll(".colors-list li")
colorLis.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.dataset.color)

        localStorage.setItem("color-option", e.target.dataset.color)

        handelActive(e);
    })
});  

// Get color from local Storage
const mainColor = localStorage.getItem("color-option")
if (mainColor !== null) {
    document.documentElement.style.setProperty('--primary-color',mainColor )
    // remove all active children 
    colorLis.forEach(e => {
        e.classList.remove("active")

    //add active on element where data-color === localStorage color
    if (e.dataset.color === mainColor) {
        e.classList.add("active")
    }
});
} 

const bgSpans = document.querySelectorAll(".bg-options span");
bgSpans.forEach(span => {
    span.addEventListener("click", (e)=> {
        localStorage.setItem("bg-option", e.target.dataset.background)

         handelActive(e);

        if(e.target.dataset.background === "yes") {
            bgRandomize = true;
            randomizeImgs();

        } else {
            bgRandomize = false;
            clearInterval(bgInterval);
        }
    });
}); 

// Get bg option from local storage
const bgOption = localStorage.getItem("bg-option")
if (bgOption !== null) {
    bgSpans.forEach(span => {
        span.classList.remove("active")
    });
    if (bgOption === "yes") {
        bgRandomize = true;
        randomizeImgs();
        document.querySelector(".bg-options .yes").classList.add("active")
    } else {
        bgRandomize = false;
        clearInterval(bgInterval);
        document.querySelector(".bg-options .no").classList.add("active")
    }
}

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function() {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skills-boxes span")
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

// Create Popup With The Image  
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        //create the popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3")
            imgHeading.className = "popup-heading"
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }

        //create popup image
        let popupImg = document.createElement('img')
        popupImg.src = img.src;
        popupImg.className = "popup-img";
        popupImg.className = "popup-img-radius";

        //create close span
        let closeSpan = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeSpan.appendChild(closeText);
        closeSpan.className = "close-button";
        popupBox.appendChild(closeSpan);
         
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        
    });
});

// Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// scroll to top 
let scrollToTop = document.querySelector(".scroll-top");

scrollToTop.onclick = function() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Scroll To Sections
function scrollToSection(selector) {
    const elements = document.querySelectorAll(`${selector}`);
    elements.forEach((e) => {
        e.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
});
}
scrollToSection(".menu a");

// Handel Active State
function handelActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// Show Sections When Scroll To Them
// const sections = document.querySelectorAll("section");
// window.addEventListener("scroll", checkSections );
// checkSections();

// function checkSections() {
//     const triggerBottom = window.innerHeight / 5 * 4;
//     sections.forEach((section) => {
//         const sectionTop = section.getBoundingClientRect().top;
//         if (sectionTop < triggerBottom) {
//             section.classList.add("show");
//         }else {
//             section.classList.remove("show");
//         }
//     });
// }
