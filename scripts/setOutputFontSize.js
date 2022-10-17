const setFontSize = () => {
  const outputHeight = outputWindow.getBoundingClientRect().height;
  if (outputHeight > 75) {
    outputWindow.style.fontSize = `${outputHeight / 3}px`;
  }
};

setFontSize();

window.addEventListener("resize", () => {
  setFontSize();
});
