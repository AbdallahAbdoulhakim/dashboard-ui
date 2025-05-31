function main() {
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

  daysToSeed.forEach((dayToSeed) => {
    const dayOfWeek = dayToSeed.getDay();

    if (dayOfWeek > 5) {
      return;
    }

    // ATTENDANCE
    for (let i = 1; i <= 10; i++) {
      const a = {
        data: {
          date: dayToSeed,
          present: randomPresent(),
          studentId: `student${i}`,
          lessonId: (i % 30) + 1,
        },
      };

      console.log(a);
    }
  });

  console.log("Seeding completed successfully.");
}

main();
