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
    <a class="sales-phone" href="tel:+74993993501">+7 (499) 399-35-01</a>
    <a class="cart-link" href="cart.html" aria-label="Корзина">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10.5" cy="20.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="20.5" r="1.5" fill="currentColor"/></svg>
      <span class="cart-label">Корзина</span><span class="cart-count"></span>
    </a>
  </div>
  <div class="nav-bar"><nav class="container nav-row" aria-label="Основное меню">
    <a class="nav-catalog" href="catalog.html">Каталог</a>
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
        <p>Комплексные поставки нержавеющего металлопроката, трубопроводной арматуры и комплектующих стандарта DIN, SMS, ГОСТ.</p>
      </div>
      <div>
        <h4>Каталог</h4>
        <a href="catalog.html?cat=truby">Трубы нержавеющие</a>
        <a href="catalog.html?cat=listy">Листы нержавеющие</a>
        <a href="catalog.html?cat=fitingi">Фитинги и соединения</a>
        <a href="catalog.html?cat=krany">Краны и арматура</a>
        <a href="catalog.html?cat=flantsy">Фланцы и детали</a>
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
        <a href="tel:+74993993501" style="font-weight:700;">+7 (499) 399-35-01</a>
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
    <div class="footer-bottom">
      <span>© 2026 ООО «МЕТАЛЛ-ИСТ» (METALL EAST). Все права защищены.</span>
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
    <form>
      <h3>Запросить счёт и КП</h3>
      <p>Укажите размеры, марку стали и количество.</p>
      <div class="field"><input type="text" name="name" placeholder="Ваше имя / Организация" required></div>
      <div class="field"><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required></div>
      <div class="field"><input type="email" name="email" placeholder="Email для счёта"></div>
      <div class="field"><textarea name="msg" rows="3" placeholder="Марка стали (AISI 304/316), диаметр Ду, объём заказа"></textarea></div>
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
if (headerEl) headerEl.innerHTML = HEADER_HTML;
if (footerEl) footerEl.innerHTML = FOOTER_HTML + MODAL_HTML;
