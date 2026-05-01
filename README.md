# VK Mini App — Rental Marketplace (Airbnb-like)

Прототип мульти-ролевого приложения аренды жилья для **VK Mini Apps** с тремя уровнями доступа:

- **Гость (user)** — поиск, фильтры, бронирование, оплата, отзывы.
- **Хост (owner/host)** — управление объектами, календарём, ценами, заявками.
- **Администратор (admin)** — модерация, пользователи, выплаты, аудит.

## Что уже есть в этом репозитории

- Базовый фронтенд на Next.js с готовыми страницами ролей:
  - `/menu` — витрина/каталог (роль пользователя).
  - `/owner` — кабинет хоста.
  - `/admin` — админ-панель.
- Экран логина (`/`) с демо-раутингом по роли.

## VK авторизация и разные доступы

В production-версии:

1. Авторизация через **VK ID / VK Mini Apps Bridge**.
2. Бэкенд проверяет подпись initData и получает `vk_user_id`.
3. Роль пользователя хранится в БД (`guest`, `host`, `admin`).
4. Middleware и API policy ограничивают доступ:
   - `guest` → только пользовательские endpoints.
   - `host` → только свои объекты/бронирования.
   - `admin` → модерация и системные действия.

Детальный технический план: `docs/blueprint.md`.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте `http://localhost:9002`.

Для демо-доступа на странице входа:

- `host` в поле телефона → кабинет хоста.
- `admin` в поле телефона → админ-панель.
- любое другое непустое значение + пароль → пользовательский сценарий.

## Backend readiness (implemented scaffold)

Added backend/API scaffolding for marketplace modules:

- `src/app/api/auth/vk/route.ts` — VK auth endpoint placeholder (signature validation TODO).
- `src/app/api/guest/*` — guest endpoints for listings/bookings.
- `src/app/api/host/*` — host endpoints for listings/bookings management.
- `src/app/api/admin/*` — admin moderation/user management endpoints.
- `src/app/api/payments/vkpay/webhook/route.ts` — VK Pay webhook receiver placeholder.
- `src/app/api/chat/route.ts` — chat messaging endpoint placeholder.
- `src/app/api/trust-safety/reports/route.ts` — trust & safety reports endpoint.

RBAC middleware:

- `middleware.ts` protects `/api/guest`, `/api/host`, `/api/admin`, `/owner`, `/admin`.
- Session resolver in `src/lib/server/auth.ts` (demo headers now, replace with real session check).

Supabase:

- SQL bootstrap in `supabase/schema.sql`.
- Clients in `src/lib/server/supabase.ts`.
- Env example in `.env.example`.

### Where to insert real logic

Each endpoint contains `TODO` blocks with exact integration spots for:

- VK signature validation,
- booking engine,
- host ownership checks,
- moderation queue,
- VK Pay verification and payment state transitions,
- chat persistence and anti-spam,
- trust & safety workflows.

## New competitive modules added

- `GET /api/search` — advanced listing search with sorting and pricing filters.
- `GET/POST /api/guest/reviews` — review system (post-booking) with moderation status flow.
- `GET /api/host/stats` — host business dashboard metrics (bookings/revenue).
- `GET /api/admin/disputes` — dispute queue for marketplace support operations.
- `POST /api/trust-safety/reports` — report creation now auto-creates dispute record.

## Competitive extensions (phase 2)

- `GET /api/search` now supports full-text query (`q`) + ranking sorting.
- `GET /api/map/clusters` provides geo-clustering data for map markers.
- `POST /api/payments/payouts` host payout request pipeline.
- `GET /api/payments/reconciliation` finance reconciliation snapshot.
- `POST /api/payments/chargebacks` chargeback workflow creation.
- `POST /api/chat/[bookingId]/read` + `PATCH /api/chat/[bookingId]/status` read receipts and delivery statuses.

## Competitive extensions (phase 3)

- `GET/POST/DELETE /api/guest/favorites` — favorites flow for guests.
- `GET/POST /api/host/availability` — host day-by-day calendar and price overrides.
- `GET/PATCH /api/admin/moderation/reviews` — admin review moderation queue.
- `GET /api/notifications` — user notification feed.
