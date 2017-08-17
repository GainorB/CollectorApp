DROP DATABASE IF EXISTS collector_app;
CREATE DATABASE collector_app;

\c collector_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    token TEXT
);

CREATE TABLE IF NOT EXISTS collection(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INTEGER NOT NULL,
    date_added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    brand VARCHAR(30) NOT NULL,
    title VARCHAR(300) NOT NULL,
    condition INTEGER NOT NULL,
    size INTEGER NOT NULL,
    purchasedfor INTEGER,
    purchasedfrom VARCHAR(30),
    worth INTEGER,
    forsale VARCHAR(4),
    image TEXT,
    FOREIGN KEY (userid) REFERENCES users(id)
);

INSERT INTO collection(userid, brand, title, condition, size, purchasedfor, purchasedfrom, worth, forsale, image) VALUES 
    (1, 'Nike', 'Jordan 1 OG Black Toe', 10, 10, 180, 'Nike.com', 300, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/1/012566_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Bred 2016', 10, 10, 180, 'Nike.com', 450, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/6/3/63611743093-air-jordan-1-retro-high-og-banned-2016-release-black-varsity-red-white-012496_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Top Three', 10, 10, 180, 'Nike.com', 250, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/1/012587_1_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Wings', 10, 10, 270, 'Nike.com', 280, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/8/0/801041_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Royal 2017', 10, 10, 180, 'Nike.com', 450, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/8/0/800564_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 Oreo', 10, 10.5, 220, 'Adidas.com', 650, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/2/0/201519_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 Bred', 10, 10, 220, 'Adidas.com', 750, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/8/0/800389_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 Zebra', 10, 10, 220, 'Adidas.com', 650, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/8/0/800502_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 Beluga', 10, 10, 220, 'Adidas.com', 1250, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/6/3/63611743105-adidas-yeezy-boost-350-v2-stegry-beluga-solred-201422_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 Black/Red', 10, 10, 220, 'Adidas.com', 1125, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/2/0/201536_1.jpg'),
    (1, 'Adidas', 'Yeezy V2 White', 10, 10, 220, 'Adidas.com', 550, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/8/0/800801_1.jpg'),
    (1, 'Nike', 'Jordan 1 SB Lance Mountain', 10, 10, 160, 'Grailed.com', 375, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/8/081108_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Reversed SBB', 10, 10, 300, 'Ebay.com', 425, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/1/012521_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Metallic Navy', 10, 10, 170, 'Nike.com', 175, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/6/3/63600387450-air-jordan-1-retro-high-og-white-midnight-navy-012453_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Ying/Yang', 10, 10, 130, 'Nike.com', 115, 'Yes', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/1/012492_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG UNC', 10, 10, 220, 'Ebay.com', 250, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/a/i/air-jordan-1-retro-high-og-unc-white-dk-powder-blue-012304_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG SBB', 10, 10, 400, 'Consignment shop', 900, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/a/i/air-jordan-1-retro-high-og-shattered-backboard-black-starfish-sail-012258_1.jpg'),
    (1, 'Nike', 'Jordan 1 OG Chicago', 10, 10, 365, 'GOAT App', 525, 'No', 'https://www.flightclub.com/media/catalog/product/cache/1/image/800x570/9df78eab33525d08d6e5fb8d27136e95/0/1/012234_1.jpg');













