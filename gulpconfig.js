const path = require('path');

let insertIcon = (icon) => {
  return path.join(__dirname, `${app.paths.icons}/${icon}`);
}

let app = {
  name: 'GulpJS',
  appID: 'GulpJS',
  paths: {
    icons: './src/icons'
  }
}

exports.messages = {
  gulp: {
    isRunning: {
      title: app.name,
      message: 'GulpJS is running and works like a charm.',
      icon: insertIcon('icon-gulp.png'),
      appID: app.appID
    }
  },
  html: {
    update: {
      title: 'HTML',
      message: 'O arquivo HTML foi atualizado.',
      icon: insertIcon('icon-success.png'),
      appID: app.appID
    }
  }
}
