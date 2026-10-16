//| DOMS
//|
//|buttons -----|
//|             |
//|continers    |
const darkbtn = document.getElementById("dbtn");
const allbtn = document.getElementById("all");
const activebtn = document.getElementById("active");
const inactivebtn = document.getElementById("inactive");

//all three continers {
const extencontiner = document.getElementById("ecxten1");
const extencontineractive = document.getElementById("ecxten2");
const extencontinerinactive = document.getElementById("ecxten3");
//}

// All three arrays for all || active || an active {
let dataArr =JSON.parse(localStorage.getItem('stitems')) || [
    { "logo": "./images/logo-devlens.svg", "name": "DevLens", "description": "Quickly inspect page layouts and visualize element boundaries.", "isActive": true, "id": 1 },
    { "logo": "./images/logo-style-spy.svg", "name": "StyleSpy", "description": "Instantly analyze and copy CSS from any webpage element.", "isActive": true, "id": 2 },
    { "logo": "./images/logo-speed-boost.svg", "name": "SpeedBoost", "description": "Optimizes browser resource usage to accelerate page loading.", "isActive": false, "id": 3 },
    { "logo": "./images/logo-json-wizard.svg", "name": "JSONWizard", "description": "Formats, validates, and prettifies JSON responses in-browser.", "isActive": true, "id": 4 },
    { "logo": "./images/logo-tab-master-pro.svg", "name": "TabMaster Pro", "description": "Organizes browser tabs into groups and sessions.", "isActive": true, "id": 5 },
    { "logo": "./images/logo-viewport-buddy.svg", "name": "ViewportBuddy", "description": "Simulates various screen resolutions directly within the browser.", "isActive": false, "id": 6 },
    { "logo": "./images/logo-markup-notes.svg", "name": "Markup Notes", "description": "Enables annotation and notes directly onto webpages for collaborative debugging.", "isActive": true, "id": 7 },
    { "logo": "./images/logo-grid-guides.svg", "name": "GridGuides", "description": "Overlay customizable grids and alignment guides on any webpage.", "isActive": false, "id": 8 },
    { "logo": "./images/logo-palette-picker.svg", "name": "Palette Picker", "description": "Instantly extracts color palettes from any webpage.", "isActive": true, "id": 9 },
    { "logo": "./images/logo-link-checker.svg", "name": "LinkChecker", "description": "Scans and highlights broken links on any page.", "isActive": true, "id": 10 },
    { "logo": "./images/logo-dom-snapshot.svg", "name": "DOM Snapshot", "description": "Capture and export DOM structures quickly.", "isActive": false, "id": 11 },
    { "logo": "./images/logo-console-plus.svg", "name": "ConsolePlus", "description": "Enhanced developer console with advanced filtering and logging.", "isActive": true, "id": 12 }
];
let activeArr = [];
let inactiveArr = [];
//}

// preparing event listner for the active swithe toggle button
document.addEventListener("change", function (event) {
    if (event.target.classList.contains("toggle-switch")) {
        const clickedId = Number(event.target.getAttribute("data-id"));
        const isChecked = event.target.checked; 
 
        const targetedCard = dataArr.find(item => item.id === clickedId);
        if (targetedCard) {
            targetedCard.isActive = isChecked; 
        }

        renderTabs();
    }
});
//}

// preparing a event listener for remove button
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("rembtn")) {
        
        const clickedId = Number(event.target.getAttribute("data-id"));
        deletefunction(clickedId);
    }
});
//}

// the main data maping over data array
function datafunction() {
    let extmap = dataArr.map(value => {
        return `
        <div class="card">
            <img src="${value.logo}" alt="" class="cimg">
            <div class="cdes">
                <h3>${value.name}</h3>
                <p class="p">${value.description}</p>
            </div>
            <div class="cbuttons"> 
                <button class="remove rembtn" data-id="${value.id}">remove</button>
                <label class="switch">
                    <input type="checkbox" class="toggle-switch" data-id="${value.id}" ${value.isActive ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        </div>`;
    }).join("");
    
    extencontiner.innerHTML = extmap;
}
//}
// the root push function
function renderTabs() {

    activeArr = [];
    inactiveArr = [];

    dataArr.forEach(item => {
        if (item.isActive === true) {
            activeArr.push(item);
        } else {
            inactiveArr.push(item);
        }
    });

// active || in active continers maping {
    let secexten = activeArr.map(value => {
        return `
        <div class="card">
            <img src="${value.logo}" alt="" class="cimg">
            <div class="cdes">
                <h3>${value.name}</h3>
                <p class="p">${value.description}</p>
            </div>
            <div class="cbuttons"> 
              <button class="remove rembtn" data-id="${value.id}">remove</button>
            </div>
        </div>`;
    }).join("");
    extencontineractive.innerHTML = secexten;

    let thirdexten = inactiveArr.map(value => {
        return `
        <div class="card">
            <img src="${value.logo}" alt="" class="cimg">
            <div class="cdes">
                <h3>${value.name}</h3>
                <p class="p">${value.description}</p>
            </div>
            <div class="cbuttons"> 
               <button class="remove rembtn" data-id="${value.id}">remove</button>
            </div>
        </div>`;
    }).join("");
    extencontinerinactive.innerHTML = thirdexten;
}
// }

// all three addEventListeners {

allbtn.addEventListener("click", function () { 
    extencontiner.classList.remove("hidden");
    extencontineractive.classList.add("hidden");
    extencontinerinactive.classList.add("hidden");
});

activebtn.addEventListener("click", function () {
    extencontiner.classList.add("hidden");
    extencontineractive.classList.remove("hidden");
    extencontinerinactive.classList.add("hidden");
});

inactivebtn.addEventListener("click", function () {
    extencontiner.classList.add("hidden");
    extencontineractive.classList.add("hidden");
    extencontinerinactive.classList.remove("hidden");
});

datafunction();
renderTabs()

// }

// darkmodefunctions {

let body = document.body;
let savedDarkState = localStorage.getItem('isdark') === 'true';

if (savedDarkState) {
    body.classList.add('darkmode');
    darkbtn.innerText = '☀';
} else {
    body.classList.remove('darkmode');
    darkbtn.innerText = '🌙';
}

darkbtn.addEventListener('click', function () {
    const isdark = body.classList.toggle('darkmode');

    darkbtn.innerText = isdark ? '☀' : '🌙';

    localStorage.setItem('isdark', isdark);
});

// }

//   deletefunctions {

function deletefunction(clickedId) {
    const index = dataArr.findIndex(item => item.id === clickedId);
    if (index !== -1) {
        dataArr.splice(index, 1);
        localStorage.setItem('setitems', JSON.stringify(dataArr));


        datafunction(); 
        renderTabs()
    }
}
