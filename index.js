//NAME SECTION
const greetingContainer = document.querySelector("#greeting-container");
const nameInput = document.querySelector("#name-input");
const getName = () => localStorage.getItem("name");

const setName = (name) => {
    return localStorage.setItem("name", name);
}

const setGreetingDisplay = () => {
    const savedName = getName();
    if (savedName) {
        greetingContainer.innerHTML = `<h1 id="greeting-section">Hello, ${savedName}!</h1><i id="edit-name-button" class="fa fa-edit" style="font-size:24px"></i>`;
        const editName = document.querySelector("#greeting-section");
        //add listener to newly mounted edit icon;
        editName.addEventListener("click", () => {
            greetingContainer.innerHTML = "";
            greetingContainer.append(nameInput);
            nameInput.value = getName();
            nameInput.focus();
        })
    }
}

setGreetingDisplay();

nameInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
        e.target.value ? setName(e.target.value) : setName("");
        setGreetingDisplay();
    }
})

nameInput.addEventListener("focusout", (e) => {
    e.target.value ? setName(e.target.value) : setName("");
    setGreetingDisplay();
})




//TIME SECTION

const timeContainer = document.querySelector("#time-stamp");

const displayTime = () => {
    const timeNow = new Date();
    const hour = timeNow.getHours();
    const minute = timeNow.getMinutes();
    const hours = hour > 12 ? hour - 12 : hour; //12-hr format;
    const formattedHour = hours < 10 ? `0${hours}` : hours;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    timeContainer.innerHTML = `${formattedHour}:${formattedMinute} <span id="time-ampm"></span>`
    
    const amPmContainer = document.querySelector("#time-ampm");
    amPmContainer.innerHTML = hour <= 12 ? 'AM' : 'PM';
};

displayTime();
setInterval(displayTime, 60000);




//MAIN GOAL SECTION

const mainGoalInput = document.querySelector("#main-goal-input");
const getMainGoal = localStorage.getItem("mainGoal");
mainGoalInput.value = getMainGoal ? getMainGoal : "";

const setMainGoal = (mainGoal) => {
    return localStorage.setItem("mainGoal", mainGoal);
}

//Save to local storage on enter
mainGoalInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
        e.preventDefault(); //disable new line
        e.target.value ? setMainGoal(e.target.value) : setMainGoal("");
        mainGoalInput.blur();
    }
})

//Save to local storage on unfocus
mainGoalInput.addEventListener("focusout", (e) => {
    e.target.value ? setMainGoal(e.target.value) : setMainGoal("");
})



