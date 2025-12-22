# Интеграция MoonShine (Admin) — руководство

Этот файл описывает шаги по установке и настройке панели администратора MoonShine для проекта WPS.

Важно: перед установкой убедитесь, что ваш проект работает локально и у вас есть рабочий `composer` и `php`.

## 1. Установка пакета

1. В корне проекта выполните:

```bash
composer require moonshine/moonshine
```

2. Запустите инсталлятор MoonShine (создаст базовую конфигурацию и опционально администратора):

```bash
php artisan moonshine:install -Q
```

После этого панель обычно доступна по пути `/admin` (или как указано в конфиге).

Если хотите пропустить создание пользователя при установке, используйте `--without-user`.

## 2. Быстрая настройка администратора

Если при установке вы не создали пользователя, можно создать администратора вручную:

```bash
php artisan tinker
>>> \App\Models\User::create([ 'name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('secret'), 'is_admin' => true ]);
```

Или добавьте сидер для удобства.

MoonShine использует собственную систему аутентификации по-умолчанию, но можно настроить интеграцию с существующей `users` таблицей.

## 3. Дополнительные пакеты и безопасность

-   2FA (опционально):

```bash
composer require moonshine/two-factor
php artisan migrate
```

-   Socialite (опционально):

```bash
composer require moonshine/socialite
php artisan vendor:publish --provider="MoonShine\\Socialite\\Providers\\SocialiteServiceProvider"
php artisan migrate
```

## 4. Создание ресурсов для моделей (пример)

Ниже — примерный шаблон ресурса MoonShine для модели `Event`. Создайте файлы в `app/MoonShine/Resources` или по пути вашего приложения.

Пример: `app/MoonShine/Resources/EventResource.php`

```php
<?php

namespace App\\MoonShine\\Resources;

use App\\Models\\Event;
use MoonShine\\Resources\\Resource;
use MoonShine\\Fields\\ID;
use MoonShine\\Fields\\Text;
use MoonShine\\Fields\\Textarea;
use MoonShine\\Fields\\DateTime;
use MoonShine\\Fields\\Badge;

class EventResource extends Resource
{
    public static string $model = Event::class;

    public function title(): string
    {
        return 'События';
    }

    public function fields(): array
    {
        return [
            ID::make('id'),
            Text::make('title', 'Заголовок'),
            Badge::make('category', 'Категория'),
            DateTime::make('start_date', 'Начало'),
            DateTime::make('end_date', 'Окончание'),
            Textarea::make('description', 'Описание'),
        ];
    }
}
```

Аналогично создайте `NewsResource`, `PartnerResource`, `AwardResource` с полями, релевантными вашим моделям.

Если пакет предоставляет artisan-команду для создания ресурсов (проверьте `php artisan list | grep moonshine`), используйте её.

## 5. Меню и навигация

MoonShine автоматически подхватывает зарегистрированные ресурсы и показывает их в меню. При необходимости настройте позицию и иконки в ресурсах через соответствующие методы/поля.

## 6. Развертывание и интеграция с Docker / VPS

Если вы используете Docker — просто выполните установку пакета внутри контейнера `app` (через `docker compose exec app composer require moonshine/moonshine`), затем запустите `php artisan moonshine:install -Q` в контейнере.

На VPS рекомендуется:

-   установить MoonShine в production режиме;
-   проверить, что `APP_URL` и `APP_ENV=production` установлены в `.env`;
-   обеспечить доступ к `/storage` и `bootstrap/cache` с правильными правами;
-   настроить обратный прокси/NGINX для `your-domain.com/admin` и включить HTTPS.

## 7. Примеры команд

```bash
# Установка
composer require moonshine/moonshine
php artisan moonshine:install -Q

# Создать ресурс вручную (пример)
mkdir -p app/MoonShine/Resources
# добавить класс EventResource.php (см. пример выше)

# Запустить локально
php artisan serve
# Открыть: http://127.0.0.1:8000/admin
```

## 8. Тестирование

1. Убедитесь, что через `/admin` доступна страница логина.
2. Войдите под админом и проверьте CRUD для каждой созданной модели.
3. Проверьте права доступа и, при необходимости, настройте 2FA.

## 9. Что я могу сделать дальше (предложения)

-   Создать реальные ресурсы `EventResource`, `NewsResource`, `PartnerResource`, `AwardResource` и закоммитить их;
-   Добавить сидер для админ-пользователя;
-   Настроить роли/права если нужно более тонкое разграничение доступа;
-   Интегрировать MoonShine с существующей системой пользователей (Breeze/Jetstream), если хотите единую аутентификацию;
-   Автоматизировать установку в Dockerfile / docker-compose (выполнять `composer require` и `php artisan moonshine:install` в билд-стадии или в entrypoint).

Если подтверждаешь — могу:

1. автоматически добавить шаблоны ресурсов в `app/MoonShine/Resources` (создам файлы-заготовки),
2. добавить сидер для создания admin пользователя,
3. обновить `README` и `DOCKER.md` под этап интеграции.

## Автоматическая установка (скрипт)

Я добавил скрипт `scripts/install_moonshine.sh`, который выполняет в корне проекта:

-   `composer require moonshine/moonshine`
-   `php artisan vendor:publish --tag=moonshine-config --force`
-   `php artisan moonshine:install -Q`
-   `php artisan migrate --force`
-   `php artisan db:seed --class=AdminUserSeeder --force`

Запустить скрипт:

```bash
chmod +x scripts/install_moonshine.sh
./scripts/install_moonshine.sh
```

Скрипт полезен для быстрой локальной установки и подготовки админ-панели. При деплое в контейнере запускайте те же команды внутри контейнера `app`.

---

Если нужно, могу:

1. добавить вызов этого скрипта в `DOCKER.md` и `README_RU.txt`;
2. подготовить `docker-compose` и Dockerfile для production с автоматическим билдом и установкой MoonShine;
3. настроить роли/политики доступа в `AuthServiceProvider`.
