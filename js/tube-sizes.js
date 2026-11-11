const tubeStandards = [
  { id: 'din', name: 'DIN 11850 · ряд 2', source: 'https://www.alfalaval.com/products/fluid-handling/din-11850-en-10357/' },
  { id: 'iso', name: 'ISO 2037:1992 · пищевые трубы', source: 'https://cdn.standards.iteh.ai/samples/6810/6143377103c7447ab2e8f109086be035/ISO-2037-1992.pdf' },
  { id: 'gost-welded', name: 'ГОСТ 11068-81 · электросварные', source: 'https://base.garant.ru/3924220/1cafb24d049dcd1e7707a22d98e9858f/' },
  { id: 'gost-cold', name: 'ГОСТ 9941-2022 · бесшовные холоднодеформированные', source: 'https://meganorm.ru/mega_doc/norm/gost_gosudarstvennyj-standart/0/gost_9941-2022_mezhgosudarstvennyy_standart_truby_besshovnye.html' },
  { id: 'gost-hot', name: 'ГОСТ 9940-81 · бесшовные горячедеформированные', source: 'https://meganorm.ru/Data2/1/4294848/4294848734.htm' },
];

const standardSelect = document.getElementById('tubeStandard');
const diameterSelect = document.getElementById('tubeDiameter');
const wallSelect = document.getElementById('tubeWall');
const quoteButton = document.getElementById('tubeRequest');
const rows = document.getElementById('tubeRows');
const formatTubeSize = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 3 });

function updateTubeQuote() {
  quoteButton.disabled = !wallSelect.value;
  const standard = tubeStandards[standardSelect.selectedIndex];
  const diameter = formatTubeSize.format(Number(diameterSelect.value));
  const wall = formatTubeSize.format(Number(wallSelect.value));
  quoteButton.dataset.request = wallSelect.value
    ? `Нержавеющая труба ${diameter}×${wall} мм · ${standard.name}\nМарка стали:\nДлина и количество:`
    : '';
}

function updateTubeDiameter() {
  const dimensions = TUBE_SIZES[standardSelect.value];
  const selected = dimensions.find(([diameter]) => String(diameter) === diameterSelect.value);
  wallSelect.replaceChildren(new Option('Выберите толщину', ''), ...(selected ?? []).slice(1)
    .map(wall => new Option(formatTubeSize.format(wall), wall)));
  wallSelect.disabled = !selected;
  rows.innerHTML = (selected ? [selected] : dimensions).map(([diameter, ...walls]) =>
    `<tr><th scope="row">${formatTubeSize.format(diameter)}</th><td>${walls.map(wall => formatTubeSize.format(wall)).join(' · ')}</td></tr>`
  ).join('');
  updateTubeQuote();
}

function updateTubeStandard() {
  const standard = tubeStandards[standardSelect.selectedIndex];
  diameterSelect.replaceChildren(new Option('Все диаметры', ''), ...TUBE_SIZES[standard.id]
    .map(([diameter]) => new Option(formatTubeSize.format(diameter), diameter)));
  document.getElementById('tubeCaption').textContent = standard.name;
  document.getElementById('tubeSource').href = standard.source;
  updateTubeDiameter();
}

standardSelect.replaceChildren(...tubeStandards.map(standard => new Option(standard.name, standard.id)));
standardSelect.addEventListener('change', updateTubeStandard);
diameterSelect.addEventListener('change', updateTubeDiameter);
wallSelect.addEventListener('change', updateTubeQuote);
updateTubeStandard();
