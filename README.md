# VK Mini App — Rental Marketplace

Мульти-ролевое приложение аренды жилья для **VK Mini Apps** с тремя уровнями доступа:

- **Гость (guest)** — поиск, фильтры, бронирование, оплата, отзывы.
- **Хост (host)** — управление объектами, календарём, ценами, заявками.
- **Администратор (admin)** — модерация, пользователи, выплаты, аудит.

## Структура проекта

- `/catalog` — каталог объектов аренды (роль guest).
- `/owner` — кабинет хоста (управление объявлениями).
- `/admin` — админ-панель (модерация и статистика).
- `/map` — карта объектов.
- `/profile` — профиль пользователя.
- `/` — экран входа с демо-раутингом по роли.

## VK авторизация

В production:

1. Авторизация через **VK ID / VK Mini Apps Bridge**.
2. Бэкенд проверяет подпись initData и получает `vk_user_id`.
3. Роль пользователя хранится в БД (`guest`, `host`, `admin`).
4. Middleware и API policy ограничивают доступ по ролям.

Детальный план: `docs/blueprint.md`.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте `http://localhost:9002`.

Для демо-доступа на странице входа:

- `host` → кабинет хоста.
- `admin` → админ-панель.
- любой другой логин + пароль → каталог.

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

## Competitive extensions (phase 4)

- `GET /api/admin/analytics` — GMV, paid amount, moderation/disputes KPI snapshot.
- `PATCH /api/guest/bookings/[id]/cancel` — guest cancellation flow + host notification.
- `PATCH /api/notifications/mark-read` — bulk mark notifications as read.
- `GET /api/host/payouts` — host payout history endpoint.

## Competitive extensions (phase 5)

- `POST /api/metrics/listing-interaction` — behavioral signals collection (views/favorites/booking intents).
- `GET /api/search` now incorporates behavioral ranking signals from listing metrics.
- `POST /api/admin/workers/outbox-dispatch` — event outbox dispatcher for async processing.

## Competitive extensions (phase 6)

- `GET /api/host/calendar/ical` — iCal export for host booking sync.
- `POST /api/admin/workers/booking-expire` — background expiration of stale pending bookings.
- `GET /api/guest/recommendations` — personalized recommendations by favorite cities.

## Security hardening (phase 7)

- Timing-safe signature checks for VK auth and VK Pay webhook.
- In-memory rate limiting for sensitive endpoints.
- Payload hashing + replay protection table (`webhook_events`) for webhooks.
- Input sanitization for user-generated text in chat/reports.
- Event outbox kept for asynchronous secure processing.

## Competitive extensions (phase 8)

- `GET /api/admin/sla` — SLA dashboard for dispute response time breaches.
- Centralized audit logging (`audit_logs`) for critical state transitions.
- Audit hooks added for booking cancellation, host status changes, and review moderation.
