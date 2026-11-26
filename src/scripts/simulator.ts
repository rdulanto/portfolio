// Motor de los simuladores. Corre solo en el navegador: no guarda ni envía respuestas.
// Los datos llegan en un <script type="application/json"> que arma el componente Astro.

type Any = Record<string, any>;

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const pick = (v: any, r: string) => (v && typeof v === 'object' && !Array.isArray(v) ? v[r] : v);
const pad = (n: number) => String(n).padStart(2, '0');
const track = (name: string, params: Any = {}) => {
  const w = window as any;
  if (typeof w.gtag === 'function') w.gtag('event', name, params);
};
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cambia el contenido del escenario con un fundido corto y lleva el foco al título nuevo. */
function swap(stage: HTMLElement, html: string, focus = true) {
  const apply = () => {
    stage.innerHTML = html;
    stage.classList.remove('out');
    stage.classList.add('in');
    requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove('in')));
    if (focus) stage.querySelector<HTMLElement>('[data-focus]')?.focus({ preventScroll: true });
    const top = stage.closest('.sim')!.getBoundingClientRect().top;
    if (top < 0) stage.closest('.sim')!.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  };
  if (reduced() || !stage.innerHTML.trim()) return apply();
  stage.classList.add('out');
  setTimeout(apply, 140);
}

function progress(i: number, n: number, label: string) {
  return `<div class="sim-progress" role="group" aria-label="${esc(label)}">
    <span class="mono">${pad(i)} / ${pad(n)}</span>
    <span class="bar" aria-hidden="true"><span style="transform:scaleX(${(i / n).toFixed(3)})"></span></span>
  </div>`;
}

function ladder(levels: { t: string }[], current: number, label: string) {
  return `<ol class="ladder" aria-label="${esc(label)}">${levels
    .map((l, i) => `<li class="${i === current ? 'on' : i < current ? 'past' : ''}"${i === current ? ' aria-current="step"' : ''}><span class="mono">${pad(i + 1)}</span>${esc(l.t)}</li>`)
    .join('')}</ol>`;
}

/* ------------------------------------------------------------------ */
/* Autodiagnóstico para pymes                                          */
/* ------------------------------------------------------------------ */

