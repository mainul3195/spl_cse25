(() => {
  const search = document.querySelector('#topicSearch');
  const status = document.querySelector('#searchStatus');
  const items = [...document.querySelectorAll('.pipeline-item')];
  const parts = [...document.querySelectorAll('.part')];
  const expandAll = document.querySelector('#expandAll');
  const collapseAll = document.querySelector('#collapseAll');

  const updateSearch = () => {
    const q = (search?.value || '').trim().toLowerCase();
    let matches = 0;

    items.forEach(item => {
      const hit = !q || item.dataset.search.includes(q);
      item.classList.toggle('hidden', !hit);
      if (hit) {
        matches += 1;
        if (q) item.open = true;
      }
    });

    parts.forEach(part => {
      const visible = [...part.querySelectorAll('.pipeline-item')].some(item => !item.classList.contains('hidden'));
      part.classList.toggle('hidden', !visible);
    });

    if (status) {
      status.textContent = q ? `${matches} major topic${matches === 1 ? '' : 's'} matched your search.` : '';
    }
  };

  search?.addEventListener('input', updateSearch);
  expandAll?.addEventListener('click', () => items.filter(x => !x.classList.contains('hidden')).forEach(x => x.open = true));
  collapseAll?.addEventListener('click', () => items.forEach(x => x.open = false));
})();
