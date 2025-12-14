> [!TIP]
> [Vimtion](https://github.com/tatsukamijo/vimtion) is a more complete fork of this repo created by tatsukamijo. It's worth checking that out before diving too deep into this repo.

# VIM for Notion

This is a project created by [Luke Ingalls](https://www.linkedin.com/in/luke-ingalls/).

In general, I have implemented commands to the degree in which I miss them when using notion. This is by no means meant to be a complete implementation. If you have questions you can reach out to me.

# Supported commands

| Support Icon |      Definition      |
| :----------: | :------------------: |
|      🗓       |  Support is planned  |
|      ✅      | Feature is Supported |
|      ❌      |  No support planned  |

| Key | Supported | Comments                                                                                                                           |
| :-: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------- |
| `a` |    ✅     | [`caret-shape`](https://css-tricks.com/almanac/properties/c/caret-shape/) isn't supported yet so `i` and `a` operate the same way. |
| `b` |     🗓     |                                                                                                                                    |
| `c` |     🗓     |                                                                                                                                    |
| `d` |     🗓     |                                                                                                                                    |
| `e` |     🗓     |                                                                                                                                    |
| `f` |     🗓     |                                                                                                                                    |
| `g` |     🗓     | Limited support is planned. Will only support gg.                                                                                  |
| `h` |    ✅     |                                                                                                                                    |
| `i` |    ✅     | **See a**                                                                                                                          |
| `j` |    ✅     | The cursor position within a line is not preserved when moving with j and k.                                                       |
| `k` |    ✅     | **See j**                                                                                                                          |
| `l` |    ✅     |                                                                                                                                    |
| `m` |    ❌     |                                                                                                                                    |
| `n` |    ❌     |                                                                                                                                    |
| `o` |     🗓     |                                                                                                                                    |
| `p` |     🗓     |                                                                                                                                    |
| `q` |    ❌     |                                                                                                                                    |
| `r` |     🗓     |                                                                                                                                    |
| `s` |    ❌     |                                                                                                                                    |
| `t` |     🗓     |                                                                                                                                    |
| `u` |    ❌     |                                                                                                                                    |
| `v` |    ❌     |                                                                                                                                    |
| `w` |     🗓     |                                                                                                                                    |
| `x` |     🗓     |                                                                                                                                    |
| `y` |     🗓     | Limited support is planned. Will support `yy`, `yw`, `yb`,`ye`, and capitalized variants of the aforementioned.                    |
| `z` |    ❌     |                                                                                                                                    |
| `A` |     🗓     |                                                                                                                                    |
| `B` |     🗓     |                                                                                                                                    |
| `C` |     🗓     |                                                                                                                                    |
| `D` |     🗓     |                                                                                                                                    |
| `E` |     🗓     |                                                                                                                                    |
| `F` |     🗓     |                                                                                                                                    |
| `G` |     🗓     |                                                                                                                                    |
| `H` |    ❌     |                                                                                                                                    |
| `I` |     🗓     |                                                                                                                                    |
| `J` |    ❌     |                                                                                                                                    |
| `K` |    ❌     |                                                                                                                                    |
| `L` |    ❌     |                                                                                                                                    |
| `M` |    ❌     |                                                                                                                                    |
| `N` |    ❌     |                                                                                                                                    |
| `O` |     🗓     |                                                                                                                                    |
| `P` |     🗓     |                                                                                                                                    |
| `Q` |    ❌     |                                                                                                                                    |
| `R` |    ❌     |                                                                                                                                    |
| `S` |    ❌     |                                                                                                                                    |
| `T` |     🗓     |                                                                                                                                    |
| `U` |    ❌     |                                                                                                                                    |
| `V` |    ❌     |                                                                                                                                    |
| `W` |    ✅     |                                                                                                                                    |
| `X` |     🗓     |                                                                                                                                    |
| `Y` |    ❌     |                                                                                                                                    |
| `Z` |    ❌     |                                                                                                                                    |

# Setup and Install

**Hosted**: There is not currently a hosted version. I will be putting up a version on the chrome extension store once the commands listed under the planned support are completed.

**Local**: First, clone the repository wherever you want it. Next run `yarn install` and then run `yarn build`. The build should create a `dist` directory which holds the extension. You will be able to run the extension by loading the `dist` folder as an unpacked extension for Chrome. [Here is an article that explains how to do that](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/).
Currently, Chrome is the main browser being supported. My guess is most chromium browser ought to work but there is no gaurantee (it depends on whether they use the Chrome keyword or browser keyword for extension apis). Long term I would only specifically support Chrome and Firefox (if I am the only dev).
