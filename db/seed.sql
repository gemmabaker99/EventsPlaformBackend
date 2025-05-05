DROP DATABASE IF EXISTS eventify;
CREATE DATABASE eventify;

DROP TABLE IF EXISTS user_events CASCADE;
DROP TABLE IF EXISTS custom_events CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'staff'))
);

CREATE TABLE user_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date TIMESTAMP,
  event_image TEXT,
  UNIQUE (user_id, event_id)
);


CREATE TABLE custom_events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location TEXT,
  created_by INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT TRUE
);


