<script setup lang='ts'>
import { onMounted } from 'vue';

onMounted(() => {
  (function () {
    const cx = 122, cy = 122, r = 122;
    const tickG = document.getElementById('tick-marks');
    const labelG = document.getElementById('hour-labels');
    const hourLabels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // 绘制刻度
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
      const isHour = i % 5 === 0;
      const isMajor = i % 15 === 0;
      const outerR = r - 6;
      const innerR = isMajor ? outerR - 18 : (isHour ? outerR - 13 : outerR - 6);

      const x1 = cx + outerR * Math.cos(angle);
      const y1 = cy + outerR * Math.sin(angle);
      const x2 = cx + innerR * Math.cos(angle);
      const y2 = cy + innerR * Math.sin(angle);

      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', x1.toString()); ln.setAttribute('y1', y1.toString());
      ln.setAttribute('x2', x2.toString()); ln.setAttribute('y2', y2.toString());
      ln.setAttribute('stroke-width', (isMajor ? 2.5 : (isHour ? 1.8 : 0.8)).toString());
      ln.setAttribute('stroke-linecap', 'round');
      ln.setAttribute('opacity', isHour ? '1' : '0.45');
      ln.style.stroke = isMajor ? 'var(--accent)' : (isHour ? 'var(--text-main)' : 'var(--text-muted)');
      tickG!.appendChild(ln);
    }

    // 绘制数字
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
      const labelR = r - 34;
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);

      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', lx.toString()); t.setAttribute('y', ly.toString());
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('font-size', i % 3 === 0 ? '13' : '11');
      t.setAttribute('font-weight', i % 3 === 0 ? '500' : '400');
      t.style.fill = i % 3 === 0 ? 'var(--text-main)' : 'var(--text-muted)';
      t.style.fontFamily = 'sans-serif';
      t.textContent = hourLabels[i].toString();
      labelG!.appendChild(t);
    }

    const handHour = document.getElementById('hand-hour');
    const handMin = document.getElementById('hand-min');
    const handSec = document.getElementById('hand-sec');
    const elH = document.getElementById('t-h');
    const elM = document.getElementById('t-m');
    const elS = document.getElementById('t-s');
    const elDate = document.getElementById('date-text');

    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    let prevH = -1, prevM = -1, prevS = -1, prevDateStr = '', prevSecDeg: number | null = null;

    function setRotate(el: HTMLElement, deg: number) {
      el.style.transform = `rotate(${deg}deg)`;
    }

    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      const secDeg = s * 6;
      const minDeg = (m + s / 60) * 6;
      const hourDeg = ((h % 12) + m / 60) * 30;

      // 秒针：整秒跳步，跨越0时禁用过渡防止反转
      if (prevSecDeg !== null && secDeg < prevSecDeg) {
        handSec!.classList.add('no-transition');
        requestAnimationFrame(() => {
          setRotate(handSec!, secDeg);
          requestAnimationFrame(() => handSec!.classList.remove('no-transition'));
        });
      } else {
        setRotate(handSec!, secDeg);
      }
      prevSecDeg = secDeg;

      setRotate(handHour!, hourDeg);
      setRotate(handMin!, minDeg);

      // 最小化 DOM 更新
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const ss = String(s).padStart(2, '0');
      if (elH!.textContent !== hh) elH!.textContent = hh;
      if (elM!.textContent !== mm) elM!.textContent = mm;
      if (elS!.textContent !== ss) elS!.textContent = ss;

      const dateStr = `${now.getFullYear()} · ${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')} · ${days[now.getDay()]}`;
      if (dateStr !== prevDateStr) { elDate!.textContent = dateStr; prevDateStr = dateStr; }
    }

    // 对齐整秒触发，避免漂移
    tick();
    const msToNext = 1000 - (Date.now() % 1000);
    setTimeout(() => { tick(); setInterval(tick, 1000); }, msToNext);

    // 适配 Tailwind 4.x dark 类
    function syncDark() {
      const wrap = document.getElementById('clock-wrap');
      document.documentElement.classList.contains('dark')
        ? wrap!.classList.add('dark')
        : wrap!.classList.remove('dark');
    }
    syncDark();
    new MutationObserver(syncDark).observe(document.documentElement, {
      attributes: true, attributeFilter: ['class']
    });
  })();
})
</script>

