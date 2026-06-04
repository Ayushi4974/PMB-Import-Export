const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
  { category: 'detergent', name: 'Washing Powder', query: 'Laundry detergent' },
  { category: 'detergent', name: 'Liquid Detergent', query: 'Liquid detergent' },
  { category: 'detergent', name: 'Dishwashing Liquid', query: 'Dishwashing liquid' },
  { category: 'detergent', name: 'Fabric Softener', query: 'Fabric softener' },
  { category: 'detergent', name: 'Detergent Pods', query: 'Laundry detergent pod' },
  { category: 'detergent', name: 'Surface Cleaner', query: 'Surface cleaner spray' },
  { category: 'detergent', name: 'Glass Cleaner', query: 'Glass cleaner' },
  { category: 'detergent', name: 'Toilet Cleaner', query: 'Toilet cleaner' },
  { category: 'detergent', name: 'Stain Remover', query: 'Stain remover' },
  { category: 'detergent', name: 'Bleach', query: 'Bleach bottle' },
  
  { category: 'spices', name: 'Red Chilli Powder', query: 'Chili powder' },
  { category: 'spices', name: 'Turmeric Powder', query: 'Turmeric' },
  { category: 'spices', name: 'Coriander Powder', query: 'Coriander' },
  { category: 'spices', name: 'Cumin Seeds', query: 'Cumin' },
  { category: 'spices', name: 'Black Pepper', query: 'Black pepper' },
  { category: 'spices', name: 'Cardamom', query: 'Cardamom' },
  { category: 'spices', name: 'Cloves', query: 'Clove' },
  { category: 'spices', name: 'Cinnamon', query: 'Cinnamon' },
  { category: 'spices', name: 'Mustard Seeds', query: 'Mustard seed' },
  { category: 'spices', name: 'Garam Masala', query: 'Garam masala' },

  { category: 'grocery', name: 'Premium Salt', query: 'Salt' },
  { category: 'grocery', name: 'Refined Sugar', query: 'Sugar' },
  { category: 'grocery', name: 'Wheat Flour', query: 'Wheat flour' },
  { category: 'grocery', name: 'Toor Dal (Lentils)', query: 'Pigeon pea' },
  { category: 'grocery', name: 'Chana Dal', query: 'Chana dal' },
  { category: 'grocery', name: 'Sunflower Oil', query: 'Sunflower oil' },
  { category: 'grocery', name: 'Mustard Oil', query: 'Mustard oil' },
  { category: 'grocery', name: 'Green Tea', query: 'Green tea' },
  { category: 'grocery', name: 'Coffee Beans', query: 'Coffee bean' },
  { category: 'grocery', name: 'Jaggery', query: 'Jaggery' },

  { category: 'rice', name: 'Premium Basmati Rice', query: 'Basmati' },
  { category: 'rice', name: 'Sona Masoori Rice', query: 'White rice' },
  { category: 'rice', name: 'Jasmine Rice', query: 'Jasmine rice' },
  { category: 'rice', name: 'Brown Rice', query: 'Brown rice' },
  { category: 'rice', name: 'Parboiled Rice', query: 'Parboiled rice' },
  { category: 'rice', name: 'Sticky Rice', query: 'Glutinous rice' },
  { category: 'rice', name: 'Sushi Rice', query: 'Sushi rice' },
  { category: 'rice', name: 'Black Rice', query: 'Black rice' },
  { category: 'rice', name: 'Broken Rice', query: 'Broken rice' },
  { category: 'rice', name: 'Organic Basmati', query: 'Organic farming basmati' }
];

async function getWikimediaImageUrl(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=3`;
  const opts = { headers: { 'User-Agent': 'PMBImportExport/1.0 (contact@example.com)' } };
  try {
    const res = await fetch(searchUrl, opts);
    const data = await res.json();
    if (data.query.search.length > 0) {
      for(let i=0; i<data.query.search.length; i++) {
          const title = data.query.search[i].title;
          const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600`;
          const imgRes = await fetch(imagesUrl, opts);
          const imgData = await imgRes.json();
          const pages = imgData.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
          }
      }
    }
  } catch (e) { console.error('Error fetching API for', query, e.message); }
  return null;
}

async function run() {
  let productsDataConfig = {};
  
  for (const item of products) {
    let imgUrl = await getWikimediaImageUrl(item.query);
    if (!imgUrl) {
      console.log(`Failed to find image for ${item.name}, using placehold`);
      imgUrl = `https://placehold.co/600x400/eeeeee/333333?text=${encodeURIComponent(item.name)}`;
    } else {
      console.log(`Found URL for ${item.name}: ${imgUrl}`);
    }
    
    if (!productsDataConfig[item.category]) productsDataConfig[item.category] = [];
    productsDataConfig[item.category].push({ name: item.name, img: imgUrl });
  }
  
  fs.writeFileSync('products_data.json', JSON.stringify(productsDataConfig, null, 2));
  console.log('Finished fetching URLs from Wikimedia!');
}
run();
