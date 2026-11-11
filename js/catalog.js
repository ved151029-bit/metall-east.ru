const SECTIONS = {
  truby: {
    image: 'img/cat-pipes.jpg',
    types: { welded: 'Сварные трубы', seamless: 'Бесшовные трубы', profile: 'Профильные трубы' },
  },
  listy: {
    image: 'img/cat-sheets.jpg',
    types: { mirror: 'Зеркальные листы', matte: 'Матовые листы', 'hot-rolled': 'Горячекатаные листы' },
  },
  fitingi: {
    image: 'img/cat-fittings.png',
    types: { elbows: 'Отводы', tees: 'Тройники', reducers: 'Переходы' },
  },
  krany: {
    image: 'img/cat-valves.jpg',
    types: { 'ball-valves': 'Шаровые краны', 'gate-valves': 'Задвижки' },
  },
  flantsy: {
    image: 'img/cat-flanges.jpg',
    types: { flat: 'Плоские фланцы', 'weld-neck': 'Воротниковые фланцы' },
  },
};

function catalogUrl(category, type) {
  const query = new URLSearchParams({ cat: category });
  if (type) query.set('type', type);
  return 'catalog.html?' + query;
}

function steelGrade(product) {
  return (product.name + ' ' + product.spec).match(/AISI \d{3}L?|12Х18Н10Т/i)?.[0] ?? '';
}

function normalizeCatalogSearch(value) {
  return value.toLowerCase().replace(/[хx×]/g, '×').replace(/(\d)\.(?=\d)/g, '$1,')
    .replace(/\s*×\s*/g, '×').trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const category = CATEGORIES.find(item => item.id === params.get('cat'));
  const section = category ? SECTIONS[category.id] : null;
  const requestedType = params.get('type');
  const type = section && Object.hasOwn(section.types, requestedType) ? requestedType : null;
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
    document.getElementById('catalogPath').textContent = ' / ' + title;
    document.title = title + ' — МЕТАЛЛ-ИСТ';
  }

  document.getElementById('catalogNav').innerHTML = CATEGORIES.map(item => {
    const active = item.id === category?.id;
    const children = active ? Object.entries(SECTIONS[item.id].types).map(([key, name]) =>
      `<a class="catalog-subnav" href="${catalogUrl(item.id, key)}"${key === type ? ' aria-current="page"' : ''}>${name}</a>`
    ).join('') : '';
    return `<a href="${catalogUrl(item.id)}"${active && !type ? ' aria-current="page"' : ''}>${item.name}<span aria-hidden="true">›</span></a>${children}`;
  }).join('');

  const sectionLinks = document.getElementById('catalogSections');
  if (!section && !search.value.trim()) {
    sectionLinks.innerHTML = CATEGORIES.map(item => `
      <article class="catalog-section">
        <a class="catalog-section-title" href="${catalogUrl(item.id)}">
          <img src="${SECTIONS[item.id].image}" alt="">
          <strong>${item.name}</strong><span aria-hidden="true">→</span>
        </a>
        <div>${Object.entries(SECTIONS[item.id].types).map(([key, name]) =>
          `<a href="${catalogUrl(item.id, key)}">${name}</a>`).join('')}</div>
      </article>`).join('');
  } else if (section) {
    sectionLinks.classList.add('catalog-types');
    sectionLinks.innerHTML = Object.entries(section.types).map(([key, name]) =>
      `<a href="${catalogUrl(category.id, key)}"${key === type ? ' aria-current="page"' : ''}>${name}</a>`
    ).join('');
  }

  const grades = [...new Set(sectionProducts.map(steelGrade).filter(Boolean))].sort();
  grades.forEach(value => grade.add(new Option(value, value)));

  function render() {
    const words = normalizeCatalogSearch(search.value).split(/\s+/).filter(Boolean);
    const products = sectionProducts.filter(product => {
      const text = normalizeCatalogSearch(product.name + ' ' + product.spec);
      return words.every(word => text.includes(word)) &&
        (!grade.value || steelGrade(product) === grade.value) &&
        (!stock.value || product.stock === stock.value);
    });
    if (sort.value === 'name') products.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    if (sort.value === 'price-up') products.sort((a, b) => a.price - b.price);
    if (sort.value === 'price-down') products.sort((a, b) => b.price - a.price);

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
            <span class="p-price">${priceFmt(product.price)} <small>/ ${product.unit}</small></span>
            <button class="btn btn-blue" type="button" data-add="${product.id}" aria-label="В корзину: ${product.name}">В корзину</button>
          </div>
        </div>
      </article>`).join('') || '<p class="empty">По выбранным параметрам ничего не найдено.</p>';
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
