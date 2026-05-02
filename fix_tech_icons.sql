-- PostgreSQL Tech Icon Fix Script
-- Run this to fix icons not loading for PostgreSQL

UPDATE technologies 
SET icon = 'postgresql' 
WHERE name ILIKE '%Postgres%' OR icon = 'postgres';

UPDATE technologies 
SET icon = 'amazonwebservices' 
WHERE name ILIKE '%AWS%' OR icon = 'aws';
