const calcWindow = document.querySelector('.calc-window');

export default () => {
  const windowHeight = calcWindow.getBoundingClientRect().height;
  if (windowHeight >= 75) {
    calcWindow.style.fontSize = `${windowHeight / 3}px`;
  } else if (windowHeight >= 50) {
    calcWindow.style.fontSize = `${windowHeight / 2}px`;
  } else {
    calcWindow.style.fontSize = `${windowHeight}px`;
  }
};
