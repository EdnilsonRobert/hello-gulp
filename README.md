# Hello, Gulp!

Mini projeto para teste de funcionalidades da ferramenta Gulp

## Funções

- ** Tarefa principal ** : `default`
    - Aciona a tarefa `browser-sync` com live reload
    - Assiste alterações de HTML, SCSS e JS através das tarefas `pack-html`, `pack-css` e `pack-js`
- ** Tarefas manuais ** :
    - `pack-images`: otimiza imagens que ainda não foram otimizadas
    - `close-pack`: copia arquivos complementares para o local adequado

## Lista de pacotes utilizados

### Servidor
Criar servidor local e sincronizar com browser.

- Pacotes: `gulp` `browser-sync`

### HTML
Formatar e minificar HTML

- Pacotes: `gulp-htmlcomb` `gulp-htmlmin`

### CSS
Prefixar vendors (não testado), transpilar e minificar CSS

- Pacotes: `gulp-autoprefixer` `gulp-sass`

> TODO: <br>
- [ ] Testar autoprefixer

### JavaScript
Validar, concatenar e minificar JS

- Pacotes: `gulp-concat` `gulp-jshint` `gulp-uglify`

### Imagens
Otimizar imagens

- Pacotes: `gulp-changed` `gulp-imagemin`

> TODO: <br>
- [ ] Aplicar formatos MozJPEG e WebP <br>
- [ ] Recordar imagens

### Pacotes auxiliares
Renomear e gerar sourcemaps

- Pacotes: `gulp-rename` `gulp-sourcemaps`

---

Sugestões? Envie email para <have.fun@css.cafe>.
