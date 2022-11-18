# Инструкция разработчика rlic-gf-front

> Московская Жилищная Инспекция. Подсистема &#34;Выдача лицензий&#34;

## Технологии
Node 14
Vue 3

## Сборка и запуск для production
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Сборка проекта для production
Перед сборкой проекта необходимо в файле
.env изменить значение APP_HOST на адрес, по которому будет развернуто приложение, например:

    APP_HOST=http://mgi-int.fors.ru
затем В корневой директории проекта выполнить команду

    # install dependencies
    yarn install
затем

    # build for production
    yarn build

### Запуск проекта для production
После сборки проекта в корне проекта выполнить команду

    pm2 start

Настройки pm2 в файле ecosystem.config.js

## Сборка и запуск для разработки
В корневой директории проекта выполнить команду

    # install dependencies
    yarn install
затем запустить dev сборку

    # serve with hot reload at localhost:3000
    yarn dev

### Примечание
Проект необходимо запускать параллельно с проктов Реестр лицензиатов. Гос. услуга.
(rlic-front "Репозиторий РЛИЦ ГУ")

### Препроцессинг
Для teamplate используется pug

Для style используется sass
