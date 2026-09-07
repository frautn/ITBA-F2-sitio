// Loads shared nav/sidebar/footer partials and highlights the current page's menu entry.
document.addEventListener('DOMContentLoaded', () => {
  const includes = Array.from(document.querySelectorAll('[data-include]'));

  Promise.all(includes.map((el) =>
    fetch(el.getAttribute('data-include'))
      .then((res) => res.text())
      .then((html) => { el.innerHTML = html; })
  )).then(highlightActiveLink);
});

function highlightActiveLink() {
  const current = window.location.pathname;

  document.querySelectorAll('.tag-list .submenu a[href]').forEach((link) => {
    const linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
    if (linkPath !== current) return;

    link.classList.add('active');
    const submenu = link.closest('.collapse');
    if (!submenu) return;

    submenu.classList.add('show');
    const toggle = document.querySelector(`[aria-controls="${submenu.id}"]`);
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  });
}
