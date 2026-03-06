const ACTIONS = {
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    RESET: "RESET",
    UNDO: "UNDO",
    REDO: "REDO"
};


let state = {
    count: Number(localStorage.getItem("count")) || 0,
    history: JSON.parse(localStorage.getItem("history")) || [],
    future: JSON.parse(localStorage.getItem("future")) || [],
    actions: JSON.parse(localStorage.getItem("qactions")) || []
};

count = Number(count);


const countDisplay = document.getElementById("count");

const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

function saveState() {

    localStorage.setItem("count", state.count);
    localStorage.setItem("history", JSON.stringify(state.history));
    localStorage.setItem("future", JSON.stringify(state.future));
    localStorage.setItem("actions", JSON.stringify(state.actions));

}

function updateDisplay() {

    countDisplay.textContent = state.count;

    if (state.count > 0) {
        countDisplay.style.color = "green";
    } else if (state.count < 0) {
        countDisplay.style.color = "red";
    } else {
        countDisplay.style.color = "black";
    }

}

function dispatch(action) {

}

function dispatch(action) {
    state.actions.push(action);

    switch(action) {

        case ACTIONS.INCREASE:

            state.history.push(state.count);
            state.future = [];
            state.count += 1;

            break;


        case ACTIONS.DECREASE:

            state.history.push(state.count);
            state.future = [];
            state.count -= 1;

            break;


        case ACTIONS.RESET:

            state.history.push(state.count);
            state.future = [];
            state.count = 0;

            break;


        case ACTIONS.UNDO:

            if (state.history.length > 0) {

                state.future.push(state.count);
                state.count = state.history.pop();

            }

            break;


        case ACTIONS.REDO:

            if (state.future.length > 0) {

                state.history.push(state.count);
                state.count = state.future.pop();

            }

            break;

    }

    saveState();
    updateDisplay();
    visualizeState(action);

}

increaseBtn.addEventListener("click", () => dispatch(ACTIONS.INCREASE));
decreaseBtn.addEventListener("click", () => dispatch(ACTIONS.DECREASE));
resetBtn.addEventListener("click", () => dispatch(ACTIONS.RESET));
undoBtn.addEventListener("click", ()=> dispatch(ACTIONS.UNDO));
redoBtn.addEventListener("click", () =>dispatch(ACTIONS.REDO));

updateDisplay();

function visualizeState(action) {
    console.clear();
    console.log("LATEST ACTION:", action);
    console.table({
        history: JSON.stringify(state.history),
        current: state.count,
        future: JSON.stringify(state.future)
    });

    console.log("Action LOG:");
    state.actions.forEach((a, i) => {
        console.log(i + 1, a);
    });

        // console.log("History:", state.history);
        // console.log("Current:", state.count);
        // console.log("Future:", state.future);
    } 
