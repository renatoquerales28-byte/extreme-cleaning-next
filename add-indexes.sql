-- OPTIMIZACIÓN: Agregar índices para mejorar performance de queries

-- Índice en la columna id (debería existir por defecto como PRIMARY KEY, pero verificamos)
-- Si ya existe, PostgreSQL lo ignorará
CREATE INDEX IF NOT EXISTS idx_leads_id ON leads(id);

-- Índice en email para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Índice en phone para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- Índice en status para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Índice en created_at para ordenar por fecha
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Índice en service_date para búsquedas por fecha de servicio
CREATE INDEX IF NOT EXISTS idx_leads_service_date ON leads(service_date);

-- Verificar índices creados
SELECT 
    tablename,
    indexname,
    indexdef
FROM 
    pg_indexes
WHERE 
    tablename = 'leads'
ORDER BY 
    indexname;
