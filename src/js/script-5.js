class CustomIcon extends HTMLElement {
  constructor() {
    super();

    let self = this;

    let type = self.getAttribute('type');
    let color = self.hasAttribute('color') ? self.getAttribute('color') : 'gray';
    let size = self.hasAttribute('size') ? self.getAttribute('size') : 60;

    let iconTypes = {
      info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${size}" height="${size}"><path d=" M 26.211 27.158 L 33.789 27.158 L 33.789 48 L 26.211 48 L 26.211 27.158 Z  M 34.737 16.737 C 34.737 19.35 32.613 21.474 30 21.474 C 27.385 21.472 25.265 19.352 25.263 16.737 C 25.263 14.124 27.387 12 30 12 C 32.613 12 34.737 14.124 34.737 16.737 Z " fill="${color}"/></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${size}" height="${size}"><path d=" M 43.941 16.063 L 24.193 35.804 L 16.059 27.678 L 12 31.737 L 24.193 43.937 L 48 20.122 L 43.941 16.063 Z " fill="${color}"/></svg>`,
      error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${size}" height="${size}"><path d=" M 18.541 13.99 L 14 18.538 L 25.433 29.99 L 14 41.424 L 18.547 46.01 L 30 34.557 L 41.453 46.01 L 46 41.424 L 34.567 29.99 L 46 18.538 L 41.453 13.99 L 30 25.424 L 18.541 13.99 Z " fill="${color}"/></svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="${size}" height="${size}"><path d=" M 27 12 L 27 36 L 33 36 L 33 12 L 27 12 Z  M 27 42 L 27 48 L 33 48 L 33 42 L 27 42 Z " fill-rule="evenodd" fill="${color}"/></svg>`
    };

    self.innerHTML = (type in iconTypes) ? iconTypes[type] :
      '<p>O tipo escolhido para o ícone é inválido.</p>';
  }
}

customElements.define('custom-icon', CustomIcon);
