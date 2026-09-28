"use strict";
const samples = {
  Urdu: {
    lang: "ur",
    native:
      "السلام علیکم، کیا آپ مجھے پاکستان کے ٹورزم کے بارے میں بتا سکتے ہیں؟",
    roman:
      "Assalam o alaikum, kya aap mujhe Pakistan ke tourism ke baare mein bata sakte hain?",
    response:
      "وعلیکم السلام! پاکستان قدرتی حسن، ثقافتی ورثے اور مہمان نواز لوگوں کا خطہ ہے۔",
    translation:
      "Wa alaikum assalam! Pakistan is a land of natural beauty, rich cultural heritage, and hospitable people.",
  },
  Punjabi: {
    lang: "pa-Arab",
    native: "تسی مینوں پاکستان بارے دَس سکدے او؟",
    roman: "Tusi mainu Pakistan baare dass sakde o?",
    response:
      "جی آیاں نوں! پاکستان سوہنے پہاڑاں، وکھ وکھ بولیاں تے مہمان نواز لوکاں دی دھرتی اے۔",
    translation:
      "Welcome! Pakistan is a land of beautiful mountains, diverse languages, and welcoming people.",
  },
  Sindhi: {
    lang: "sd",
    native: "ڇا توهان مون کي پاڪستان بابت ٻڌائي سگهو ٿا؟",
    roman: "Chha tawhan mon khe Pakistan babat budhai sagho tha?",
    response: "پاڪستان قدرتي حسن، ثقافت ۽ مهمان نواز ماڻهن جو ملڪ آهي.",
    translation:
      "Pakistan is a country of natural beauty, culture, and hospitable people.",
  },
  Pashto: {
    lang: "ps",
    native: "تاسو ماته د پاکستان په اړه ویلای شئ؟",
    roman: "Taso ma ta da Pakistan pa ara wayalay shay?",
    response: "پاکستان د ښکلي طبیعت، بډایه کلتور او مېلمه پالو خلکو هېواد دی.",
    translation:
      "Pakistan is a country of beautiful landscapes, rich culture, and welcoming people.",
  },
  Saraiki: {
    lang: "skr",
    native: "تساں میکوں پاکستان بارے دس سڳدے او؟",
    roman: "Tusan mekun Pakistan bare das sagde o?",
    response: "پاکستان سوہݨے نظاریاں، ثقافت تے مہمان نواز لوکاں دا ملک ہے۔",
    translation:
      "Pakistan is a land of beautiful scenery, culture, and hospitable people.",
  },
};
const snippets = {
  Python:
    '# Transcribe audio with ai4pakistan\nfrom ai4pakistan import AudioClient\n\nclient = AudioClient(api_key="YOUR_API_KEY")\nresult = client.transcribe(\n    file_path="audio.wav",\n    language="ur")\n\nprint(result.text)  # پاکستان بہت خوبصورت ملک ہے',
  "Node.js":
    '// Proposed SDK interface\nimport { AudioClient } from "ai4pakistan";\n\nconst client = new AudioClient({\n  apiKey: "YOUR_API_KEY"\n});\nconst result = await client.transcribe({\n  file: "audio.wav", language: "ur"\n});\nconsole.log(result.text);',
  cURL: '# Proposed endpoint — not yet available\ncurl "$AI4PAKISTAN_API_URL/transcribe" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -F "file=@audio.wav" \\\n  -F "language=ur"',
  Flutter:
    '// Proposed SDK interface\nfinal client = AudioClient(\n  apiKey: "YOUR_API_KEY",\n);\nfinal result = await client.transcribe(\n  filePath: "audio.wav",\n  language: "ur",\n);\nprint(result.text);',
};
const languageTabs = [...document.querySelectorAll('.tabs [role="tab"]')];
function setLanguage(language) {
  const sample = samples[language];
  if (!sample) return;
  languageTabs.forEach((b) => {
    const active = b.dataset.language === language;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active);
    b.tabIndex = active ? 0 : -1;
  });
  document.querySelector("#language").value = language;
  document
    .querySelector("#sample-panel")
    .setAttribute("aria-labelledby", "lang-" + language);
  ["native", "roman", "response", "translation"].forEach(
    (id) => (document.getElementById(id).textContent = sample[id]),
  );
  ["native", "response"].forEach(
    (id) => (document.getElementById(id).lang = sample.lang),
  );
}
document
  .querySelectorAll("[data-language]")
  .forEach((b) =>
    b.addEventListener("click", () => setLanguage(b.dataset.language)),
  );
document
  .querySelector("#language")
  .addEventListener("change", (e) => setLanguage(e.target.value));
function keyboardTabs(tabs, activate) {
  tabs.forEach((tab, index) =>
    tab.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (e.key === "ArrowLeft")
        next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[next].focus();
      activate(tabs[next]);
    }),
  );
}
keyboardTabs(languageTabs, (b) => setLanguage(b.dataset.language));
const codeTabs = [...document.querySelectorAll("[data-code]")];
function setCode(tab) {
  codeTabs.forEach((b) => {
    const active = b === tab;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active);
    b.tabIndex = active ? 0 : -1;
  });
  document.getElementById("code-panel").setAttribute("aria-labelledby", tab.id);
  const code = document.getElementById("code");
  code.replaceChildren();
  snippets[tab.dataset.code].split("\n").forEach((line, index) => {
    const row = document.createElement("span");
    row.className =
      "code-line" + (/^\s*(#|\/\/)/.test(line) ? " code-comment" : "");
    const number = document.createElement("span");
    number.className = "line-no";
    number.textContent = index + 1;
    number.setAttribute("aria-hidden", "true");
    row.append(number, document.createTextNode(line || " "));
    code.append(row);
  });
}
codeTabs.forEach((b) => b.addEventListener("click", () => setCode(b)));
keyboardTabs(codeTabs, setCode);
const menu = document.querySelector(".menu"),
  nav = document.getElementById("navigation");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
const mic = document.querySelector(".microphone"),
  demo = document.querySelector(".demo"),
  status = document.getElementById("demo-status");
let timer = null,
  elapsed = 4;
function stopSample() {
  clearInterval(timer);
  timer = null;
  demo.classList.remove("playing");
  mic.setAttribute("aria-pressed", "false");
  mic.setAttribute("aria-label", "Play sample animation");
  status.textContent = "Sample preview";
}
mic.addEventListener("click", () => {
  if (timer) {
    stopSample();
    return;
  }
  elapsed = 4;
  demo.classList.add("playing");
  mic.setAttribute("aria-pressed", "true");
  mic.setAttribute("aria-label", "Pause sample animation");
  status.textContent = "Animation · no audio";
  timer = setInterval(() => {
    elapsed++;
    document.getElementById("time").textContent =
      `0:${String(elapsed).padStart(2, "0")} / 0:36`;
    if (elapsed >= 36) stopSample();
  }, 1000);
});
document.getElementById("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(
      document.getElementById("native").textContent,
    );
    status.textContent = "Transcript copied";
  } catch {
    status.textContent = "Select text to copy";
  }
});
setLanguage("Urdu");
setCode(codeTabs[0]);
