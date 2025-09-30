const fetch = require('node-fetch');

const products = [
  {
    name: 'Hiking',
    description: 'Embark on exhilarating hikes to explore the historical and awe-inspiring Huye Mountain. Our expert guides will lead you on unforgettable journeys through breathtaking landscapes and hidden treasures.',
    price: 25,
    image: '/images/hiking.png',
  },
  {
    name: 'Camping',
    description: 'Spend a night under the stars atop Huye Mountain with our camping experiences. Relax in comfortable tents, surrounded by stunning vistas and the sounds of nature, and awaken to unforgettable sunrise views.',
    price: 30,
    image: '/images/camping.png',
  },
  {
    name: 'Mountain biking',
    description: 'Embark on adrenaline-pumping mountain biking adventures through Huye mountains. Explore rugged trails, picturesque villages, and breathtaking viewpoints with our experienced guides.',
    price: 25,
    image: '/images/biking.png',
  },
  {
    name: 'Coffee experience',
    description: "Delve into Rwanda's rich coffee culture with our immersive coffee experience. Discover the journey from bean to cup and savor the flavors of this beloved brew amidst stunning natural surroundings.",
    price: 25,
    image: '/images/kawa.webp',
  },
  {
    name: 'Huye Brain city tour',
    description: "Experience the charm and history of Huye city with our guided tours. Explore ancient streets, historic sites, and vibrant neighborhoods as you discover the city's unique character.",
    price: 25,
    image: '/images/city tour.png',
  },
  {
    name: 'Banana brewing experience',
    description: "Learn the traditional art of banana brewing in Rwanda. Experience this unique cultural practice and taste the authentic flavors of traditional Rwandan banana beer.",
    price: 30,
    image: '/images/banana.png',
  },
  {
    name: 'Rwandan cuisine experience',
    description: "Join us for a culinary journey through Rwanda's traditional cuisine. Learn to prepare authentic dishes using locally sourced ingredients and traditional cooking methods.",
    price: 25,
    image: '/images/cousine.png',
  },
  {
    name: 'Rice plantation tour',
    description: "Explore Rwanda's agricultural heritage with our rice plantation tours. Learn about traditional farming methods and the importance of rice cultivation in Rwandan culture.",
    price: 25,
    image: '/images/rice.png',
  },
  {
    name: 'Handcrafts making',
    description: "Discover the art of traditional Rwandan handcrafts. Learn from local artisans and create your own beautiful crafts using traditional techniques and materials.",
    price: 20,
    image: '/images/handcraft.png',
  },
  {
    name: 'Igisoro game',
    description: "Experience the traditional Rwandan board game Igisoro. Learn the rules and strategies of this ancient game that has been played in Rwanda for generations.",
    price: 10,
    image: '/images/proverbs.png',
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