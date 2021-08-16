import { keywords } from "../constants";

const createInfoContainer = () => {
  const { vim_info } = window;
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("vim-info-container");
  const mode = document.createElement("div");
  mode.innerText = getModeText(vim_info.mode);
  mode.classList.add("vim-mode");
  infoContainer.appendChild(mode);
  document.body.appendChild(infoContainer);
};

const getCursorIndex = () => {
  const range = document.getSelection().getRangeAt(0);

  let i = 0;

  const checkElementNode = (element: Element) => {
    for (const node of Array.from(element.childNodes)) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (checkElementNode(node as Element)) {
          break;
        } else {
          continue;
        }
      }
      if (node.isSameNode(range.startContainer)) {
        i += range.startOffset;
        return true;
      }
      i += node.textContent.length;
    }
    return false;
  };

  checkElementNode(document.activeElement);
  return i;
};

const getModeText = (mode: "insert" | "normal") => {
  return `-- ${mode.toUpperCase()} --`;
};

const setCursorPosition = (element: Element, index: number) => {
  let i = 0;
  const childNodes = Array.from(element.childNodes);

  for (const node of childNodes) {
    const isInRange = index >= i && index <= i + node.textContent.length;
    if (isInRange && node.nodeType === Node.ELEMENT_NODE) {
      setCursorPosition(node as Element, index - i);
      break;
    }
    if (isInRange) {
      const range = document.createRange();
      const selection = window.getSelection();

      range.setStart(node, index - i);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      break;
    }
    i += node.textContent.length;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  const { vim_info } = window;
  if (vim_info.mode === "normal") {
    normalReducer(e);
  } else {
    insertReducer(e);
  }
};

// For reference only
// const setCaret = () => {
//   const el = document.activeElement;
//   console.log(el);
//   const range = document.createRange();
//   console.log(range);
//   const sel = window.getSelection();
//   console.log(sel);
//   console.log(el.childNodes);
//   range.setStart(el.childNodes[1], 0);
//   range.setEnd(el.childNodes[2], 0);

//   sel.removeAllRanges();
//   sel.addRange(range);
// };

const initVimInfo = () => {
  const vim_info = {
    active_line: 0,
    cursor_position: 0,
    lines: [] as any,
    mode: "normal" as const,
  };
  window.vim_info = vim_info;
};

const insertReducer = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Escape":
      e.preventDefault();
      e.stopPropagation();
      window.vim_info.mode = "normal";
      updateInfoContainer();
      break;
    default:
      break;
  }
  return;
};

const moveCursorBackwards = () => {
  const currentCursorPosition = getCursorIndex();
  if (currentCursorPosition === 0) return;
  setCursorPosition(document.activeElement, currentCursorPosition - 1);
};

const moveCursorForwards = () => {
  const currentCursorPosition = getCursorIndex();
  if (currentCursorPosition >= document.activeElement.textContent.length)
    return;
  setCursorPosition(document.activeElement, currentCursorPosition + 1);
};

const normalReducer = (e: KeyboardEvent) => {
  const {
    vim_info: { active_line },
  } = window;
  switch (e.key) {
    case "h":
      e.preventDefault();
      moveCursorBackwards();
      break;
    case "i":
      e.preventDefault();
      window.vim_info.mode = "insert";
      updateInfoContainer();
      break;
    case "j":
      e.preventDefault();
      setActiveLine(active_line + 1);
      break;
    case "k":
      e.preventDefault();
      setActiveLine(active_line - 1);
      break;
    case "l":
      e.preventDefault();
      moveCursorForwards();
      break;
    default:
      e.preventDefault();
      break;
  }
};

const setActiveLine = (idx: number) => {
  const {
    vim_info: { lines, active_line },
  } = window;
  let i = idx;

  if (idx >= lines.length) i = lines.length - 1;
  if (i < 0) i = 0;
  lines[active_line].element.removeEventListener("keydown", handleKeydown);
  lines[i].element.click();
  lines[i].element.addEventListener("keydown", handleKeydown);
  window.vim_info.active_line = i;
};

const setLines = (f: HTMLDivElement[]) => {
  const { vim_info } = window;
  vim_info.lines = f.map((elem) => ({
    cursor_position: 0,
    element: elem as HTMLDivElement,
  }));
  setActiveLine(vim_info.active_line || 0);
};

const updateInfoContainer = () => {
  const mode = document.querySelector(".vim-mode") as HTMLDivElement;
  mode.innerText = getModeText(window.vim_info.mode);
};

(() => {
  initVimInfo();
  createInfoContainer();
  const poll = setInterval(() => {
    const f = Array.from(
      document.querySelectorAll(".notion-page-content [contenteditable=true]")
    );
    if (f.length > 0) {
      clearInterval(poll);
      setLines(f as HTMLDivElement[]);
    }
  }, 250);
})();
