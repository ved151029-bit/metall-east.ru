function steelGrade(product) {
  return (product.name + ' ' + product.spec).match(/AISI \d{3}L?|12Х18Н10Т/i)?.[0] ?? '';
}

function normalizeCatalogSearch(value) {
  return value.toLowerCase().replace(/[хx×]/g, '×').replace(/(\d)\.(?=\d)/g, '$1,')
    .replace(/\s*×\s*/g, '×').trim();
}

function renderCatalogOverview() {
  const order = ['krany', 'fitingi', 'flantsy', 'truby', 'listy'];
  const number = new Intl.NumberFormat('ru-RU');
  const plural = new Intl.PluralRules('ru');
  const folderLabels = { one: 'подраздел', few: 'подраздела', many: 'подразделов', other: 'подразделов' };
  const countLabels = { one: 'позиция', few: 'позиции', many: 'позиций', other: 'позиций' };

  document.getElementById('catalogOverviewGrid').innerHTML = order.map(id => {
    const category = CATEGORIES.find(item => item.id === id);
    const section = SECTIONS[id];
    const count = PRODUCTS.filter(product => product.cat === id).length;
    const folderCount = Object.keys(section.types).length;
    const name = category.name;
    return `
      <article class="catalog-category">
        <div class="catalog-category-content">
          <h2><a href="${catalogUrl(id)}">${name}</a></h2>
          <p>${section.foldersOnly ? number.format(folderCount) + ' ' + folderLabels[plural.select(folderCount)] : number.format(count) + ' ' + countLabels[plural.select(count)]}</p>
          ${section.foldersOnly ? '' : `<ul>${Object.entries(section.types).map(([key, title]) =>
            `<li><a href="${catalogUrl(id, key)}">${title}</a></li>`
          ).join('')}</ul>`}
        </div>
        <a class="catalog-category-photo" href="${catalogUrl(id)}" aria-label="${name}">
          <img src="${section.image}" alt="" width="96" height="96">
        </a>
      </article>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const category = CATEGORIES.find(item => item.id === params.get('cat'));
  if (!category && !params.get('q')?.trim() && params.get('view') !== 'all') {
    document.getElementById('catalogListing').hidden = true;
    renderCatalogOverview();
    document.getElementById('catalogOverview').hidden = false;
    return;
  }

  const section = category ? SECTIONS[category.id] : null;
  document.getElementById('tubeReferenceLink').hidden = Boolean(category && category.id !== 'truby');
  const typeParam = params.get('type');
  const requestedType = category?.id === 'fitingi' && typeParam === 'reducing-tees' ? 'tees' : typeParam;
  const legacyFlangeTypes = { flat: 'flat-gost', 'weld-neck': 'weld-neck-gost' };
  const selectedType = category?.id === 'flantsy' && Object.hasOwn(legacyFlangeTypes, requestedType)
    ? legacyFlangeTypes[requestedType]
    : requestedType;
  const type = section && Object.hasOwn(section.types, selectedType) ? selectedType : null;
  const sectionProducts = PRODUCTS.filter(product =>
    (!category || product.cat === category.id) && (!type || product.type === type)
  );

  const grid = document.getElementById('productsGrid');
  const search = document.getElementById('search');
  const grade = document.getElementById('grade');
  const stock = document.getElementById('stock');
  const sort = document.getElementById('sort');
  const title = type ? section.types[type] : category?.name;
  search.value = params.get('q') || '';
  if (title) {
    document.getElementById('catalogTitle').textContent = title;
    const path = document.getElementById('catalogPath');
    if (type) {
      const parent = document.createElement('a');
      parent.href = catalogUrl(category.id);
      parent.textContent = category.name;
      path.append(' / ', parent);
    }
    path.append(' / ' + title);
    document.title = title + ' — МЕТАЛЛ-ИСТ';
  }

  const catalogNav = document.getElementById('catalogNav');
  catalogNav.innerHTML = CATEGORIES.map(item => {
    const active = item.id === category?.id;
    const panelId = `catalog-subfolders-${item.id}`;
    const itemSection = SECTIONS[item.id];
    const children = Object.entries(itemSection.types).map(([key, name]) =>
      `<a class="catalog-subnav" href="${catalogUrl(item.id, key)}"${active && key === type ? ' aria-current="page"' : ''}>${name}</a>`
    ).join('');
    const parentLink = !itemSection.foldersOnly && (!active || type)
      ? `<a class="catalog-subnav" href="${catalogUrl(item.id)}">Все подразделы</a>`
      : '';
    return `<button type="button" class="catalog-nav-toggle${active ? ' is-current' : ''}" aria-expanded="${active}" aria-controls="${panelId}"${itemSection.foldersOnly && (!active || type) ? ` data-section-url="${catalogUrl(item.id)}"` : ''}>
      ${item.name} <span aria-hidden="true">›</span>
    </button>
    <div class="catalog-nav-subfolders" id="${panelId}"${active ? '' : ' hidden'}>
      ${parentLink}
      ${children}
    </div>`;
  }).join('');

  catalogNav.querySelectorAll('.catalog-nav-toggle').forEach(button => {
    const subfolders = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      if (button.dataset.sectionUrl) {
        location.assign(button.dataset.sectionUrl);
        return;
      }
      subfolders.hidden = !subfolders.hidden;
      button.setAttribute('aria-expanded', String(!subfolders.hidden));
    });
  });

  const sectionLinks = document.getElementById('catalogSections');
  if (section?.foldersOnly && !type) {
    document.getElementById('catalogListing').classList.add('catalog-folders-only');
    sectionLinks.classList.add('catalog-overview-grid', 'catalog-folders');
    sectionLinks.innerHTML = Object.entries(section.types).map(([key, name]) =>
      `<a class="catalog-folder" href="${catalogUrl(category.id, key)}">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M3 6h6l2 2h10v11H3z" stroke-linejoin="round"/>
        </svg>
        <strong>${name}</strong><span aria-hidden="true">→</span>
      </a>`
    ).join('');
    return;
  }
  if (section && !type) {
    sectionLinks.classList.add('catalog-types');
    sectionLinks.innerHTML = Object.entries(section.types).map(([key, name]) =>
      `<a href="${catalogUrl(category.id, key)}"${key === type ? ' aria-current="page"' : ''}>${name}</a>`
    ).join('');
  }

  const grades = [...new Set(sectionProducts.map(steelGrade).filter(Boolean))].sort();
  grades.forEach(value => grade.add(new Option(value, value)));

  const emptyMessage = type && !sectionProducts.length
    ? `<div class="empty"><p>Уточните размер, цену и наличие.</p>
        <button type="button" class="btn btn-ghost" data-modal data-request="${title}">Запросить КП</button></div>`
    : '<p class="empty">По выбранным параметрам ничего не найдено.</p>';

  function render() {
    const words = normalizeCatalogSearch(search.value).split(/\s+/).filter(Boolean);
    const products = sectionProducts.filter(product => {
      const text = normalizeCatalogSearch(product.name + ' ' + product.spec);
      return words.every(word => text.includes(word)) &&
        (!grade.value || steelGrade(product) === grade.value) &&
        (!stock.value || product.stock === stock.value);
    });
    if (sort.value === 'name') products.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    document.getElementById('resultCount').textContent = 'Позиций: ' + products.length;
    grid.innerHTML = products.map(product => `
      <article class="product-card">
        <a class="p-img" href="product.html?id=${product.id}">
          <img class="${product.photo ? 'photo' : ''}" src="${product.img}" alt="${product.name}" loading="lazy">
        </a>
        <div class="p-body">
          <div class="catalog-product-details">
            <span class="p-cat">${SECTIONS[product.cat].types[product.type]}</span>
            <a class="p-name" href="product.html?id=${product.id}">${product.name}</a>
            <p class="p-spec">${product.spec}</p>
            <p class="catalog-stock">${product.stock}</p>
          </div>
          <div class="p-foot">
            <span class="p-price">Цена по запросу</span>
            <button class="btn btn-blue" type="button" data-add="${product.id}" aria-label="В корзину: ${product.name}">В корзину</button>
          </div>
        </div>
      </article>`).join('') || emptyMessage;
  }

  search.addEventListener('input', render);
  [grade, stock, sort].forEach(control => control.addEventListener('change', render));
  document.getElementById('resetFilters').addEventListener('click', () => {
    search.value = grade.value = stock.value = sort.value = '';
    render();
  });
  const views = document.querySelectorAll('[data-view]');
  views.forEach(button => button.addEventListener('click', () => {
    grid.classList.toggle('catalog-list', button.dataset.view === 'list');
    views.forEach(view => view.setAttribute('aria-pressed', String(view === button)));
  }));
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    Cart.add(Number(button.dataset.add), 1);
    showToast('Товар добавлен в корзину');
  });
  render();
});
