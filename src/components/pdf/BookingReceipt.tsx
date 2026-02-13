import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para un look corporativo limpio (Verde oscuro y Esmeralda)
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 12, color: '#333' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottom: 2, borderBottomColor: '#024653', paddingBottom: 10 },
    brandTitle: { fontSize: 20, color: '#024653', fontWeight: 'bold' },
    brandSubtitle: { fontSize: 10, color: '#10b981' }, // Emerald accent
    invoiceInfo: { textAlign: 'right' },
    sectionTitle: { fontSize: 14, color: '#024653', marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
    row: { flexDirection: 'row', borderBottom: 1, borderBottomColor: '#eee', paddingVertical: 5 },
    colLabel: { width: '40%', color: '#666' },
    colValue: { width: '60%', fontWeight: 'bold' },
    totalSection: { marginTop: 30, padding: 10, backgroundColor: '#f0fdf4', borderRadius: 4 }, // Emerald-50 background look
    totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#024653' },
    footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#9ca3af', borderTop: 1, borderTopColor: '#eee', paddingTop: 10 }
});

export const BookingReceipt = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.brandTitle}>ECS</Text>
                    <Text style={styles.brandSubtitle}>Extreme Cleaning Solutions</Text>
                </View>
                <View style={styles.invoiceInfo}>
                    <Text style={{ fontSize: 10, color: 'gray' }}>DATE</Text>
                    <Text>{new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            <Text style={{ marginBottom: 20 }}>
                Thank you, {data.firstName}! Your cleaning service is confirmed.
            </Text>

            {/* Service Details */}
            <Text style={styles.sectionTitle}>Service Details</Text>
            <View style={styles.row}>
                <Text style={styles.colLabel}>Service Type</Text>
                <Text style={styles.colValue}>{data.serviceType?.toUpperCase()}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.colLabel}>Frequency</Text>
                <Text style={styles.colValue}>{data.frequency || 'One-Time'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.colLabel}>Date & Time</Text>
                <Text style={styles.colValue}>
                    {data.date ? new Date(data.date).toLocaleDateString() : 'TBD'}
                </Text>
            </View>

            {/* Location */}
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.row}>
                <Text style={styles.colLabel}>Address</Text>
                <Text style={styles.colValue}>{data.streetAddress}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.colLabel}>City / Zip</Text>
                <Text style={styles.colValue}>{data.city}, {data.zipCode}</Text>
            </View>

            {/* Financials */}
            <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                    <Text style={{ color: '#024653' }}>ESTIMATED TOTAL</Text>
                    <Text style={styles.totalText}>${data.totalPrice || '0.00'}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Questions? Contact us at support@extremecleaningsolutions.com</Text>
                <Text style={{ marginTop: 4 }}>Premium Care, Guaranteed Quality.</Text>
            </View>
        </Page>
    </Document>
);
