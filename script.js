const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
  { category: 'detergent', name: 'Washing Powder', query: 'Laundry detergent powder' },
  { category: 'detergent', name: 'Liquid Detergent', query: 'Liquid laundry detergent bottle' },
  { category: 'detergent', name: 'Dishwashing Liquid', query: 'Dishwashing liquid' },
  { category: 'detergent', name: 'Fabric Softener', query: 'Fabric softener bottle' },
  { category: 'detergent', name: 'Detergent Pods', query: 'Laundry detergent pod' },
  { category: 'detergent', name: 'Surface Cleaner', query: 'Surface cleaner spray' },
  { category: 'detergent', name: 'Glass Cleaner', query: 'Glass cleaner spray bottle' },
  { category: 'detergent', name: 'Toilet Cleaner', query: 'Toilet cleaner bottle' },
  { category: 'detergent', name: 'Stain Remover', query: 'Stain remover laundry' },
  { category: 'detergent', name: 'Bleach', query: 'Bleach bottle' },
  
  { category: 'spices', name: 'Red Chilli Powder', query: 'Chili powder' },
  { category: 'spices', name: 'Turmeric Powder', query: 'Turmeric powder' },
  { category: 'spices', name: 'Coriander Powder', query: 'Coriander powder' },
  { category: 'spices', name: 'Cumin Seeds', query: 'Cumin seeds' },
  { category: 'spices', name: 'Black Pepper', query: 'Black pepper peppercorns' },
  { category: 'spices', name: 'Cardamom', query: 'Cardamom pods' },
  { category: 'spices', name: 'Cloves', query: 'Cloves spice' },
  { category: 'spices', name: 'Cinnamon', query: 'Cinnamon sticks' },
  { category: 'spices', name: 'Mustard Seeds', query: 'Mustard seeds' },
  { category: 'spices', name: 'Garam Masala', query: 'Garam masala' },

  { category: 'grocery', name: 'Premium Salt', query: 'Table salt' },
  { category: 'grocery', name: 'Refined Sugar', query: 'White sugar bowl' },
  { category: 'grocery', name: 'Wheat Flour', query: 'Wheat flour' },
  { category: 'grocery', name: 'Toor Dal (Lentils)', query: 'Pigeon pea dal' },
  { category: 'grocery', name: 'Chana Dal', query: 'Chana dal' },
  { category: 'grocery', name: 'Sunflower Oil', query: 'Sunflower oil bottle' },
  { category: 'grocery', name: 'Mustard Oil', query: 'Mustard oil bottle' },
  { category: 'grocery', name: 'Green Tea', query: 'Green tea leaves' },
  { category: 'grocery', name: 'Coffee Beans', query: 'Coffee beans roasted' },
  { category: 'grocery', name: 'Jaggery', query: 'Jaggery block' },

  { category: 'rice', name: 'Premium Basmati Rice', query: 'Basmati rice uncooked' },
  { category: 'rice', name: 'Sona Masoori Rice', query: 'White rice grains' },
  { category: 'rice', name: 'Jasmine Rice', query: 'Jasmine rice' },
  { category: 'rice', name: 'Brown Rice', query: 'Brown rice' },
  { category: 'rice', name: 'Parboiled Rice', query: 'Parboiled rice' },
  { category: 'rice', name: 'Sticky Rice', query: 'Sticky rice' },
  { category: 'rice', name: 'Sushi Rice', query: 'Sushi rice' },
  { category: 'rice', name: 'Black Rice', query: 'Black rice' },
  { category: 'rice', name: 'Broken Rice', query: 'Broken rice' },
  { category: 'rice', name: 'Organic Basmati', query: 'Organic basmati rice' }
];

async function getWikimediaImageUrl(query) {
  const searchUrl = https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=\&utf8=&format=json&srlimit=1;
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    if (data.query.search.length > 0) {
      const title = data.query.search[0].title;
      const imagesUrl = https://en.wikipedia.org/w/api.php?action=query&titles=\&prop=pageimages&format=json&pithumbsize=600;
      const imgRes = await fetch(imagesUrl);
      const imgData = await imgRes.json();
      const pages = imgData.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
      }
    }
  } catch (e) { console.error('Error fetching API for', query); }
  return null;
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const dir = path.join(__dirname, 'public', 'products_real');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  let productsData = {};
  
  for (const item of products) {
    let imgUrl = await getWikimediaImageUrl(item.query);
    if (!imgUrl) {
      console.log(Failed to find image for \, using fallback);
      imgUrl = \https://placehold.co/600x400/eeeeee/333333?text=\\;
    } else {
      console.log(Found image for \: \);
    }
    
    if (!productsData[item.category]) productsData[item.category] = [];
    
    // Convert Wikimedia URL to local download to avoid external dependencies
    if (imgUrl.startsWith('http')) {
      const fileName = item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
      const destPath = path.join(dir, fileName);
      try {
         await downloadImage(imgUrl, destPath);
         console.log(Downloaded \);
         productsData[item.category].push({ name: item.name, img: '/products_real/' + fileName });
      } catch(e) {
         productsData[item.category].push({ name: item.name, img: imgUrl });
      }
    }
  }
  
  fs.writeFileSync('products_data.json', JSON.stringify(productsData, null, 2));
  console.log('Done!');
}
run();
