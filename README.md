# ai4pakistan website

Responsive static homepage for **ai4pakistan**, a MirasAI initiative, rebuilt against the supplied September 28 design.

## Run locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. No build step or package installation is needed.

## Files

- `index.html`: semantic, editable page content and inline SVG icons.
- `styles.css`: desktop reference layout, tablet/mobile layouts, focus states, and reduced-motion support.
- `script.js`: synchronized language tabs/select, translated sample responses, keyboard tab navigation, code examples, transcript copying, mobile navigation, and explicitly labelled sample animation.
- `assets/pakistan-landscape.webp`: generated landscape artwork matching the supplied reference's composition.
- `assets/solutions.webp`: generated four-panel editorial artwork for the solution cards.
- `assets/design-reference.webp`: supplied design, also used as the source for the illustrative map via CSS viewport clipping. This is not authoritative geographic or dataset coverage data.

## Design fidelity and content status

The layout follows the reference: ivory background, emerald/amber palette, landscape hero, speech demo, language strip, six product cards, paired dataset/coverage and benchmark/developer panels, four solution cards, landscape contribution banner, and compact footer.

The raster reference is not an editable design source. Landscape and solution photographs were recreated, so their pixels differ. The coverage illustration is reused from the supplied image. Typography uses self-hosted Roboto and Noto Nastaliq Urdu, with system fallbacks. Font licenses are included in `assets/fonts/`.

The front end remains a prototype:

- The microphone button only starts/stops a labelled visual sample animation. It neither records nor plays audio, and makes no model request.
- Language examples are sample copy, pending native-speaker review.
- Dataset hours and speaker counts remain unpublished; access links open an email request.
- Coverage numbers are explicitly labelled as illustrative design targets.
- Benchmark scores remain unpublished until measured. The comparison layout includes the reference's Average column.
- Code tabs show proposed SDK interfaces, not currently available packages or endpoints.
- Documentation and product links lead to relevant homepage sections. Partnership and contribution actions open email. Only the verified repository is linked as a social destination.

## Deployment

The existing GitHub Actions workflow deploys pushes to `main` to GitHub Pages:

https://avais392.github.io/ai4pakistan-website/

## Asset prompts

Built-in image generation was used for the two new artwork assets:

1. **Landscape:** a clean, approximately 3:1 background matching the supplied hero; warm ivory mist and negative space at left, rugged northern mountains in the middle, Faisal Mosque below, green trees, Lahore Fort at right; no typography or interface elements.
2. **Solutions:** four equal editorial photo panels depicting a Pakistani farmer, a woman using a smartphone at a bank, a male headset support agent, and a woman using a smartphone outdoors; warm natural light and muted ivory/green palette; no text or logos.

## Validation

Checked in headless Chromium at 1440, 1055, 768, 390, and 320 pixels: no horizontal page overflow and both local font families loaded. Verified language/sample synchronization, keyboard tab changes, code example switching, sample animation state, mobile menu opening/Escape closing, valid section anchors, loaded images, and no JavaScript runtime errors. Dataset and benchmark tables scroll within their panels on narrow screens.
