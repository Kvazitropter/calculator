import math from "../node_modules/mathjs";

const outputWindow = document.querySelector("output");

document.addEventListener("keydown", (event) => {
  if (event.key.match(/0-9%\/*\-+\(\)=]|Enter/)) calc(event.key);
});

const calculate = (value) => {
  if (value.match(/=|Enter/)) {
    try {
      outputWindow.textContent = math.evaluate(outputWindow.textContent);
    } catch {
      const expression = outputWindow.textContent;
      const warning = "Unvalid expression";
      outputWindow.textContent = warning;
      setTimeout(() => {
        outputWindow.textContent = expression;
      }, 2000);
    }
  } else if (value.match(/c/)) {
    outputWindow.textContent = "";
  } else if (value.match(/&#9668;|BackSpace/)) {
    output.textContent = output.textContent.substring(
      0,
      output.textContent.length - 1
    );
  } else {
    outputWindow.textContent = `${outputWindow.textContent}${value}`;
  }
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    calculate(this.value);
  });
});
