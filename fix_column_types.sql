-- PostgreSQL Column Type Fix Script for StackIt Tracker
-- Run this to support large Base64 images and long descriptions

-- 1. Update 'user_profiles' table
ALTER TABLE user_profiles ALTER COLUMN avatar TYPE TEXT;
ALTER TABLE user_profiles ALTER COLUMN bio TYPE TEXT;

-- 2. Update 'technologies' table
ALTER TABLE technologies ALTER COLUMN description TYPE TEXT;

-- 3. Update 'stacks' table
ALTER TABLE stacks ALTER COLUMN description TYPE TEXT;

-- 4. Update 'goals' table
ALTER TABLE goals ALTER COLUMN description TYPE TEXT;
