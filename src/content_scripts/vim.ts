let activeElementIdx: number;
let fields: HTMLDivElement[] = [];

const setFields = (f: HTMLDivElement[]) => {
  if (typeof activeElementIdx === "undefined") activeElementIdx = 0;
  fields = f;
  setActiveElementIdx(activeElementIdx || 0);
};

const setActiveElementIdx = (idx: number) => {
  let i = idx;

  if (idx >= fields.length) i = fields.length - 1;
  if (i < 0) i = 0;
  fields[activeElementIdx].removeEventListener("keydown", jk);
  fields[i].focus();
  fields[i].addEventListener("keydown", jk);
  activeElementIdx = i;
};
const jk = (e: KeyboardEvent) => {
  e.preventDefault();
  if (e.key === "j") {
    setActiveElementIdx(activeElementIdx + 1);
  }
  if (e.key === "k") {
    setActiveElementIdx(activeElementIdx - 1);
  }
};

const createInfoContainer = () => {
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  const mode = document.createElement("div");
  mode.innerText = "-- NORMAL --";
  mode.classList.add("mode");
  infoContainer.appendChild(mode);
  document.body.appendChild(infoContainer);
};

(() => {
  createInfoContainer();
  const poll = setInterval(() => {
    const f = Array.from(
      document.querySelectorAll(".notion-page-content [contenteditable=true]")
    );
    if (f.length > 0) {
      clearInterval(poll);
      console.log(f);
      setFields(f as HTMLDivElement[]);
    }
  }, 250);
})();
