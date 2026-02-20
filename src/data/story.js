export const scenes = [
  {
    id: 'gate',
    title: 'The Haunted Entrance',
    bg: '/backgrounds/gate.png',
    lines: [
      { who: 'alex', text: "It's a beautiful day to look at some data! But why does the air feel so... cold?" },
      { who: 'sam', text: "Perhaps because you're standing right through my spectral ribs, child." },
      { who: 'alex', text: "AAAH! A ghost bear! Wait... are you... Professor Sam from the 1995 faculty records?" },
      { who: 'sam', text: "The very same. I see you've found my old dataset. **19,792** records of academic life... and pay." },
    ],
  },
  {
    id: 'lawn',
    title: 'The Statistical Field',
    bg: '/backgrounds/lawn.png',
    lines: [
      { who: 'alex', text: 'I was just looking at the fields. Most faculty are in "Other" (**66.4%**), then Professional (**19.2%**), and Arts (**14.3%**).' },
      { who: 'sam', text: "Look closer at the gender divide. In my day, men dominated Professional fields at **21.6%**, while women were often in Arts and Other." },
      { who: 'alex', text: "The Chi-square test gives a **p-value < 2.2e-16**. It's definitely not random." },
    ],
  },
  {
    id: 'path',
    title: 'Echoes of the Past',
    bg: '/backgrounds/path.png',
    lines: [
      { who: 'alex', text: "Even the hiring years are strange. On average, women were hired much later — mean year **1980** vs **1975** for men." },
      { who: 'sam', text: 'We called it the "seniority gap." The Welch t-test doesn\'t lie: **t ≈ -13.13**.' },
      { who: 'alex', text: "So women had less time to climb the ranks. That changes everything about the pay gap." },
    ],
  },
  {
    id: 'building',
    title: 'The Glass Ceiling',
    bg: '/backgrounds/building.png',
    lines: [
      { who: 'sam', text: "Look at the 1995 ranks. Over **60%** of men were Full Professors. For women? Barely **30.8%**." },
      { who: 'alex', text: "The pay gap is huge. Mean monthly salary for women was **$5,397**, but for men it was **$6,732**. That's over **$1,300** difference!" },
      { who: 'sam', text: "The data is a ghost of our choices, Alex. Field, seniority, and rank — they all weight the scales." },
    ],
  },
  {
    id: 'bench',
    title: 'A New Beginning',
    bg: '/backgrounds/bench.png',
    lines: [
      { who: 'alex', text: "So to truly understand the gap, we have to look at the whole history, not just the final number." },
      { who: 'sam', text: "Precisely. Now, shall we move on to the regression? I haven't felt this much statistical power in decades." },
      { who: 'alex', text: "Wait... can ghost bears do linear modeling? 🐻‍❄️📊" },
    ],
  },
];

// Format **bold** markers to highlighted spans
export function formatLine(raw) {
  return raw
    .replace(/\*\*(.+?)\*\*/g, '<span class="stat-highlight">$1</span>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
