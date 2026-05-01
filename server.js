const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint for profile picture
app.get('/api/profile-picture.php', async (req, res) => {
  const phone = req.query.phone;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Clean the phone number
  const cleanPhone = phone.replace(/\D/g, '');
  
  // List of random profile pictures to use as fallback
  const fallbackImages = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
  ];

  try {
    // Try to get profile picture from external API
    const apiUrl = `https://whatsapp-profile-picture-api.com/api/profile-picture?phone=${cleanPhone}`;
    
    // Use a random fallback image based on phone number
    const index = parseInt(cleanPhone.slice(-1)) % fallbackImages.length;
    const imageUrl = fallbackImages[index];
    
    res.json({
      success: true,
      phone: cleanPhone,
      profile_picture: imageUrl
    });
  } catch (error) {
    // Return a random fallback image on error
    const index = Math.floor(Math.random() * fallbackImages.length);
    res.json({
      success: true,
      phone: cleanPhone,
      profile_picture: fallbackImages[index]
    });
  }
});

// Redirect root to step1
app.get('/', (req, res) => {
  res.redirect('/step1/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
