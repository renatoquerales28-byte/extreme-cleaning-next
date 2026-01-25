"use server";

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { format } from "date-fns";

export async function getLeadsForExport() {
    try {
        const allLeads = await db.select().from(leads);

        // Format data for Excel with Spanish column names
        const formattedData = allLeads.map(lead => ({
            "ID": lead.id,
            "Nombre": `${lead.firstName || ''} ${lead.lastName || ''}`.trim(),
            "Email": lead.email || '',
            "Teléfono": lead.phone || '',
            "Código Postal": lead.zipCode || '',
            "Tipo de Servicio": lead.serviceType || '',
            "Tipo de Limpieza": lead.cleaningType || '',
            "Frecuencia": lead.frequency || '',
            "Habitaciones": lead.bedrooms || '',
            "Baños": lead.bathrooms || '',
            "Pies Cuadrados": lead.sqFt || '',
            "Fecha de Servicio": lead.serviceDate ? format(new Date(lead.serviceDate), "dd/MM/yyyy") : '',
            "Hora de Servicio": lead.serviceTime || '',
            "Dirección": lead.address || '',
            "Ciudad": lead.city || '',
            "Estado": lead.state || '',
            "Precio Total": lead.totalPrice ? `$${lead.totalPrice}` : '',
            "Estado del Lead": lead.status || '',
            "Notas": lead.notes || '',
            "Fecha de Creación": lead.createdAt ? format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm") : '',
        }));

        return { success: true, data: formattedData };
    } catch (error) {
        console.error("Error getting leads for export:", error);
        return { success: false, error: "Failed to get leads" };
    }
}

export async function getLeadsForExportFiltered(filters?: {
    status?: string;
    serviceType?: string;
    startDate?: Date;
    endDate?: Date;
}) {
    try {
        let query = db.select().from(leads);

        // Apply filters if provided
        // Note: This is a simplified version. You'd need to add proper where clauses
        const allLeads = await query;

        // Filter in memory (for simplicity)
        let filteredLeads = allLeads;

        if (filters?.status) {
            filteredLeads = filteredLeads.filter(lead => lead.status === filters.status);
        }

        if (filters?.serviceType) {
            filteredLeads = filteredLeads.filter(lead => lead.serviceType === filters.serviceType);
        }

        if (filters?.startDate) {
            filteredLeads = filteredLeads.filter(lead =>
                lead.createdAt && new Date(lead.createdAt) >= filters.startDate!
            );
        }

        if (filters?.endDate) {
            filteredLeads = filteredLeads.filter(lead =>
                lead.createdAt && new Date(lead.createdAt) <= filters.endDate!
            );
        }

        // Format data
        const formattedData = filteredLeads.map(lead => ({
            "ID": lead.id,
            "Nombre": `${lead.firstName || ''} ${lead.lastName || ''}`.trim(),
            "Email": lead.email || '',
            "Teléfono": lead.phone || '',
            "Código Postal": lead.zipCode || '',
            "Tipo de Servicio": lead.serviceType || '',
            "Tipo de Limpieza": lead.cleaningType || '',
            "Frecuencia": lead.frequency || '',
            "Habitaciones": lead.bedrooms || '',
            "Baños": lead.bathrooms || '',
            "Pies Cuadrados": lead.sqFt || '',
            "Fecha de Servicio": lead.serviceDate ? format(new Date(lead.serviceDate), "dd/MM/yyyy") : '',
            "Hora de Servicio": lead.serviceTime || '',
            "Dirección": lead.address || '',
            "Ciudad": lead.city || '',
            "Estado": lead.state || '',
            "Precio Total": lead.totalPrice ? `$${lead.totalPrice}` : '',
            "Estado del Lead": lead.status || '',
            "Notas": lead.notes || '',
            "Fecha de Creación": lead.createdAt ? format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm") : '',
        }));

        return { success: true, data: formattedData };
    } catch (error) {
        console.error("Error getting filtered leads for export:", error);
        return { success: false, error: "Failed to get leads" };
    }
}
