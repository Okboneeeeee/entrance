// === 捲動時高亮目前所在區塊的導覽按鈕 ===
const navLinks = [...document.querySelectorAll('#nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, {rootMargin:'-40% 0px -55% 0px', threshold:0});
sections.forEach(s=>io.observe(s));

function scrollToDept(event) {
  event.preventDefault(); // 阻止預設跳轉

  const target   = document.getElementById('dept');
  const offset   = -200;    // 上方預留距離
  const duration = 2000;    // 總時長（ms），越大越慢

  const start    = window.scrollY || window.pageYOffset;
  const end      = target.getBoundingClientRect().top + start + offset;
  const distance = end - start;
  const startTime = performance.now();

  // 若有在 CSS 設定 html { scroll-behavior: smooth; }，可能造成「雙重平滑」
  // 建議移除或在這裡強制用程式動畫。
  function animate(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);   // 0 → 1
    const linear   = progress;                          // ✅ 均速

    window.scrollTo(0, start + distance * linear);

    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


