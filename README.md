# junchaoma423.github.io

Personal site of Junchao Ma, served by GitHub Pages from the `main` branch. Plain HTML/CSS, no build step.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home: intro, robots, videos, publications, contact |
| `hector-v2/`, `hector-v1/`, `wheel-legged-quadruped/`, `1-dof-robotic-arm/` | One page per robot |
| `css/style.css` | All styling (colors are the variables at the top) |
| `js/site.js` | Video click-to-play, lazy GIFs, contact form |
| `img/` | Images; `*-poster.jpg` is the still shown before a GIF loads |
| `about/`, `research/`, `contact/`, `page/` | Redirects from the old site's URLs |

## Common edits

- **Add a publication:** copy one `<li class="pub">…</li>` block in `index.html` and edit it.
- **Add a video:** copy a `<figure class="video">` block and change the YouTube ID in `data-yt` and the thumbnail URL.
- **Add a CV:** put `cv.pdf` in the root and add `<a class="btn" href="/cv.pdf">CV</a>` next to the other hero buttons.

Preview locally with `python3 -m http.server` and open http://localhost:8000.
