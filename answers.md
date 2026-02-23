# Ghala Technical Intern Challenge – Core Systems Simulation

## 1. Overview

This project simulates how Ghala handles merchant payment configuration and order processing:

- Backend: FastAPI (Python)
- Frontend: React + Vite + TailwindCSS (basic styling)
- Data: In-memory lists for merchants and orders

## 2. How multiple merchants are supported

- Each merchant is stored as a `MerchantConfig` with a unique `id`, `name`, `preferred_payment_method` and `config_details`.
- Merchants are stored in an in-memory `merchants_db` list.
- Orders store a `merchant_id` field which links an order to a specific merchant.
- This allows many merchants to exist at the same time, each with their own payment configuration.

In a real system, `merchants_db` and `orders_db` would be database tables keyed by merchant ID.

## 3. Extending to support commission rates per merchant

To support different commission rates:

- Add a `commission_rate` field to `MerchantConfig` (for example a percentage like `0.05` for 5%).
- When a payment is confirmed for an order, compute:

  `commission = order.total_amount * merchant.commission_rate`

- Store commission on the order or in a separate `payouts` table.
- Reporting / settlement logic can then aggregate commissions per merchant over time.

## 4. Scaling to 10,000+ merchants

To handle many merchants and orders:

- Replace in-memory lists with a real relational database (PostgreSQL, MySQL, etc.).
- Add proper indexes on `merchant_id`, `status`, and timestamps to speed up queries.
- Move payment status updates into background workers:
  - The API enqueues a “simulate payment” job.
  - A worker process (Celery/RQ/other) picks up jobs and updates order status.
- Use pagination on list endpoints (e.g. `/orders`) so the UI only loads a page at a time.
- Optionally introduce caching (Redis) for frequently-read data.

This design keeps the API stateless and allows horizontal scaling of web servers and workers.