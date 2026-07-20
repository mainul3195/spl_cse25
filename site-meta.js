(() => {
  const release = Object.freeze({
    version: '1.1.0',
    updatedISO: '2026-07-20',
    updatedDisplay: '20 July 2026',
    author: 'Mainul Hasan'
  });

  window.CCourseRelease = release;

  const fillReleaseDetails = () => {
    document.querySelectorAll('[data-release-version]').forEach(node => {
      node.textContent = release.version;
    });
    document.querySelectorAll('[data-release-date]').forEach(node => {
      node.textContent = release.updatedDisplay;
      if (node.tagName === 'TIME') node.dateTime = release.updatedISO;
    });
    document.querySelectorAll('[data-release-author]').forEach(node => {
      node.textContent = release.author;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillReleaseDetails, { once: true });
  } else {
    fillReleaseDetails();
  }
})();
