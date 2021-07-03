const setLines = (f: HTMLDivElement[]) => {
  const { vim_info } = window;
  vim_info.lines = f.map((elem) => ({
    cursor_position: 0,
    element: elem as HTMLDivElement,
  }));
  setActiveElementIdx(vim_info.active_line || 0);
};

const setActiveElementIdx = (idx: number) => {
  const {
    vim_info: { lines, active_line },
  } = window;
  let i = idx;

  if (idx >= lines.length) i = lines.length - 1;
  if (i < 0) i = 0;
  lines[active_line].element.removeEventListener("keydown", jk);
  lines[i].element.focus();
  lines[i].element.addEventListener("keydown", jk);
  window.vim_info.active_line = i;
};
const jk = (e: KeyboardEvent) => {
  e.preventDefault();
  const {
    vim_info: { active_line },
  } = window;
  if (e.key === "j") {
    setActiveElementIdx(active_line + 1);
  }
  if (e.key === "k") {
    setActiveElementIdx(active_line - 1);
  }
};

const createInfoContainer = () => {
  const { vim_info } = window;
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("vim-info-container");
  const mode = document.createElement("div");
  mode.innerText = vim_info.mode === "normal" ? "-- NORMAL --" : "-- INSERT --";
  mode.classList.add("vim-mode");
  infoContainer.appendChild(mode);
  document.body.appendChild(infoContainer);
};

const initVimInfo = () => {
  const vim_info = {
    active_line: 0,
    lines: [] as any,
    mode: "normal" as const,
  };
  window.vim_info = vim_info;
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
