const fetch = require('node-fetch');

const products = [
  {
    name: 'Hiking',
    description: 'Embark on exhilarating hikes to explore the historical and awe-inspiring Huye Mountain. Our expert guides will lead you on unforgettable journeys through breathtaking landscapes and hidden treasures. To pay, use phone number 0782330531.',
    price: 10000,
    image: '/images/hiking.jpg',
  },
  {
    name: 'Camping',
    description: 'Spend a night under the stars atop Huye Mountain with our camping experiences. Relax in comfortable tents, surrounded by stunning vistas and the sounds of nature, and awaken to unforgettable sunrise views. To pay, use phone number 0782330531.',
    price: 15000,
    image: '/images/camping.jpg',
  },
  {
    name: 'Mountain Biking',
    description: 'Embark on adrenaline-pumping mountain biking adventures through Huye mountains. Explore rugged trails, picturesque villages, and breathtaking viewpoints with our experienced guides. To pay, use phone number 0782330531.',
    price: 12000,
    image: '/images/mountain-biking.jpg',
  },
  {
    name: 'Coffee Experience',
    description: "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings. To pay, use phone number 0782330531.",
    price: 8000,
    image: '/images/coffee.jpg',
  },
  {
    name: 'Huye Brain City Tour',
    description: "Experience the charm and history of Huye city on two wheels with our guided mountain bike tours. Pedal through ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character. To pay, use phone number 0782330531.",
    price: 10000,
    image: '/images/huye-city-tour.jpg',
  },
  {
    name: 'Rwandan Cuisine',
    description: "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods, and savor the flavors of our rich culinary heritage. To pay, use phone number 0782330531.",
    price: 9000,
    image: '/images/cuisine.jpg',
  },
];

async function addProducts() {
  for (const product of products) {
    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error(`Failed to add ${product.name}:`, err);
      } else {
        console.log(`Added: ${product.name}`);
      }
    } catch (e) {
      console.error(`Error adding ${product.name}:`, e);
    }
  }
}

addProducts(); 