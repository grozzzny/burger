# Stellar Burgers | TypeScript, React, Vite

Добро пожаловать в проект "Stellar Burgers"! Этот проект представляет собой веб-приложение для бургерной на краю Вселенной, созданное с использованием React и TypeScript с целью обучения в рамках курса React от Yandex Practicum. 

Сайт проекта: [https://stellar-burgers.grozzzny.host](https://stellar-burgers.grozzzny.host)

## Установка проекта из репозитория

Проект доступен на GitHub по следующей ссылке: [Stellar Burgers](https://github.com/grozzzny/burger).

Для установки проекта выполните следующие шаги:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/grozzzny/burger.git
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd burger
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Задайте ENV переменные:
   ```bash
   API_URI=https://norma.nomoreparties.space/api
   WS_URI=wss://norma.nomoreparties.space
   ```

# Установка с помощью готового образа Docker

Следуйте этим шагам, чтобы установить приложение с помощью готового образа Docker.

## Шаг 1: Установите Docker

Убедитесь, что на вашем компьютере установлен Docker. Если Docker не установлен, загрузите и установите его с [официального сайта Docker](https://www.docker.com/products/docker-desktop).

## Шаг 2: Скачайте образ

Запросите доступ к образу у администратора используя OAuth-токен

```bash
echo <OAuth-токен> | docker login \
  --username oauth \
  --password-stdin \
 cr.yandex
```

В терминале выполните следующую команду:

```bash
docker pull cr.yandex/crpihaj4nsdcd13jls8t/burger:prod
```

## Шаг 3: Запустите контейнер
После успешного скачивания образа запустите контейнер с помощью команды:

```bash
docker run --name burger -d -p 8080:4173 cr.yandex/crpihaj4nsdcd13jls8t/burger:prod
```

## Технологии
* Typescript
* React
* Redux Toolkit
* React-dnd
* Jest
* Cypress
