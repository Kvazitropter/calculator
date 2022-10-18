const outputWindow = document.querySelector("output");

const calculate = (value) => {
  const expression = outputWindow.textContent;
  const warning = "Invalid expression";
  if (value.match(/=/)) {
    try {
      outputWindow.textContent = math.evaluate(outputWindow.textContent);
    } catch {
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
    outputWindow.textContent = substr || "0";
  } else {
    if (
      outputWindow.textContent === "0" &&
      value.match(/\+|-|\.|\*|\//) === null
    ) {
      outputWindow.textContent = "";
    }
    outputWindow.textContent = `${outputWindow.textContent}${value}`;
  }
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    calculate(this.value);
  });
});
