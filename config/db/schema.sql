DROP DATABASE IF EXISTS collector_app;
CREATE DATABASE collector_app;

\c collector_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    token TEXT
);

CREATE TABLE IF NOT EXISTS collection(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL,
    date_added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    category VARCHAR(20) NOT NULL,
    brand VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    condition INTEGER NOT NULL,
    size INTEGER NOT NULL,
    purchasedFor INTEGER NOT NULL,
    purchasedFrom VARCHAR(50) NOT NULL,
    worth INTEGER NOT NULL,
    forSale VARCHAR(5) NOT NULL,
    image1 TEXT NOT NULL,
    image2 TEXT NOT NULL,
    CHECK (category = 'Footwear' OR category = 'Clothing'),
    CHECK (forSale = 'Yes' OR forSale = 'No' OR forSale = 'Maybe'),
    FOREIGN KEY (userid) REFERENCES users(id)
);