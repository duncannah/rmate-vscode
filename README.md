# RMate for Visual Studio Code

A Visual Studio Code extension that implements TextMate's `rmate` feature, allowing files on a remote machine to be opened and edited in your local VS Code window over an SSH tunnel.

This is a fork, see the section below for details.

## Installation

- Install the package from your editor's extension manager.
- Install an `rmate` client on the remote machine.
  - I recommend [aurora/rmate](https://github.com/aurora/rmate) over the original one to avoid a Ruby dependency!\
    ([rmate-sh](https://github.com/NixOS/nixpkgs/blob/nixos-unstable/pkgs/by-name/rm/rmate-sh/package.nix) in nixpkgs)

## Usage

- Configure the extension in VS Code Settings.

- Start the server in the command palette - Press <kbd>F1</kbd> or <kbd>⌘ Command</kbd> + <kbd>⇧ Shift</kbd> + <kbd>P</kbd> and type `rmate: Start server`, and press <kbd>⏎ Enter</kbd> to start the server.
  If successfully started you'll see a symbol in Status Bar:
  ![](docs/statusbar.png)

- Login to your remote server with a remote port tunnel

  ```bash
  ssh -R 52698:127.0.0.1:52698 user@example.org
  ```

  Or configure SSH to always create a tunnel by editing `~/.ssh/config`:

  ```
  Host *
    RemoteForward 52698 127.0.0.1:52698
  ```

- Go to the remote system and run

  ```bash
  rmate file1 file2
  ```

- If you want to use rmate in `EDITOR` variable, you can use it like this:

  ```
  EDITOR='rmate -w' sudoedit important_file
  ```

- Extra: if you have a shared shell config, you can have it set `EDITOR` only for SSH sessions, in your shell config (e.g. `.zshrc`):

  ```bash
  if [[ -n "$SSH_CONNECTION" ]]; then
    export EDITOR='rmate -w'
  fi
  ```

## Development

The development toolchain is managed with [mise](https://mise.jdx.dev/):

```bash
mise install
pnpm install --frozen-lockfile
```

Common commands:

```bash
pnpm run compile
pnpm run lint
pnpm test
pnpm run vsix
```

## Fork lineage

This repository is a fork of [dersimn/rmate-vscode](https://github.com/dersimn/rmate-vscode), which is itself a fork of Rafael Maiolla's original [rafaelmaiolla/remote-vscode](https://github.com/rafaelmaiolla/remote-vscode). Thanks to Simon Christmann, Rafael Maiolla, and the other contributors for the work this version builds upon.

This fork adds:

- Automatic cleanup of RMate sessions when their VS Code tabs are closed.

It also retains improvements from the `dersimn` fork, including:

- Open multiple files at once with `rmate file1 file2`
- Close files opened with the `-w` flag, which is useful when using `rmate` in the `EDITOR` environment variable.
  Example: `EDITOR='rmate -w' sudoedit somefile`

  When the VS Code tab is closed, the corresponding RMate session is closed as well.

  Alternatively, commands are available for closing individual sessions or all sessions at once:
  ![](docs/close-dialog.png)

## Credits and license

This project is maintained by [duncannah](https://github.com/duncannah) and derives from work by [Simon Christmann](https://github.com/dersimn), [Rafael Maiolla](https://github.com/rafaelmaiolla), and their contributors. See the repository history for the complete contribution record.

[MIT](LICENSE.txt)
