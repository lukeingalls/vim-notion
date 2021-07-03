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

const getModeText = (mode: "insert" | "normal") => {
  return `-- ${mode.toUpperCase()} --`;
};

const handleKeydown = (e: KeyboardEvent) => {
  const { vim_info } = window;
  if (vim_info.mode === "normal") {
    normalReducer(e);
  } else {
    insertReducer(e);
  }
};

const initVimInfo = () => {
  const vim_info = {
    active_line: 0,
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

const normalReducer = (e: KeyboardEvent) => {
  const {
    vim_info: { active_line },
  } = window;
  switch (e.key) {
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
  lines[i].element.focus();
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
