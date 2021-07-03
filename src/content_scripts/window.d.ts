interface VimLine {
  element: HTMLDivElement;
  cursor_position: number;
}

interface VimInfo {
  active_line: number;
  lines: VimLine[];
  mode: "normal" | "insert";
}

declare global {
  interface Window {
    vim_info: VimInfo;
  }
}

export {};