<template>
  <div class="clock-container" id="clock-wrap">
    <div class="clock-wrap" >
      <div class="clock-outer">
        <div class="clock-inner">
          <svg id="clock-svg" viewBox="0 0 244 244" width="244" height="244" xmlns="http://www.w3.org/2000/svg">
            <g id="tick-marks"></g>
            <g id="hour-labels"></g>
            
            <line id="hand-hour" class="hand-hour" x1="122" y1="122" x2="122" y2="68" stroke-width="6"
            stroke-linecap="round" style="stroke:var(--hand-hour);" />
            <line id="hand-min" class="hand-min" x1="122" y1="122" x2="122" y2="48" stroke-width="4"
            stroke-linecap="round" style="stroke:var(--hand-min);" />
            <line id="hand-sec" class="hand-sec" x1="122" y1="140" x2="122" y2="40" stroke-width="1.5"
            stroke-linecap="round" style="stroke:var(--hand-sec);" />
            
            <circle cx="122" cy="122" r="5" style="fill:var(--accent);" />
            <circle cx="122" cy="122" r="2" style="fill:var(--bg);" />
          </svg>
        </div>
      </div>
      
      <div class="time-display">
        <span id="t-h">00</span><span>:</span><span id="t-m">00</span><span>:</span><span id="t-s">00</span>
      </div>
      <div class="date-display" id="date-text">—</div>
    </div>
  </div>
  </template>

<style lang='scss'>
:root {
  --bg: #e0e5ec;
  --shadow-light: #ffffff;
  --shadow-dark: #a3b1c6;
  --text-main: #2d3748;
  --text-muted: #718096;
  --accent: #6c63ff;
  --hand-hour: #2d3748;
  --hand-min: #4a5568;
  --hand-sec: #6c63ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1e2330;
    --shadow-light: #2c3347;
    --shadow-dark: #10141e;
    --text-main: #e2e8f0;
    --text-muted: #718096;
    --accent: #7c74ff;
    --hand-hour: #e2e8f0;
    --hand-min: #cbd5e0;
    --hand-sec: #7c74ff;
  }
}

.dark {
  --bg: #1e2330;
  --shadow-light: #2c3347;
  --shadow-dark: #10141e;
  --text-main: #e2e8f0;
  --text-muted: #718096;
  --accent: #7c74ff;
  --hand-hour: #e2e8f0;
  --hand-min: #cbd5e0;
  --hand-sec: #7c74ff;
}

.clock-container {
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}
.clock-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem 3rem;
  border-radius: 32px;
}

.clock-outer {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: 10px 10px 24px var(--shadow-dark), -10px -10px 24px var(--shadow-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock-inner {
  width: 244px;
  height: 244px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: inset 6px 6px 16px var(--shadow-dark), inset -6px -6px 16px var(--shadow-light);
  position: relative;
}

.clock-inner svg {
  position: absolute;
  top: 0;
  left: 0;
}

.time-display {
  background: var(--bg);
  box-shadow: 4px 4px 12px var(--shadow-dark), -4px -4px 12px var(--shadow-light);
  border-radius: 20px;
  padding: 10px 32px;
  font-size: 22px;
  font-weight: 500;
  color: var(--text-main);
  letter-spacing: 3px;
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, 'Courier New', monospace;
  user-select: text;
  -webkit-user-select: text;
}

.date-display {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 1.5px;
  font-family: sans-serif;
  user-select: text;
  -webkit-user-select: text;
}

.hand-sec {
  transform-origin: 122px 122px;
  transition: transform 0.12s cubic-bezier(0.4, 2.2, 0.6, 1);
}

.hand-sec.no-transition {
  transition: none !important;
}

.hand-hour {
  transform-origin: 122px 122px;
}

.hand-min {
  transform-origin: 122px 122px;
}
</style>