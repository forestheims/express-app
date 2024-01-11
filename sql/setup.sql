-- so many errors. need to look into changes and updates of PostgreSQL for cascade, identity, time zone, ......

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_picture_url VARCHAR(255),
    password_hash_value VARCHAR(255) NOT NULL,
    -- Include other fields as needed based on the OpenID scopes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
