const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/traveltail')
  .then(async () => {
    const db = mongoose.connection.db;
    const hash = await bcrypt.hash('admin1', 10);
    await db.collection('users').updateOne(
      { email: 'admin@gmail.com' },
      { $set: { password: hash } }
    );
    console.log('Admin password updated to admin1');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