export function initSme(root: HTMLElement) {
  const D: Any = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!);
  const stage = root.querySelector<HTMLElement>('.sim-stage')!;
  const qs: Any[] = D.data.questions;
  const total = qs.length + 1; // + rubro
  let rubro = '';
  let answers: number[] = [];

  const qText = (q: Any) => pick(q.q, rubro);
  const qOpts = (q: Any): Any[] => (Array.isArray(q.options) ? q.options : q.options[rubro]);

  function start() {
    answers = [];
    swap(stage, `
      ${progress(1, total, D.ui.progress)}
      <fieldset class="q">
        <legend><h2 tabindex="-1" data-focus>${esc(D.ui.rubroQ)}</h2></legend>
        <div class="opts grid-2">
          ${D.data.rubros.map((r: Any, i: number) => `
            <label class="opt tile"><input type="radio" name="rubro" value="${r.id}" ${r.id === rubro ? 'checked' : ''}>
              <span class="key mono" aria-hidden="true">${i + 1}</span>
              <span><strong>${esc(r.t)}</strong><small>${esc(r.d)}</small></span></label>`).join('')}
        </div>
      </fieldset>`, false);
  }

  function ask(i: number) {
    const q = qs[i];
    swap(stage, `
      ${progress(i + 2, total, D.ui.progress)}
      <fieldset class="q">
        <legend><h2 tabindex="-1" data-focus>${esc(qText(q))}</h2></legend>
        ${q.hint ? `<p class="hint">${esc(q.hint)}</p>` : ''}
        <div class="opts">
          ${qOpts(q).map((o: Any, k: number) => `
            <label class="opt"><input type="radio" name="q${i}" value="${k}" ${answers[i] === k ? 'checked' : ''}>
              <span class="key mono" aria-hidden="true">${String.fromCharCode(65 + k)}</span><span>${esc(o.t)}</span></label>`).join('')}
        </div>
      </fieldset>
      <div class="sim-nav"><button type="button" class="btn btn-ghost" data-back><span aria-hidden="true">←</span> ${esc(D.ui.back)}</button></div>`);
    stage.dataset.step = String(i);
  }

  function result() {
    const scoredIdx = qs.map((q, i) => (q.scored ? i : -1)).filter((i) => i >= 0);
    const score = scoredIdx.reduce((s, i) => s + qOpts(qs[i])[answers[i]].pts, 0);
    const level = D.data.levels.findIndex((l: Any) => score <= l.max);
    const L = D.data.levels[level];
    // oportunidades: puntaje 0-1, ordenadas por prioridad elegida, puntaje y peso del rubro
    const weight: string[] = D.data.weight[rubro];
    const prioQ = qs.findIndex((q) => q.id === 'prioridad');
    const prioOpp = D.data.priorityOpp[answers[prioQ]];
    const cand = scoredIdx.map((i) => ({ opp: qs[i].opp, pts: qOpts(qs[i])[answers[i]].pts }));
    cand.sort((a, b) =>
      (b.opp === prioOpp ? 1 : 0) - (a.opp === prioOpp ? 1 : 0) || a.pts - b.pts || weight.indexOf(a.opp) - weight.indexOf(b.opp));
    const top = cand.filter((c) => c.pts <= 1).slice(0, 3);
    const fill = cand.filter((c) => c.pts > 1 && !top.includes(c));
    while (top.length < 3 && fill.length) top.push(fill.shift()!);
    const cajaQ = qs.findIndex((q) => q.id === 'caja');
    const hours = Math.round(Math.max(0, D.data.cajaMinutes[answers[cajaQ]] - 10) * 26 / 60);
    const opps = top.map((c) => {
      const o = D.data.opportunities.find((x: Any) => x.id === c.opp);
      let gain = pick(o.gain, rubro);
      if (gain === 'CAJA') gain = hours >= 2 ? D.ui.cajaHours.replace('{h}', hours) : D.ui.cajaOk;
      return { ...o, title: pick(o.title, rubro), gain };
    });
    const svcKey = level <= 1 ? 'diag' : level === 2 ? 'board' : 'auto';
    const svc = D.data.services[svcKey];
    const extra = opps.some((x) => x.id === 'whatsapp') && svcKey !== 'auto' ? D.data.services.auto : null;
    const rubroName = D.data.rubros.find((r: Any) => r.id === rubro).t;
    const shareText = D.ui.shareText.replace('{rubro}', rubroName.toLowerCase()).replace('{nivel}', L.t)
      + '\n' + opps.map((x, k) => `${k + 1}. ${x.title}`).join('\n') + '\n' + location.href;
    track('sim_result', { sim: 'pyme', rubro, level: L.n });

    swap(stage, `
      <div class="result">
        <p class="eyebrow">${esc(D.ui.resultEyebrow.replace('{rubro}', rubroName))}</p>
        <h2 tabindex="-1" data-focus>${esc(D.ui.levelIs)} <span class="hl">${esc(L.t)}</span></h2>
        <p class="lead">${esc(L.d)}</p>
        ${ladder(D.data.levels, level, D.ui.ladder)}
        <h3 class="sub">${esc(D.ui.oppsTitle)}</h3>
        <ol class="opps">
          ${opps.map((x, k) => `<li class="card"><span class="mono">${pad(k + 1)}</span><div><strong>${esc(x.title)}</strong><p>${esc(x.gain)}</p></div></li>`).join('')}
        </ol>
        <p class="fine">${esc(D.ui.disclaimer)}</p>
        <div class="svc band-box">
          <p class="mono">${esc(D.ui.svcTitle)}</p>
          <h3>${esc(svc.t)}${extra ? ` + ${esc(extra.t)}` : ''}</h3>
          <p>${esc(svc.d)}${extra ? ' ' + esc(extra.d) : ''}</p>
          <div class="ctas">
            <a class="btn btn-primary" href="${esc(D.booking)}" target="_blank" rel="noopener" data-cta>${esc(D.ui.cta)} <span class="arrow" aria-hidden="true">→</span></a>
            <button type="button" class="btn btn-ghost" data-share>${esc(D.ui.share)}</button>
          </div>
        </div>
        <div class="sim-nav"><button type="button" class="btn btn-ghost" data-restart>${esc(D.ui.restart)}</button></div>
      </div>`);
    stage.dataset.step = 'result';
    stage.dataset.share = shareText;
  }

  root.addEventListener('change', (e) => {
    const inp = e.target as HTMLInputElement;
    if (inp.type !== 'radio') return;
    setTimeout(() => {
      if (inp.name === 'rubro') { rubro = inp.value; track('sim_start', { sim: 'pyme', rubro }); return ask(0); }
      const i = Number(inp.name.slice(1));
      answers[i] = Number(inp.value);
      i + 1 < qs.length ? ask(i + 1) : result();
    }, reduced() ? 0 : 180);
  });
  root.addEventListener('click', async (e) => {
    const el = (e.target as HTMLElement).closest('button, a');
    if (!el) return;
    if (el.hasAttribute('data-back')) {
      const i = Number(stage.dataset.step);
      i > 0 ? ask(i - 1) : start();
    } else if (el.hasAttribute('data-restart')) { rubro = ''; start(); }
    else if (el.hasAttribute('data-cta')) track('sim_cta', { sim: 'pyme', rubro });
    else if (el.hasAttribute('data-share')) {
      const text = stage.dataset.share || '';
      track('sim_share', { sim: 'pyme' });
      if (navigator.share) { try { await navigator.share({ text }); return; } catch { return; } }
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    }
  });
  // Atajos: 1-4 o A-D eligen una opción.
  root.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key.toUpperCase();
    const idx = /^[1-4]$/.test(k) ? Number(k) - 1 : /^[A-D]$/.test(k) ? k.charCodeAt(0) - 65 : -1;
    if (idx < 0) return;
    const inp = stage.querySelectorAll<HTMLInputElement>('.opts input')[idx];
    if (inp) { inp.checked = true; inp.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  start();
}

