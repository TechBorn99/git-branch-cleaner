# Git Branch Cleaner

This Node.js script automates the process of deleting local and remote Git branches that have been merged into the main branch. It's a simple, yet effective tool to keep your Git repositories clean and manageable.

## Features

- Identifies and deletes local branches that have been merged into the main branch.
- Identifies and deletes remote branches that have been merged.
- Supports custom main branch and remote names.

## Prerequisites

- Node.js installed on your system.
- Git installed and configured.
- Necessary permissions to delete branches on the remote repository.

## Installation and Usage

- Clone this repository to your local machine
- Navigate to the script directory
- Run the script from the root of your Git repository with the command: `node deleteMergedBranches.js <main_branch> <remote_name>`
  - Replace `<main_branch>` with your main branch name (e.g., `main` or `master`) and `<remote_name>` with the name of your remote (e.g., `origin`).

## License

This project is licensed under the [MIT License](https://github.com/TechBorn99/git-branch-cleaner/blob/main/LICENSE).
