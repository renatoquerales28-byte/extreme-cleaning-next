"use client";

import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { getLeadsForExport } from "@/app/actions/export";
import * as XLSX from "xlsx";

export default function ExportLeadsButton() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);

        try {
            const result = await getLeadsForExport();

            if (!result.success || !result.data) {
                alert("Error al exportar leads. Por favor intenta de nuevo.");
                return;
            }

            // Create worksheet from data
            const ws = XLSX.utils.json_to_sheet(result.data);

            // Set column widths for better readability
            const columnWidths = [
                { wch: 5 },  // ID
                { wch: 20 }, // Nombre
                { wch: 25 }, // Email
                { wch: 15 }, // Teléfono
                { wch: 10 }, // Código Postal
                { wch: 15 }, // Tipo de Servicio
                { wch: 15 }, // Tipo de Limpieza
                { wch: 12 }, // Frecuencia
                { wch: 12 }, // Habitaciones
                { wch: 8 },  // Baños
                { wch: 15 }, // Pies Cuadrados
                { wch: 15 }, // Fecha de Servicio
                { wch: 15 }, // Hora de Servicio
                { wch: 30 }, // Dirección
                { wch: 15 }, // Ciudad
                { wch: 8 },  // Estado
                { wch: 12 }, // Precio Total
                { wch: 15 }, // Estado del Lead
                { wch: 30 }, // Notas
                { wch: 18 }, // Fecha de Creación
            ];
            ws['!cols'] = columnWidths;

            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Leads");

            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const filename = `extreme-cleaning-leads-${date}.xlsx`;

            // Download file
            XLSX.writeFile(wb, filename);

            console.log(`Exported ${result.data.length} leads to ${filename}`);
        } catch (error) {
            console.error("Error exporting leads:", error);
            alert("Error al exportar. Por favor intenta de nuevo.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-[#0891B2] text-white rounded-lg hover:bg-[#0E7490] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
        >
            {isExporting ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Exportando...</span>
                </>
            ) : (
                <>
                    <FileSpreadsheet size={18} />
                    <span>Exportar a Excel</span>
                    <Download size={16} />
                </>
            )}
        </button>
    );
}
