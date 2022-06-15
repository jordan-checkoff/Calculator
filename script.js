var total = document.getElementById("total");
var buttons = document.getElementsByClassName("button");
var ops = document.getElementsByClassName("op");
var eq = ["0"];
var opselected = false;
var answered = false;
var ready = false;
var answer;
var pos;

function update() {
  if (this.classList.contains("num")) {
    updateNum(this.id);
    unselectOp();
  }
  if (this.classList.contains("op")) {
    updateOp(this.id);
    unselectOp();
    this.classList.add("selected");
  }
  if (this.id == "clear") {
    updateClear();
    unselectOp();
  }
  if (this.id == "eq") {
    updateEqual();
    unselectOp();
  }
  if (this.id =="neg") {
    updateNeg();
  }
  if (this.id =="dec") {
    updateDec();
    unselectOp();
  }
}

function unselectOp() {
  for (var i = 0; i < ops.length; i++) {
      ops[i].classList.remove("selected");
  }
}

function updateNum(num) {
  if (eq.length == 4) {
    eq = ["0"];
    total.innerHTML = "0";
  }
  if (eq.length == 1) {
    pos = 0;
  } else {
    pos = 2;
  }
  if (eq[pos] == "0") {
    eq[pos] = num;
  } else {
    if (eq[pos].length < 6) {
      eq[pos] += num;
    }
  }
  total.innerHTML = eq[pos];
}

function updateOp(op) {
  if (eq.length == 3) {
    updateEqual();
    eq = [eq[3]];
  }
  if (eq.length == 4) {
    eq = [eq[3]];
  }
  eq[1]= window[op];
  eq[2] = 0;
}

function add(num1, num2) {
  result = parseFloat(num1) + parseFloat(num2);
  return Math.round(result * 10000) / 10000
}

function sub(num1, num2) {
  result = parseFloat(num1) - parseFloat(num2);
  return Math.round(result * 10000) / 10000
}

function mult(num1, num2) {
  result = parseFloat(num1) * parseFloat(num2);
  return Math.round(result * 10000) / 10000
}

function div(num1, num2) {
  result = parseFloat(num1) / parseFloat(num2);
  return Math.round(result * 10000) / 10000
}

function updateClear() {
  eq = ["0"];
  total.innerHTML = "0";
}

function updateEqual() {
  if (eq.length == 4) {
    answer = eq[1](eq[3],eq[2]);
  } else if (eq.length == 1) {
    return;
  } else {
    answer = eq[1](eq[0], eq[2]);
  }
  eq[3] = answer.toString();
  if (eq[3].length > 6) {
    total.innerHTML = "Error"
    eq = [0];
  } else {
  total.innerHTML = eq[3];
  }
}

function updateNeg() {
  pos = eq.length - 1;
  eq[pos] = (-1 * parseFloat(eq[pos])).toString();
  total.innerHTML = eq[pos];
}

function updateDec() {
  pos = eq.length - 1;
  if (eq[pos].indexOf(".") == -1) {
    eq[pos] += ".";
    total.innerHTML = eq[pos];
  }
}

function test() {
  console.log(this.className)
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', update, false);
}
