# Keepsake: лендінг на Vite, Pug і SCSS

**Демо:** https://kristinasalo8.github.io/landing-keepsake-vite/

## Вимоги до середовища

- Node.js 22 (на цій версії збирається CI) і npm

## Команди

```bash
npm install        # встановити залежності
npm run dev        # сервер розробки з live reload (http://localhost:5173/landing-keepsake-vite/)
npm run build      # збірка в папку dist
npm run preview    # локальний перегляд зібраного сайту
npm run images     # згенерувати AVIF, WebP і JPEG з src/assets/images-src
npm run format     # відформатувати код Prettier
npm run lint       # Stylelint (SCSS) + Prettier --check
```

## Структура проєкту

```
landing-keepsake-vite/
├─ .github/workflows/deploy.yml   #публікація на GitHub Pages
├─ .husky/pre-commit              #lint-staged перед комітом
├─ scripts/images.mjs             #оптимізація зображень (sharp)
├─ src/
│  ├─ assets/
│  │  ├─ images-src/              #вихідні JPG
│  │  └─ images/                  #згенеровані AVIF, WebP, JPEG (400w і 800w)
│  ├─ layouts/main.pug            #базовий шаблон (block, extends)
│  ├─ pages/index.pug             #сторінка: збирає секції
│  ├─ includes/                   #шрифти, meta
│  ├─ components/                 #header, footer, sections/ (по файлу на секцію)
│  ├─ mixins/                     #icon, btn, picture, work-card, section-head, social-list
│  ├─ data/                       #дані у вигляді масивів об'єктів
│  └─ styles/
│     ├─ main.scss                #єдина точка входу
│     ├─ utils/                   #змінні, брейкпоінти, функції, міксини
│     ├─ base/                    #:root (custom properties), reset, глобальні стилі
│     ├─ components/              #БЕМ-блоки: один блок, один файл
│     └─ layout/                  #container, section, header, hero, works, footer ...
├─ .browserslistrc                #цільові браузери
├─ postcss.config.js              #Autoprefixer
├─ .prettierrc, .prettierignore   #налаштування Prettier
├─ .stylelintrc.json              #правила Stylelint (БЕМ, вкладеність ≤ 3)
└─ vite.config.js                 #Vite, Pug, base для GitHub Pages
```

### Архітектура Pug

- `layouts/main.pug`: каркас сторінки з місцями під вміст (`block`).
- `pages/index.pug`: підключає каркас (`extends`), додає метатеги та стилі в `<head>` (`append`), вставляє шапку, секції та футер (`include`).
- `mixins/`: повторювані шматки розмітки (кнопка, картинка, картка, іконка), виклик через `+назва`.
- `data/`: тексти як масиви об'єктів, з яких розмітку створює `each`; `if` і `case` вибирають потрібні варіанти.

### Архітектура SCSS

- Підключення лише через `@use` і `@forward`: кожна папка має `index.scss`, `main.scss` збирає всі папки.
- `utils/`: змінні та map (кольори, шрифти, брейкпоінти), функція `rem()`, міксини `mq()`, `flex-center`, `focus-ring`, `visually-hidden`.
- `base/`: `@each` у `_root.scss` перетворює map кольорів на CSS-змінні (`--color-accent`), а також reset і глобальні стилі.
- `components/` і `layout/`: один БЕМ-блок, один файл (`&__element`, `&--modifier`), вкладеність не глибша за 3 рівні, без `id` і `!important`.
- Mobile first: стилі для більших екранів додаються через `@include mq(md)` або `mq(lg)`.

## Використані інструменти

| Інструмент                                 | Навіщо                                                        |
| ------------------------------------------ | ------------------------------------------------------------- |
| Vite                                       | Dev-сервер і збірка                                           |
| vituum + @vituum/vite-plugin-pug           | Компіляція Pug у HTML у середовищі Vite                       |
| Sass                                       | Компіляція SCSS                                               |
| PostCSS + Autoprefixer                     | Вендорні префікси відповідно до Browserslist                  |
| sharp                                      | Генерація AVIF, WebP і JPEG у двох ширинах (`npm run images`) |
| Prettier + @prettier/plugin-pug            | Єдиний стиль коду, включно з `.pug`                           |
| Stylelint + stylelint-config-standard-scss | Перевірка SCSS, правила БЕМ                                   |
| husky + lint-staged                        | Перевірка змінених файлів перед кожним комітом                |
| GitHub Actions + GitHub Pages              | Автоматична збірка і публікація                               |

## Цільові браузери (Browserslist)

Файл `.browserslistrc`:

```
last 2 Chrome versions
last 2 Firefox versions
last 2 Edge versions
last 2 Safari versions
last 2 ios_saf versions
```

## Результати оптимізації

### CSS

| Файл   | Розмір   |
| ------ | -------- |
| lab-07 | 22,81 kB |
| lab-09 | 18,70 kB |

### Зображення

| Зображення | Оригінал (JPG) | 400w AVIF | 400w WebP | 800w AVIF | 800w WebP | 800w JPEG |
| ---------- | -------------- | --------- | --------- | --------- | --------- | --------- |
| work-01    | 11,10 kB       | 10,31 kB  | 15,99 kB  | 21,13 kB  | 33,71 kB  | 51,75 kB  |
| journal-01 | 39,40 kB       | 15,71 kB  | 27,02 kB  | 35,38 kB  | 57,75 kB  | 84,45 kB  |
