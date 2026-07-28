# Upload this project to GitHub

## Easiest method: GitHub Desktop

1. Extract the ZIP file.
2. Install GitHub Desktop from https://desktop.github.com/
3. Open GitHub Desktop and sign in to your GitHub account.
4. Choose **File → Add Local Repository**.
5. Select the extracted `paradise-of-the-fathers` folder.
6. If GitHub Desktop says the folder is not yet a Git repository, choose
   **Create a repository here**.
7. Use `paradise-of-the-fathers` as the repository name.
8. Write `Initial website source` as the first commit summary and commit the
   files.
9. Click **Publish repository**.
10. Keep **Keep this code private** enabled for the first upload.

## Command-line alternative

Run these commands inside the extracted folder after installing GitHub CLI:

```bash
git init -b main
git add .
git commit -m "Initial website source"
gh auth login
gh repo create paradise-of-the-fathers --private --source=. --remote=origin --push
```

To make the repository public later, open the repository on GitHub and change
its visibility under **Settings → General → Danger Zone**.

