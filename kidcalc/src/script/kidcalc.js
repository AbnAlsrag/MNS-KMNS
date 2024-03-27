const display = document.getElementById("display");
const submit_btn = document.getElementById("submit-btn");
const clear_btn = document.getElementById("clear-btn");4
const nums = document.getElementById("nums");
const ops = document.getElementById("ops");

let typed = false;
let can_eq = false;
let has_eq = false;
let can_op = false;
let has_num_after_eq = false;
let can_submit = false;

const OPS = ["+", "-", "*", "/", "="];

function UpdateState() {
    can_eq = (can_op && !has_eq) ? true : false;
    can_submit = (can_op && has_eq && has_num_after_eq) ? true : false;
}

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

window.onkeydown = (ev) => {
    if (ev.key >= 0 && ev.key <= 9) {
        if (!typed) {
            display.textContent = "";
            typed = true;
        }
        
        display.textContent += "" + ev.key;
        can_op = true;
        
        if (has_eq) {
            has_num_after_eq = true;
        }
    } else if (ev.key === "+" || ev.key === "-" || ev.key === "*" || ev.key === "/" || ev.key === "=") {
        UpdateState();
        
        if (can_op) {
            if (!(ev.key === "=" && !can_eq)) {
                display.textContent += ev.key;

                if (ev.key == "=") {
                    has_eq = true;
                }
            }

            can_op = false;
        }
    } else if (ev.key === "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (ev.key === "Enter") {
        UpdateState();
    
        if (can_submit) {
            console.log(CheckEquation(display.textContent));
        }
    }
}

for (let i = 0; i < 10; i++) {
    nums.children[i].onclick = () => {
        if (!typed) {
            display.textContent = "";
            typed = true;
        }

        display.textContent += "" + nums.children[i].textContent;
        can_op = true;
        
        if (has_eq) {
            has_num_after_eq = true;
        }
    };
}

for (let i = 0; i < ops.children.length; i++) {
    ops.children[i].onclick = () => {
        UpdateState();
        
        if (can_op) {
            if (!(OPS[i] == "=" && !can_eq)) {
                display.textContent += OPS[i];

                if (OPS[i] == "=") {
                    has_eq = true;
                }
            }

            can_op = false;
        }
    }
}

clear_btn.onclick = () => {
    display.textContent = "";
    typed = false;
    can_eq = false;
    has_eq = false;
    can_op = false;
    has_num_after_eq = false;
    can_submit = false;
};

submit_btn.onclick = () => {
    UpdateState();
    
    if (can_submit) {
        if (CheckEquation(display.textContent)) {
            let old = display.textContent;
            display.textContent += " (Correct)";
        } else {
            display.textContent += " (Incorrect)";
        }
    }
}