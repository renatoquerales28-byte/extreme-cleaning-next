import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL!;

// OPTIMIZACIÓN: Configuración mejorada de conexión
const client = postgres(connectionString, {
    prepare: false,              // Requerido por Supabase pooler
    ssl: 'require',              // SSL obligatorio
    max: 10,                     // Máximo 10 conexiones en el pool
    idle_timeout: 20,            // Cerrar conexiones inactivas después de 20s
    connect_timeout: 10,         // Timeout de conexión: 10 segundos
    max_lifetime: 60 * 30,       // Reciclar conexiones cada 30 minutos
    onnotice: () => { },          // Silenciar notices de PostgreSQL
});

export const db = drizzle(client, { schema });

// WARM-UP: Función para pre-calentar la conexión
let isWarmedUp = false;
export async function warmUpConnection() {
    if (isWarmedUp) return true;

    try {
        console.log('🔥 Warming up database connection...');
        const start = Date.now();
        await client`SELECT 1`;
        const duration = Date.now() - start;
        console.log(`✅ Database warmed up in ${duration}ms`);
        isWarmedUp = true;
        return true;
    } catch (error) {
        console.error('❌ Failed to warm up database:', error);
        return false;
    }
}
