-- Custom SQL migration file, put you code below! --
-- ALTER TABLE users ADD FULLTEXT INDEX idx_handle (handle);
-- ALTER TABLE users ADD FULLTEXT INDEX idx_email (email);
-- ALTER TABLE users ADD FULLTEXT INDEX idx_full_name (full_name);

CREATE FULLTEXT INDEX idx_full_name ON users(full_name);