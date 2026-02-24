const db = require('./models/database');

const seedProducts = [
    {name: "Callaway Paradym Driver", description: "The Callaway Paradym Driver is designed for maximum distance and forgiveness, featuring a high-strength titanium face and adjustable weighting.", price: 499.99, category: "Drivers", stock: 10},
    {name: "TaylorMade Stealth Driver", description: "The TaylorMade Stealth Driver offers a carbon fiber face for increased ball speed and distance, along with an adjustable hosel for personalized launch conditions.", price: 549.99, category: "Drivers", stock: 15},
    {name: "Titleist TSi3 Driver", description: "The Titleist TSi3 Driver is engineered for low spin and high launch, featuring a forged titanium face and adjustable weighting for optimal performance.", price: 529.99, category: "Drivers", stock: 12},
    {name: "Ping G430 Irons", description: "The Ping G430 Irons provide exceptional forgiveness and distance, with a high-strength steel face and a tungsten weight for improved stability.", price: 899.99, category: "Irons", stock: 20},
    {name: "Callaway Apex Irons", description: "The Callaway Apex Irons are designed for players seeking a blend of distance and feel, featuring a forged construction and a high-strength face.", price: 999.99, category: "Irons", stock: 18},
    {name: "TaylorMade P790 Irons", description: "The TaylorMade P790 Irons offer a combination of distance and playability, with a forged construction and a thin face for increased ball speed.", price: 949.99, category: "Irons", stock: 22},
    {name: "TaylorMade Spider Tour Red 3 Golf Putter", description: "The TaylorMade Spider Tour Red 3 Putter features a high-MOI design for stability and forgiveness, with a red finish for a bold look.", price: 299.99, category: "Putters", stock: 30},
    {name: "Odyssey White Hot OG Putter", description: "The Odyssey White Hot OG Putter offers a classic design with a white hot insert for a soft feel and consistent performance on the greens.", price: 249.99, category: "Putters", stock: 25},
    {name: "Scotty Cameron Special Select Newport 2 Putter", description: "The Scotty Cameron Special Select Newport 2 Putter is crafted with precision milling and features a timeless design for exceptional feel and performance.", price: 399.99, category: "Putters", stock: 15},
    {name: "Callaway Elyte Golf Fairway Wood", description: "The Callaway Elyte Fairway Wood is designed for versatility and distance, featuring a high-strength steel face and a low center of gravity for improved launch.", price: 299.99, category: "Fairway Woods", stock: 20},
    {name: "TaylorMade SIM2 Max Fairway Wood", description: "The TaylorMade SIM2 Max Fairway Wood offers a carbon fiber crown for increased ball speed and forgiveness, along with an adjustable hosel for personalized launch conditions.", price: 329.99, category: "Fairway Woods", stock: 18},
    {name: "Titleist TSi2 Fairway Wood", description: "The Titleist TSi2 Fairway Wood is engineered for high launch and low spin, featuring a forged titanium face and adjustable weighting for optimal performance.", price: 309.99, category: "Fairway Woods", stock: 22},
    {name: "Ping G440 Hybrid", description: "The Ping G440 Hybrid offers exceptional forgiveness and distance, with a high-strength steel face and a tungsten weight for improved stability.", price: 249.99, category: "Hybrids", stock: 25},
    {name: "Callaway Apex Hybrid", description: "The Callaway Apex Hybrid is designed for players seeking a blend of distance and feel, featuring a forged construction and a high-strength face.", price: 279.99, category: "Hybrids", stock: 20},
    {name: "TaylorMade SIM2 Max Hybrid", description: "The TaylorMade SIM2 Max Hybrid offers a combination of distance and playability, with a forged construction and a thin face for increased ball speed.", price: 269.99, category: "Hybrids", stock: 18},
    {name: "Cobra FLY-XL II Steel 10 Piece Golf Cart Bag Package Set", description: "The Cobra FLY-XL II Steel 10 Piece Golf Cart Bag Package Set includes a complete set of clubs and a cart bag, designed for golfers seeking performance and value.", price: 799.99, category: "Packages", stock: 10},
    {name: "Callaway Strata Ultimate 16-Piece Golf Set", description: "The Callaway Strata Ultimate 16-Piece Golf Set includes a complete set of clubs and a cart bag, designed for golfers seeking performance and value.", price: 699.99, category: "Packages", stock: 12},
    {name: "TaylorMade RBZ SpeedLite 16-Piece Golf Set", description: "The TaylorMade RBZ SpeedLite 16-Piece Golf Set includes a complete set of clubs and a cart bag, designed for golfers seeking performance and value.", price: 749.99, category: "Packages", stock: 15},
    {name: "Titleist TP5 12 Golf Ball Pack - White", description: "The Titleist TP5 Golf Ball Pack includes 12 high-performance golf balls designed for maximum distance and control, featuring a five-layer construction for optimal performance.", price: 49.99, category: "Golf Balls", stock: 50},
    {name: "Callaway Chrome Soft Golf Ball Pack - White", description: "The Callaway Chrome Soft Golf Ball Pack includes 12 high-performance golf balls designed for maximum distance and control, featuring a soft feel and low spin for improved performance.", price: 39.99, category: "Golf Balls", stock: 50},
    {name: "TaylorMade TP5x Golf Ball Pack - White", description: "The TaylorMade TP5x Golf Ball Pack includes 12 high-performance golf balls designed for maximum distance and control, featuring a five-layer construction for optimal performance.", price: 44.99, category: "Golf Balls", stock: 50}
];
    
db.serialize(() => {
    seedProducts.forEach(product => {
        db.run('INSERT OR IGNORE INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)', 
            [product.name, product.description, product.price, product.category, product.stock],
            function(err) {
                console.log(`Seeding product: ${product.name}`);
                if (err) {
                    console.error('Error inserting product:', err.message);
                } else {
                    console.log(`Inserted product with ID: ${this.lastID}`);
                }
            }
        );
    }
)});

