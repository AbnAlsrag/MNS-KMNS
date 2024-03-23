const display = document.getElementById("display");
const submit_btn = document.getElementById("submit-btn");
const clear_btn = document.getElementById("clear-btn");4
const nums = document.getElementById("nums");
const ops = document.getElementById("ops");

// let can_equal = false;
// let had_equal = false;

const OPS = ["+", "-", "*", "/", "="];

function SplitEquation(equation) {
    let first;
    let second;
    
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === "=") {
            first = equation.slice(0, i);
            second = equation.slice(i + 1);
            return [first, second];
        }       
    }
}

function CheckEquation(equation) {
    let eq = SplitEquation(equation);

    if (eval(eq[0]) == eval(eq[1])) {
        return true;
    } else {
        return false;
    }
}

for (let i = 0; i < 10; i++) {
    nums.children[i].onclick = () => {
        display.textContent += "" + i;
    };
}

for (let i = 0; i < ops.children.length; i++) {
    ops.children[i].onclick = () => {
        display.textContent += OPS[i];
    }
}

clear_btn.onclick = () => {
    display.textContent = "";
};

submit_btn.onclick = () => {
    console.log(CheckEquation(display.textContent));
}