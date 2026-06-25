import db from "./db.js";
import bcrypt from "bcrypt";

const categories = [
  ["Income", "Salary, freelance, side hustles"],
  ["Housing", "Rent, mortgage, repairs"],
  ["Food", "Groceries and restaurants"],
  ["Transportation", "Gas, public transport, car payments"],
  ["Utilities", "Electricity, internet, water"],
  ["Healthcare", "Medical expenses"],
  ["Education", "books, courses, tuition"],
  ["Entertaiment", "Movies, games, hobbies"],
  ["Savings", "Emergency fund and investments"],
];

async function seedCategories() {
  for (const [name, description] of categories) {
    await db.query(
      `
                INSERT INTO categories (name, description)
                VALUES ($1,$2)
                On CONFLICT (name) DO NOTHING
            `,
      [name, description],
    );
  }
  console.log("✅ Categories seeded");
}

async function seedUsers() {
  const passwordHash = await bcrypt.hash("P@$$w0rd!", 10);
  
  const users = [
    ["System", "Admin", "admin@smartbudgetpro.com", passwordHash, "admin"],
    ["Alondra", "Advisor", "advisor@smartbudgetpro.com", passwordHash, "advisor"],
    ["John", "User", "user@smartbudgetpro.com", passwordHash, "user"],
  ];
  
  for (const user of users) {
      await db.query(
          `
              INSERT INTO users(first_name, last_name, email, password, role)
              VALUES ($1,$2,$3,$4,$5)
              ON CONFLICT (email) DO NOTHING
          `,
          user
      );
  }
  console.log("✅ Users seeded")
}

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    await seedCategories();
    await seedUsers();

    console.log("🎉 Database seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    if (typeof db.close === "function") {
      await db.close();
    }
  }
}

seedDatabase();
