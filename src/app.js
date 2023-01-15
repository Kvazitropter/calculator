import i18next from 'i18next';
import onChange from 'on-change';
import calculate from './calculate.js';
import resizeWindowFont from './resizeWindowFont.js';
import en from '../locales/lng.js';

const calcWindowEL = document.querySelector('.calc-window');
const symbolBtns = document.querySelectorAll('[data-btn-role="symb"]');
const resetBtn = document.querySelector('[data-btn-role="reset"]');
const clearOneBtn = document.querySelector('[data-btn-role="clear-one"]');
const calcBtn = document.querySelector('[data-btn-role="calculate"]');

export default () => {
  const state = {
    calcWindow: {
      expression: '0',
      validation: null,
      state: 'reseted',
      answer: '',
    },
  };

  const i18nextInst = i18next.createInstance();
  i18nextInst.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
  });

  const watchedState = onChange(state, (path, value, previousValue) => {
    switch (path) {
      case 'calcWindow.expression':
      case 'calcWindow.answer':
        calcWindowEL.textContent = value;
        break;
      case 'calcWindow.validation':
        if (value) {
          watchedState.calcWindow.state = 'proceed';
        } else {
          watchedState.calcWindow.state = 'failed';
        }
        break;
      case 'calcWindow.state':
        switch (value) {
          case 'filling':
            if (previousValue !== 'failed') {
              watchedState.calcWindow.expression = '';
            }
            state.calcWindow.validation = null;
            state.calcWindow.answer = '';
            break;
          case 'proceed':
            calcWindowEL.textContent = state.calcWindow.answer;
            break;
          case 'failed':
            calcWindowEL.textContent = i18nextInst.t('error_invalid');
            setTimeout(() => {
              calcWindowEL.textContent = state.calcWindow.expression;
            }, 2000);
            break;
          default:
            watchedState.calcWindow.expression = '0';
            break;
        }
        break;
      default:
        break;
    }
  });

  symbolBtns.forEach((symbBtn) => {
    symbBtn.addEventListener('click', (e) => {
      watchedState.calcWindow.state = 'filling';
      watchedState.calcWindow.expression += e.target.value;
    });
  });

  clearOneBtn.addEventListener('click', () => {
    if (state.calcWindow.expression.length === 1) {
      watchedState.calcWindow.state = 'reseted';
    } else {
      watchedState.calcWindow.expression = state.calcWindow.expression.slice(0, -1);
    }
  });

  resetBtn.addEventListener('click', () => {
    watchedState.calcWindow.state = 'reseted';
  });

  calcBtn.addEventListener('click', () => {
    try {
      state.calcWindow.answer = calculate(state.calcWindow.expression);
      watchedState.calcWindow.validation = true;
    } catch (e) {
      watchedState.calcWindow.validation = false;
    }
  });

  resizeWindowFont();

  window.addEventListener('resize', () => {
    resizeWindowFont();
  });
};
