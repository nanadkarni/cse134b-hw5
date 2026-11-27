**Path to SSG Exercise:"
/_ssg-exercise

commands from astro to install dependencies:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## design note
If a visitor wants to get a fun fact, they can click the 'tell me something I don't know button. The page then waits for the API to fetch the fact, then it prints in on the page as paragraph.