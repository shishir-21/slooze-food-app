// prisma/seed.ts

import { PrismaClient, Role, Country } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  // Hash password for demo users
  const password = await bcrypt.hash("password123", 10);

  // ---------------- USERS ----------------
  await prisma.user.createMany({
    data: [
      {
        name: "Nick Fury",
        email: "admin@slooze.com",
        password,
        role: Role.ADMIN,
        country: Country.INDIA
      },
      {
        name: "Captain Marvel",
        email: "manager.india@slooze.com",
        password,
        role: Role.MANAGER,
        country: Country.INDIA
      },
      {
        name: "Captain America",
        email: "manager.usa@slooze.com",
        password,
        role: Role.MANAGER,
        country: Country.AMERICA
      },
      {
        name: "Thanos",
        email: "thanos@slooze.com",
        password,
        role: Role.MEMBER,
        country: Country.INDIA
      },
      {
        name: "Thor",
        email: "thor@slooze.com",
        password,
        role: Role.MEMBER,
        country: Country.INDIA
      },
      {
        name: "Travis",
        email: "travis@slooze.com",
        password,
        role: Role.MEMBER,
        country: Country.AMERICA
      }
    ]
  });

  // ---------------- RESTAURANTS (STEP 6) ----------------
  await prisma.restaurant.createMany({
  data: [
    { name: "Taj Hotel", country: Country.INDIA },
    { name: "Delhi Diner", country: Country.INDIA },
    { name: "NYC Bites", country: Country.AMERICA },
    { name: "Texas Grill", country: Country.AMERICA },
  ]
});

  console.log("Seeded Users Successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());