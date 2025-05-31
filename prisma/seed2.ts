import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // DAY

  const today = new Date();

  const daysToSeed = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    (x) => {
      const day = new Date();
      day.setDate(today.getDate() - x);
      return day;
    }
  );

  const randomPresent = () => {
    const random = Math.random();

    return random >= 0.5;
  };

  daysToSeed.forEach(async (dayToSeed) => {
    const dayOfWeek = dayToSeed.getDay();

    if (dayOfWeek > 5) {
      return;
    }

    // ATTENDANCE
    for (let i = 1; i <= 10; i++) {
      await prisma.attendance.create({
        data: {
          date: dayToSeed,
          present: randomPresent(),
          studentId: `student${i}`,
          lessonId: (i % 30) + 1,
        },
      });
    }
  });

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