/* ------------------------------------------------------------------ */
/* Madurez en datos e IA                                               */
/* ------------------------------------------------------------------ */

function radar(dims: Any[], scores: number[], label: string) {
  const W = 320, C = W / 2, R = 125, n = dims.length;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n, r = (R * v) / 5;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  const ring = (v: number) => dims.map((_, i) => pt(i, v).map((x) => x.toFixed(1)).join(',')).join(' ');
  const poly = scores.map((s, i) => pt(i, s).map((x) => x.toFixed(1)).join(',')).join(' ');
  const labels = dims.map((d, i) => {
    const [x, y] = pt(i, 5.75);
    const anchor = Math.abs(x - C) < 4 ? 'middle' : x > C ? 'start' : 'end';
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${esc(d.short)}</text>`;
  }).join('');
  return `<svg class="radar" viewBox="-56 -6 ${W + 112} ${W + 12}" role="img" aria-label="${esc(label)}">
    ${[1, 2, 3, 4, 5].map((v) => `<polygon class="ring" points="${ring(v)}"/>`).join('')}
    ${dims.map((_, i) => { const [x, y] = pt(i, 5); return `<line class="spoke" x1="${C}" y1="${C}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('')}
    <polygon class="area" points="${poly}"/>
    ${scores.map((s, i) => { const [x, y] = pt(i, s); return `<circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`; }).join('')}
    ${labels}
  </svg>`;
}

export function initMaturity(root: HTMLElement) {
  const D: Any = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!);
  const stage = root.querySelector<HTMLElement>('.sim-stage')!;
  const dims: Any[] = D.data.dims;
  const scale: string[] = D.data.scale;
  let answers: number[][] = dims.map(() => [0, 0, 0]);
  const fmt = new Intl.NumberFormat(D.lang === 'es' ? 'es-PE' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function intro() {
    swap(stage, `
      <div class="intro">
        <h2 tabindex="-1" data-focus>${esc(D.ui.introTitle)}</h2>
        <p class="lead">${esc(D.ui.introLead)}</p>
        <ol class="dim-list">${dims.map((d, i) => `<li><span class="mono">${pad(i + 1)}</span>${esc(d.t)}</li>`).join('')}</ol>
        <div class="ctas"><button type="button" class="btn btn-primary" data-start>${esc(D.ui.start)} <span class="arrow" aria-hidden="true">→</span></button></div>
      </div>`, false);
  }

  function ask(i: number) {
    const d = dims[i];
    const done = answers[i].every((v) => v > 0);
    swap(stage, `
      ${progress(i + 1, dims.length, D.ui.progress)}
      <div class="q">
        <p class="eyebrow">${esc(D.ui.dimension)} ${pad(i + 1)}</p>
        <h2 tabindex="-1" data-focus>${esc(d.t)}</h2>
        <p class="hint">${esc(D.ui.howTrue)}</p>
        <ol class="scale-legend mono" aria-hidden="true">${scale.map((s, k) => `<li><b>${k + 1}</b> ${esc(s)}</li>`).join('')}</ol>
        ${d.items.map((it: string, j: number) => `
          <fieldset class="stmt">
            <legend>${esc(it)}</legend>
            <div class="seg">
              ${scale.map((s, k) => `<label title="${esc(s)}"><input type="radio" name="d${i}s${j}" value="${k + 1}" ${answers[i][j] === k + 1 ? 'checked' : ''}><span aria-hidden="true">${k + 1}</span><span class="sr">${k + 1}. ${esc(s)}</span></label>`).join('')}
            </div>
            <p class="picked" aria-live="polite">${answers[i][j] ? esc(scale[answers[i][j] - 1]) : '&nbsp;'}</p>
          </fieldset>`).join('')}
      </div>
      <div class="sim-nav">
        <button type="button" class="btn btn-ghost" data-back><span aria-hidden="true">←</span> ${esc(D.ui.back)}</button>
        <button type="button" class="btn btn-primary" data-next ${done ? '' : 'disabled'}>${esc(i + 1 < dims.length ? D.ui.next : D.ui.seeResult)} <span class="arrow" aria-hidden="true">→</span></button>
      </div>`);
    stage.dataset.step = String(i);
  }

  function result() {
    const scores = answers.map((a) => a.reduce((s, v) => s + v, 0) / a.length);
    const global = scores.reduce((s, v) => s + v, 0) / scores.length;
    let level = 0;
    D.data.levels.forEach((l: Any, k: number) => { if (global >= l.min) level = k; });
    const L = D.data.levels[level];
    const order = scores.map((s, i) => ({ s, i })).sort((a, b) => a.s - b.s);
    const prio: number[] = [order[0].i, order[1].i];
    const strat = dims.findIndex((d) => d.id === 'strategy');
    prio.push(scores[strat] < 3 && !prio.includes(strat) ? strat : order[2].i);
    const svc = dims[order[0].i].service;
    track('sim_result', { sim: 'madurez', level: L.t, score: Number(global.toFixed(1)) });

    swap(stage, `
      <div class="result">
        <p class="eyebrow">${esc(D.ui.resultEyebrow)}</p>
        <div class="score-head">
          <h2 tabindex="-1" data-focus>${esc(D.ui.levelIs)} <span class="hl">${esc(L.t)}</span></h2>
          <p class="big num"><span>${fmt.format(global)}</span><small>/ 5</small></p>
        </div>
        <p class="lead">${esc(L.d)}</p>
        ${ladder(D.data.levels, level, D.ui.ladder)}
        <div class="viz">
          ${radar(dims, scores, D.ui.radarLabel)}
          <ul class="bars">
            ${dims.map((d, i) => `<li class="${prio.includes(i) ? 'low' : ''}"><span>${esc(d.t)}</span><span class="num">${fmt.format(scores[i])}</span><span class="track" aria-hidden="true"><span style="transform:scaleX(${(scores[i] / 5).toFixed(3)})"></span></span></li>`).join('')}
          </ul>
        </div>
        <h3 class="sub">${esc(D.ui.prioTitle)}</h3>
        <ol class="opps">
          ${prio.map((i, k) => `<li class="card"><span class="mono">${pad(k + 1)}</span><div><strong>${esc(dims[i].t)}</strong><p>${esc(dims[i].action)}</p><a class="link" href="${esc(D.serviceHref[dims[i].service])}">${esc(D.data.services[dims[i].service])} <span aria-hidden="true">→</span></a></div></li>`).join('')}
        </ol>
        <p class="fine">${esc(D.ui.disclaimer)}</p>
        <div class="svc band-box">
          <p class="mono">${esc(D.ui.svcTitle)}</p>
          <h3>${esc(D.data.services[svc])}</h3>
          <p>${esc(D.ui.svcLead)}</p>
          <div class="ctas">
            <a class="btn btn-primary" href="${esc(D.booking)}" target="_blank" rel="noopener" data-cta>${esc(D.ui.cta)} <span class="arrow" aria-hidden="true">→</span></a>
            <button type="button" class="btn btn-ghost" data-print>${esc(D.ui.print)}</button>
          </div>
        </div>
        <div class="sim-nav"><button type="button" class="btn btn-ghost" data-restart>${esc(D.ui.restart)}</button></div>
      </div>`);
    stage.dataset.step = 'result';
  }

  root.addEventListener('change', (e) => {
    const inp = e.target as HTMLInputElement;
    const m = inp.name.match(/^d(\d+)s(\d+)$/);
    if (!m) return;
    const [i, j] = [Number(m[1]), Number(m[2])];
    answers[i][j] = Number(inp.value);
    const p = inp.closest('fieldset')!.querySelector('.picked')!;
    p.textContent = scale[answers[i][j] - 1];
    const next = stage.querySelector<HTMLButtonElement>('[data-next]')!;
    next.disabled = !answers[i].every((v) => v > 0);
  });
  root.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('button, a');
    if (!el) return;
    const i = Number(stage.dataset.step);
    if (el.hasAttribute('data-start')) { track('sim_start', { sim: 'madurez' }); ask(0); }
    else if (el.hasAttribute('data-next')) i + 1 < dims.length ? ask(i + 1) : result();
    else if (el.hasAttribute('data-back')) i > 0 ? ask(i - 1) : intro();
    else if (el.hasAttribute('data-restart')) { answers = dims.map(() => [0, 0, 0]); intro(); }
    else if (el.hasAttribute('data-print')) { track('sim_print', { sim: 'madurez' }); window.print(); }
    else if (el.hasAttribute('data-cta')) track('sim_cta', { sim: 'madurez' });
  });
  intro();
}
