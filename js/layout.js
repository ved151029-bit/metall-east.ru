const LOGO_MARK = '<img class="logo-mark" src="img/metall-ist-mark.png" alt="" width="55" height="56">';
const BRAND = `<a href="index.html" class="logo">
  ${LOGO_MARK}
  <span class="brand-name"><b>МЕТАЛЛ-ИСТ</b><small>Нержавеющий прокат и арматура</small></span>
</a>`;

const HEADER_HTML = `
<header class="site-header">
  <div class="service-bar"><div class="container service-inner">
    <span>Москва · Пн–Пт 9:00–18:00</span>
    <a href="mailto:ag@metall-east.ru">ag@metall-east.ru</a>
  </div></div>
  <div class="container brand-row">
    ${BRAND}
    <form class="site-search" action="catalog.html" role="search">
      <input name="q" type="search" aria-label="Поиск по каталогу" placeholder="Поиск по каталогу">
      <button type="submit">Найти</button>
    </form>
    <a class="sales-phone" href="tel:+79661528800">+7 (966) 152-88-00</a>
    <a class="cart-link" href="cart.html" aria-label="Корзина">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="20.5" r="1.5" fill="currentColor"/></svg>
      <span class="cart-label">Корзина</span><span class="cart-count"></span>
    </a>
  </div>
  <div class="nav-bar"><nav class="container nav-row" aria-label="Основное меню">
    <div class="nav-catalog-wrap">
      <a class="nav-catalog" href="catalog.html" aria-controls="headerCatalog" aria-expanded="false">Каталог</a>
      <div class="nav-catalog-panel" id="headerCatalog" hidden>
        <div class="nav-catalog-grid">
          ${CATEGORIES.map(category => `
            <div class="nav-catalog-group">
              <a class="nav-catalog-heading" href="${catalogUrl(category.id)}">${category.name}</a>
              <ul>${Object.entries(SECTIONS[category.id].types).map(([type, title]) =>
                `<li><a href="${catalogUrl(category.id, type)}">${title}</a></li>`
              ).join('')}</ul>
            </div>`
          ).join('')}
        </div>
        <a class="nav-catalog-all" href="catalog.html">Весь каталог →</a>
      </div>
    </div>
    <a href="about.html">О компании</a>
    <a href="about.html#delivery">Доставка</a>
    <a href="contacts.html">Контакты</a>
    <button type="button" class="btn btn-blue" data-modal>Запросить КП</button>
  </nav></div>
</header>`;

const FOOTER_HTML = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        ${BRAND}
        <p>Комплексные поставки нержавеющего металлопроката, трубопроводной арматуры и комплектующих стандарта DIN, ISO, SMS, ГОСТ.</p>
      </div>
      <div>
        <h4>Каталог</h4>
        <a href="catalog.html?cat=truby">Трубы нержавеющие</a>
        <a href="catalog.html?cat=listy">Листы нержавеющие</a>
        <a href="catalog.html?cat=fitingi">Фитинги и соединения</a>
        <a href="catalog.html?cat=krany">Запорная арматура</a>
        <a href="catalog.html?cat=flantsy">Фланцы</a>
      </div>
      <div>
        <h4>Компания</h4>
        <a href="about.html">О компании</a>
        <a href="about.html#production">Производство</a>
        <a href="about.html#delivery">Доставка</a>
        <a href="contacts.html">Контакты и реквизиты</a>
      </div>
      <div>
        <h4>Контакты</h4>
        <a href="tel:+79661528800">+7 (966) 152-88-00</a>
        <a href="mailto:ag@metall-east.ru" style="color:var(--accent);">ag@metall-east.ru</a>
        <div class="requisites" style="margin-top:10px;line-height:1.5;font-size:12px;color:var(--muted);">
          <b style="color:#fff;">ООО «МЕТАЛЛ-ИСТ»</b><br>
          ИНН 7704429127 · КПП 771501001 · ОГРН 1177746634515<br>
          127282, г. Москва, Чермянский пр-д, д. 7, помещ. 1/2<br>
          Руководитель: Попов Андрей Геннадьевич
        </div>
      </div>
    </div>
    <div class="footer-notices">
      <p>Работаем только с юридическими лицами и ИП по безналичному расчету!</p>
      <p>Внимание! Информация, представленная на сайте носит ознакомительный характер и не является публичной офертой определяемой положениями ст. 437 ГК РФ.</p>
    </div>
    <div class="footer-bottom">
      <a href="privacy.html">Политика обработки персональных данных</a>
      <span>© 2017 ООО «МЕТАЛЛ-ИСТ» (METALL-EAST). Все права защищены.</span>
    </div>
  </div>
