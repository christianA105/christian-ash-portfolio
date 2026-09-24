# Christian Ash 3D Portfolio Prototype

## Keyboard navigation

- Press `Tab` to move through navigation links, cartridges, and DualDeck controls.
- Focus the DualDeck, then use `Up` / `Down` to change projects and `Left` / `Right` to browse screenshots.
- Press `Enter` to open the highlighted project when the DualDeck home screen is visible.
- Press `Escape` to return to the project menu or close an enlarged screenshot.
- When the project-details screen is focused, arrow keys keep their normal scrolling behavior.
- No letter-key shortcuts are used, so ordinary typing cannot accidentally control the device.

## Contact setup

The Contact scene includes a Name, Email, and Message form plus working GitHub,
DeviantArt, and résumé links. Email and LinkedIn remain clearly marked placeholders.
Replace the two placeholder links in `dist/index.html` before publishing. The
copyright year updates automatically in `dist/script.js`.

Résumé and GitHub actions appear only on the Contact scene to avoid duplicate
buttons on the About scene. DualDeck controls use teal hover and focus feedback.

The active Project Library cartridge uses a teal-filled background, white text,
a stronger glow, and a checkmark so the current selection is unmistakable.

This is a separate experimental portfolio concept. Open `dist/index.html` in a browser to view it.

The portfolio uses three full-screen scenes instead of a normal scrolling page:

1. Home introduces Christian without showing the DualDeck.
2. Projects places the interactive 3D CA DualDeck on the left and selectable
   project cartridges on the right.
3. About presents Christian's biography and future portrait area.

Use the navigation at the top or the previous/next arrow controls at the bottom
to trigger the camera-style transitions between Home, Projects, and About.

## Add project screenshots

1. Export each screenshot as a 1600 × 900 WebP image.
2. Put the images in `dist/assets/projects/`.
3. Add each relative filename to the matching project's `screenshots` list in
   `dist/script.js`.

Example: `{ src: "assets/projects/portfolio-home.webp", label: "Home page" }`

The portfolio opens directly on the Home scene. The four physical D-pad
controls work together like a handheld device: ← and → browse screenshots,
while ↑ and ↓ move through projects. Press A to open the highlighted project and
B to return to the DeckOS menu. X enlarges an available screenshot, Y switches
between Overview and Case Study, START opens a live demo, and SELECT opens
GitHub.

The top screen is reserved for the selected project's screenshots and contains
no interface text. Pagination dots show the active screenshot in teal and the
remaining screenshots in gray. Before a project is opened, it displays the CA logo. The
bottom screen contains the selection message or the project name, summary,
problem, solution, technologies, challenges, and lessons learned.

Cyan is the main interface color. Teal is reserved for active selections and
keyboard focus so visitors can immediately recognize the current item.

Leave `demo` or `github` empty when a link is unavailable. The physical button
remains visible and pressing it displays a short game-style “not installed”
message. Each project also includes editable role, year, status, and outcome
fields. The project state is preserved when the visitor moves between scenes.

The cyan cyber grid and digital particles run quietly behind all three scenes
and stop when reduced motion is requested. There is no lightning-flash effect.

There are no letter-key shortcuts. Visitors use Tab plus Enter/Space to operate
the real website controls, so normal typing will never trigger the device.
