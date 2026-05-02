-- PostgreSQL Sequence Reset Script for StackIt Tracker
-- Run this if you encounter "duplicate key value violates unique constraint" errors

-- 1. Reset 'technologies' sequence
SELECT setval(pg_get_serial_sequence('technologies', 'id'), coalesce(max(id),0) + 1, false) FROM technologies;

-- 2. Reset 'stacks' sequence
SELECT setval(pg_get_serial_sequence('stacks', 'id'), coalesce(max(id),0) + 1, false) FROM stacks;

-- 3. Reset 'goals' sequence
SELECT setval(pg_get_serial_sequence('goals', 'id'), coalesce(max(id),0) + 1, false) FROM goals;

-- 4. Reset 'user_profiles' sequence (if used)
SELECT setval(pg_get_serial_sequence('user_profiles', 'id'), coalesce(max(id),0) + 1, false) FROM user_profiles;