</footer>`;

// ==========================================================================
// 5. МОДАЛЬНОЕ ОКНО ЗАЯВКИ
// ==========================================================================
const MODAL_HTML = `
<div class="modal" id="modal">
  <div class="modal-backdrop" data-close></div>
  <div class="modal-box">
    <button class="modal-close" aria-label="Закрыть" data-close>×</button>
    <form method="post">
      <h3>Запросить счёт и КП</h3>
      <p>Укажите размеры, марку стали и количество.</p>
      <div class="field"><input type="text" name="name" placeholder="Ваше имя / Организация" required></div>
      <div class="field"><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required></div>
      <div class="field"><input type="email" name="email" placeholder="Email для счёта"></div>
      <div class="field"><textarea name="msg" rows="3" placeholder="Марка стали (AISI 304/316), диаметр Ду, объём заказа"></textarea></div>
      <div class="personal-consent"><label><input type="checkbox" name="personalDataConsent" value="yes" required> Даю согласие на обработку персональных данных</label><a href="consent.html" target="_blank" rel="noopener">Текст согласия (новая вкладка)</a> · <a href="privacy.html" target="_blank" rel="noopener">Политика обработки</a></div>
      <button type="submit" class="btn btn-blue" style="width:100%;justify-content:center">Открыть письмо</button>
      <p class="form-note">Откроется черновик письма. Отправьте его из почтового приложения на ag@metall-east.ru.</p>
    </form>
  </div>
</div>`;

// ==========================================================================
// 6. ВСТАВКА В СТРАНИЦУ
// ==========================================================================
const headerEl = document.getElementById('site-header');
const footerEl = document.getElementById('site-footer');
if (headerEl) {
  headerEl.innerHTML = HEADER_HTML;
  const menu = headerEl.querySelector('.nav-catalog-wrap');
  const trigger = menu.querySelector('.nav-catalog');
  const panel = menu.querySelector('.nav-catalog-panel');

  function setCatalogOpen(open) {
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  }

  menu.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setCatalogOpen(true);
  });
  menu.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !panel.contains(document.activeElement)) setCatalogOpen(false);
  });
  trigger.addEventListener('click', event => {
    if (event.detail === 0 || !matchMedia('(hover: hover)').matches) {
      event.preventDefault();
      setCatalogOpen(panel.hidden);
    }
  });
  menu.addEventListener('focusout', event => {
    if (!menu.contains(event.relatedTarget) && !menu.matches(':hover')) setCatalogOpen(false);
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      setCatalogOpen(false);
      trigger.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) setCatalogOpen(false);
  });
}
if (footerEl) footerEl.innerHTML = FOOTER_HTML + MODAL_HTML;

const cookieNoticeKey = 'metall-east-cookie-notice-dismissed';
let cookieNoticeDismissed = false;
try {
  cookieNoticeDismissed = localStorage.getItem(cookieNoticeKey) === 'yes';
} catch {
  // Show the notice when browser storage is unavailable.
}

if (!cookieNoticeDismissed) {
  document.body.insertAdjacentHTML('beforeend', `
    <aside class="cookie-notice" aria-label="Уведомление о хранении данных в браузере">
      <button class="cookie-notice-close" type="button" aria-label="Закрыть уведомление">×</button>
      <p>Для работы сайта используются локальное хранилище браузера, в котором сохраняется корзина.
        Подробнее в <a href="privacy.html">Политике обработки персональных данных</a>.
      </p>
      <button class="cookie-notice-ok" type="button">Понятно</button>
    </aside>`);
  const notice = document.querySelector('.cookie-notice');
  notice.addEventListener('click', event => {
    if (!event.target.closest('button')) return;
    try {
      localStorage.setItem(cookieNoticeKey, 'yes');
    } catch {
      // The notice can still be closed on this page.
    }
    notice.remove();
  });
}
