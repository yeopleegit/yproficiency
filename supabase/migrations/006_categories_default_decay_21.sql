-- categories.decay_days 기본값 14 → 21 로 변경
ALTER TABLE categories ALTER COLUMN decay_days SET DEFAULT 21;
