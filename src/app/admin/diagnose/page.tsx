export const dynamic = 'force-dynamic';

import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export default async function DiagnosePage() {
    const checks = {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        hasAdminUser: !!process.env.ADMIN_USERNAME,
        hasAdminPass: !!process.env.ADMIN_PASSWORD,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nextAuthUrlValue: process.env.NEXTAUTH_URL, // Safe to show URL
    };

    let dbStatus = "Pending";
    let dbError = null;

    try {
        // Try a simple query
        await db.execute(sql`SELECT 1`);
        dbStatus = "Connected ✅";
    } catch (e: any) {
        dbStatus = "Failed ❌";
        dbError = e.message;
    }

    return (
        <div className="p-8 max-w-2xl mx-auto font-mono text-sm">
            <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>

            <div className="space-y-4">
                <div className="p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">Environment Variables</h2>
                    <ul className="space-y-1">
                        <li>POSTGRES_URL: {checks.hasPostgresUrl ? "✅ Set" : "❌ MISSING"}</li>
                        <li>ADMIN_USERNAME: {checks.hasAdminUser ? "✅ Set" : "❌ MISSING"}</li>
                        <li>ADMIN_PASSWORD: {checks.hasAdminPass ? "✅ Set" : "❌ MISSING"}</li>
                        <li>NEXTAUTH_SECRET: {checks.hasNextAuthSecret ? "✅ Set" : "❌ MISSING"}</li>
                        <li>NEXTAUTH_URL: {checks.hasNextAuthUrl ? `✅ Set (${checks.nextAuthUrlValue})` : "❌ MISSING"}</li>
                    </ul>
                </div>

                <div className="p-4 border rounded bg-gray-50">
                    <h2 className="font-bold mb-2">Database Connection</h2>
                    <p>Status: {dbStatus}</p>
                    {dbError && (
                        <p className="text-red-600 mt-2 p-2 bg-red-50 rounded">
                            Error: {dbError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
