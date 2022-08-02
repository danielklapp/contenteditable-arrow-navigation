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
    const string = event.target.textContent;
    // get the whitespace offset in case it is not rendered.
    const whitespaceOffset = string.match(/^\s*/)[0].length;
    // to get length, with and without prewrap to work, trim unrendered final linebreak
    const length = string.length - whitespaceOffset;
    if (verbose) console.log({ key, position, whitespaceOffset, length, string });
    
    if (key === "ArrowUp" && position <= whitespaceOffset){
      event.target.previousElementSibling?.focus();
    };
    // position may excede length when pre-wrap is not used
    if (key === "ArrowDown" && position >= length){
      event.target.nextElementSibling?.focus();
    };
  });
};


