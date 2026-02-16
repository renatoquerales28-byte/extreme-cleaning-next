
import { db } from "./src/lib/db";
import { serviceAreas } from "./src/lib/db/schema";

async function check() {
    try {
        const areas = await db.select().from(serviceAreas);
        console.log("Service Areas in DB:", JSON.stringify(areas));
        if (areas.length === 0) {
            console.log("DB is empty! Seeding default area...");
            await db.insert(serviceAreas).values({
                zipCode: "99201",
                city: "Spokane",
                status: "active"
            });
            console.log("Seeded 99201 as active.");
        }
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}

check();
