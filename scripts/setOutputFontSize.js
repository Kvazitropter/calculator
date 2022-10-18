const setFontSize = () => {
  const outputHeight = outputWindow.getBoundingClientRect().height;
  if (outputHeight >= 75) {
    outputWindow.style.fontSize = `${outputHeight / 3}px`;
  } else if (outputHeight >= 50) {
    outputWindow.style.fontSize = `${outputHeight / 2}px`;
  } else {
    outputWindow.style.fontSize = `${outputHeight}px`;
  }
};

setFontSize();

window.addEventListener("resize", () => {
  setFontSize();
});
