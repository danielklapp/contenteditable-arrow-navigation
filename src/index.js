import { getCaretIndexFromElement } from "./getCaretIndexFromElement";

export function addArrowKeyNavigationToContenteditableElements(props) {
  const { verbose } = props || {};
  const elements = getContenteditableElements();

  addArrowKeyNavigationToElements({ elements, verbose })
};

export function getContenteditableElements() {
  const contenteditableElements = document.querySelectorAll('[contenteditable]');
  return contenteditableElements;
};

export function addArrowKeyNavigationToElements({ elements, verbose }) {
  [...elements].forEach(element => {
    addArrowKeyNavigationToElement({ element, verbose });
  });
};

export function addArrowKeyNavigationToElement({ element, verbose=false }) {
  element.addEventListener("keydown", (event) => {
    const { key, target } = event;
    const position = getCaretIndexFromElement({ element: target });
    const length = event.target.innerText.length;
    if (verbose) console.log({ key, position, length });
    
    if (key === "ArrowUp" && position === 0){
      event.target.previousElementSibling.focus();
    };
    
    if (key === "ArrowDown" && position === length){
      event.target.nextElementSibling.focus();
    };
  });
};


