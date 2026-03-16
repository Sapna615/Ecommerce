require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function manageAdminUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB\n');

    const action = process.argv[2];
    const email = process.argv[3];

    switch (action) {
      case 'list':
        await listUsers();
        break;
      case 'make-admin':
        await makeAdmin(email);
        break;
      case 'remove-admin':
        await removeAdmin(email);
        break;
      case 'create-admin':
        await createAdmin(email);
        break;
      case 'check':
        await checkUser(email);
        break;
      default:
        showUsage();
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function listUsers() {
  console.log('📋 All Users:');
  console.log('─'.repeat(80));
  console.log('EMAIL'.padEnd(25) + 'USERNAME'.padEnd(15) + 'ROLE'.padEnd(10) + 'VERIFIED');
  console.log('─'.repeat(80));

  const users = await User.find({}, {userName: 1, email: 1, role: 1, isEmailVerified: 1})
    .sort({createdAt: -1});

  if (users.length === 0) {
    console.log('No users found');
    return;
  }

  users.forEach(user => {
    const role = user.role || 'user';
    const verified = user.isEmailVerified ? '✅' : '❌';
    console.log(
      user.email.padEnd(25) + 
      user.userName.padEnd(15) + 
      role.padEnd(10) + 
      verified
    );
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role !== 'admin').length;
  
  console.log('─'.repeat(80));
  console.log(`📊 Summary: ${adminCount} admins, ${userCount} regular users`);
}

async function makeAdmin(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }

  const result = await User.updateOne(
    {email: email},
    {$set: {role: 'admin'}}
  );

  if (result.modifiedCount > 0) {
    console.log(`✅ ${email} is now an ADMIN`);
    await checkUser(email);
  } else if (result.matchedCount > 0) {
    console.log(`ℹ️  ${email} is already an admin`);
  } else {
    console.log(`❌ User with email ${email} not found`);
  }
}

async function removeAdmin(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }

  const result = await User.updateOne(
    {email: email},
    {$set: {role: 'user'}}
  );

  if (result.modifiedCount > 0) {
    console.log(`✅ ${email} is now a REGULAR USER`);
    await checkUser(email);
  } else if (result.matchedCount > 0) {
    console.log(`ℹ️  ${email} is already a regular user`);
  } else {
    console.log(`❌ User with email ${email} not found`);
  }
}

async function createAdmin(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }

  // Check if user already exists
  const existingUser = await User.findOne({email: email});
  if (existingUser) {
    console.log(`❌ User with email ${email} already exists`);
    console.log('Use "make-admin" to promote existing user');
    return;
  }

  // Create new admin user
  const defaultPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const adminUser = new User({
    userName: email.split('@')[0],
    email: email,
    password: hashedPassword,
    role: 'admin',
    isEmailVerified: true
  });

  await adminUser.save();
  console.log(`✅ New admin user created:`);
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${defaultPassword}`);
  console.log(`   ⚠️  Please change the password after first login!`);
}

async function checkUser(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }

  const user = await User.findOne({email: email}, {userName: 1, email: 1, role: 1, isEmailVerified: 1, createdAt: 1});
  
  if (!user) {
    console.log(`❌ User with email ${email} not found`);
    return;
  }

  const role = user.role || 'user';
  const verified = user.isEmailVerified ? '✅' : '❌';
  const created = user.createdAt.toLocaleDateString();

  console.log(`📋 User Details:`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Username: ${user.userName}`);
  console.log(`   Role: ${role.toUpperCase()}`);
  console.log(`   Email Verified: ${verified}`);
  console.log(`   Member Since: ${created}`);
  
  if (role === 'admin') {
    console.log(`   🔐 Admin Access: http://localhost:5173/admin/dashboard`);
  } else {
    console.log(`   🛒 User Access: http://localhost:5173/shop/home`);
  }
}

function showUsage() {
  console.log('🔐 Admin User Management Tool');
  console.log('─'.repeat(40));
  console.log('Usage: node manage-admins.js <action> [email]');
  console.log('');
  console.log('Actions:');
  console.log('  list                    - List all users with roles');
  console.log('  make-admin <email>      - Promote user to admin');
  console.log('  remove-admin <email>    - Demote admin to user');
  console.log('  create-admin <email>     - Create new admin user');
  console.log('  check <email>           - Check user details');
  console.log('');
  console.log('Examples:');
  console.log('  node manage-admins.js list');
  console.log('  node manage-admins.js make-admin user@example.com');
  console.log('  node manage-admins.js remove-admin admin@example.com');
  console.log('  node manage-admins.js create-admin newadmin@example.com');
  console.log('  node manage-admins.js check user@example.com');
}

manageAdminUsers();
