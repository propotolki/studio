# Повторный конкурентный анализ (V2)

Дата: 2026-05-01

## Бенчмарки
- Airbnb
- Vrbo
- Booking.com
- Авито Недвижимость
- Суточно.ру
- Островок

## Что улучшилось с прошлого анализа

По сравнению с прошлой итерацией в проект добавлены:

1. Поиск с полнотекстовым query + ранжирование.
2. Геокластеризация маркеров на карте.
3. Пайплайн выплат/сверки/чарджбэков.
4. Статусы чата (sent/delivered/read) + read endpoint.
5. Избранное, календарь доступности, модерация отзывов, лента уведомлений.
6. Админская операционная аналитика и гостевая отмена брони.

Вывод: платформа сместилась от «скелета API» к **операционному MVP+**.

---

## Текущая оценка зрелости против лидеров

- Против Airbnb/Vrbo/Booking: **~35–40%**
- Против Авито/Суточно.ру/Островок (локальные паттерны РФ): **~40–45%**

Причина роста: появились важные рыночные механики (поиск, модерация отзывов, чарджбэки, payout, availability, notification loops).

---

## Сравнение по ключевым capability-блокам

## 1) Search & Discovery
**Сейчас есть:**
- полнотекстовый поиск,
- фильтры по цене,
- базовый ranking,
- geo clusters.

**Отставание от лидеров:**
- нет ML-ranking,
- нет персонализации на уровне пользователя,
- нет quality-score и CTR/booking-conversion сигналов в ранжировании,
- нет гибкой фасетной системы (amenities, house rules, instant book и т.д.).

## 2) Booking engine
**Сейчас есть:**
- дневная модель брони,
- смена статусов,
- отмена гостем,
- availability layer.

**Отставание:**
- нет race-safe lock с транзакциями/адвайзори-локами,
- нет SLA таймеров (auto-expire pending),
- нет продвинутых тарифных правил и сезонных матриц.

## 3) Payments/Finance
**Сейчас есть:**
- VK Pay webhook,
- payouts,
- reconciliation snapshot,
- chargebacks.

**Отставание:**
- нет двойной бухгалтерской модели ledger,
- нет settlement calendar,
- нет risk reserve и автоматического холда/релиза,
- нет глубокой отчетности для финансового контроля.

## 4) Trust & Safety
**Сейчас есть:**
- reports -> disputes,
- review moderation,
- admin queues.

**Отставание:**
- нет KYC/AML pipeline,
- нет anti-fraud scoring engine,
- нет device fingerprint/risk graph,
- нет policy automation для high-risk кейсов.

## 5) Messaging & Communication
**Сейчас есть:**
- чат брони,
- read/delivery status,
- уведомления.

**Отставание:**
- нет web socket/realtime channel,
- нет media attachments moderation,
- нет smart templates и автонапоминаний по lifecycle.

## 6) Host tooling
**Сейчас есть:**
- календарь доступности,
- price override,
- payout history,
- host stats.

**Отставание:**
- нет unit economics (RevPAR/ADR/occupancy detailed),
- нет bulk tools для портфеля объектов,
- нет channel-manager интеграций (для hotel-like supply).

## 7) Admin/Ops
**Сейчас есть:**
- moderation queues,
- disputes list,
- KPI snapshot.

**Отставание:**
- нет полноценного case-management UI,
- нет SLA dashboards и escalation matrix,
- нет audit replay / immutable event journal.

---

## Приоритеты следующей волны (что даст максимальный эффект)

1. **Transactional booking lock + expiration jobs**
2. **Event-driven architecture (outbox + workers) для webhook/chat/notifications**
3. **Ledger-first finance core (journal entries, settlements, reserve)**
4. **Realtime chat infra (Supabase Realtime / WebSocket) + attachments**
5. **Personalized ranking v2 (behavioral signals + quality score)**
6. **KYC + antifraud rules engine + risk scoring**
7. **Ops cockpit для модерации/споров с SLA и workflow automation**

---

## Резюме

Проект заметно вырос и уже покрывает большинство «обязательных» MVP-фич для rental marketplace.
Чтобы догнать лидеров, следующий фокус — не в количестве endpoint-ов, а в **надежности процессов**, **автоматизации risk/ops**, и **data-driven ranking/finance core**.
