# Конкурентный gap-анализ

Дата анализа: 2026-05-01

## С чем сравниваем
- Airbnb
- Vrbo
- Booking.com
- Авито (недвижимость посуточно)
- Суточно.ру
- Островок

## Текущее состояние проекта

### Что уже есть
- Роли `guest/host/admin` + middleware RBAC.
- Supabase schema, RLS-политики, базовые API для листингов/броней/модерации.
- VK auth verify (HMAC), VK Pay webhook skeleton.
- Чат и уведомления на уровне базовых endpoint-ов.
- Карта (Yandex Static Map) для отображения объектов.

### Что это означает
Проект сейчас — **MVP-скелет платформы**, но не full-featured OTA/marketplace.

---

## Отличия от Airbnb / Vrbo / Booking.com

## 1. Supply-side (контент объектов)
Недостает:
- Полноценной модели объекта (тип жилья, beds/rooms/bathrooms, amenities taxonomy).
- Медиа-менеджера (галерея, порядок фото, валидация качества).
- House rules, cancellation policies, check-in instructions.
- Content quality scoring и анти-спам объявлений.

Почему важно:
- Airbnb/Vrbo/Booking heavily завязаны на структуре контента и trust signals.

## 2. Search & ranking
Недостает:
- Ranking engine (релевантность, цена, качество, конверсия, геодистанция).
- Полнотекстового поиска + фасетных фильтров.
- Гео-поиска по bounds/polygon + кластеризации маркеров.
- Персонализации выдачи.

## 3. Booking engine
Недостает:
- Atomic availability locking (исключение гонок).
- Calendar sync (iCal/Airbnb style imports/exports).
- Гибких тарифов и seasonality rules.
- Политик предоплаты и штрафов.

## 4. Payments & finance
Недостает:
- Полного lifecycle платежей: auth/capture/refund/partial-refund/chargeback.
- Escrow / split payout между платформой и хостом.
- Финансового реестра, reconciliation и settlement отчетов.

## 5. Trust & safety
Недостает:
- KYC/verification для хостов.
- Anti-fraud scoring (velocity/device/behavior/risk rules).
- Dispute center + SLA workflow.
- Safety automation (content moderation, abuse detection).

## 6. Messaging
Недостает:
- Реального realtime-сокета чата.
- Delivery/read receipts, attachment moderation.
- Message templates и авто-напоминания.

## 7. Review system
Недостает:
- Double-blind review model.
- Fraud-resistant review validation.
- Host/guest rating breakdown (cleanliness, location, value...).

## 8. Localization & compliance
Недостает:
- Полной i18n/l10n, multi-currency, tax/VAT logic.
- Юридических соглашений и региональной комплаенс-логики.

## 9. Operations
Недостает:
- Revenue dashboard, cohort analytics, funnel metrics.
- CS-tools для саппорта и тикетов.
- Incident tooling и audit completeness.

---

## Отличия от Авито / Суточно.ру / Островок

### От Авито
- Нет сильной C2C classified-механики и продвижения объявлений (boost, top placement).
- Нет массовой лидогенерации через звонки/лиды/мессенджеры в гибком режиме.

### От Суточно.ру
- Нет глубокой локальной интеграции по посуточному рынку РФ: правила заселения, депозиты, локальные офферы.

### От Островок
- Нет OTA-интеграции с channel manager/инвентарем гостиниц.
- Нет enterprise-level B2B API и агрегаторной модели поставщиков.

---

## Что добавить в первую очередь (top impact)

1. **Real-time availability + locking**
2. **Production payments stack с VK Pay + возвраты + reconciliation**
3. **Реальный чат (realtime) + push pipeline**
4. **Search/ranking с гео-фильтрами и картой-кластерами**
5. **Полный host cabinet (pricing, calendar, occupancy, payouts)**
6. **Trust & safety: KYC + reports + moderation queue + dispute workflow**
7. **Review system (двусторонний, защищенный от abuse)**
8. **Data platform: события, воронки, A/B тесты**

---

## Целевая дорожная карта (сжатая)

- **Фаза 1 (4–6 недель):** booking core + host workflows + VK Pay lifecycle.
- **Фаза 2 (4–8 недель):** trust & safety + review + realtime chat + push.
- **Фаза 3 (6–10 недель):** ranking/personalization + growth loops + advanced analytics.

---

## Итоговая оценка зрелости

По отношению к mature-платформам (Airbnb/Booking/Vrbo):
- Текущий продукт: **~20–25% функциональной зрелости**.
- Сильная сторона: уже есть архитектурный каркас ролей, API и безопасности.
- Главный gap: отсутствие production-grade глубины в поиске, платежах, trust & safety и операционных инструментах.
