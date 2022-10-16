const outputWindow = document.querySelector("output");

const calculate = (value) => {
  if (value.match(/=/)) {
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
    outputWindow.textContent = "0";
  } else if (value.match(/oneC/)) {
    const substr = outputWindow.textContent.slice(
      0,
      outputWindow.textContent.length - 1
    );
    outputWindow.textContent = substr;
  } else {
    if (outputWindow.textContent === "0" && value !== ".") {
      outputWindow.textContent = "";
    }
    outputWindow.textContent = `${outputWindow.textContent}${value}`;
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key.match(/0-9%\/*\-+\(\)=]|Enter/)) calculate(event.key);
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    calculate(this.value);
  });
});
