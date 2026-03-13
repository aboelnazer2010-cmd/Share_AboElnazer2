import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import nodejs from 'nodejs-mobile-react-native';

export default function App() {
  const [ipAddress, setIpAddress] = useState('جاري البحث عن IP...');

  useEffect(() => {
    // تشغيل السيرفر في الخلفية
    nodejs.start('main.js');
    
    // جلب عنوان الـ IP
    NetworkInfo.getIPV4Address().then(ip => {
      setIpAddress(ip || 'تأكد من اتصالك بشبكة Wi-Fi');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Share AboElnazer Server</Text>
        <Text style={styles.instruction}>أدخل هذا الرابط في متصفح جهازك اللوحي:</Text>
        <Text style={styles.ipText}>http://{ipAddress}:3000</Text>
        <Text style={styles.footer}>أبقِ هذا التطبيق مفتوحاً لكي يعمل السيرفر</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#1a1a1a', padding: 25, borderRadius: 15, width: '90%', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  title: { color: '#7289da', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  instruction: { color: '#a1a1aa', marginBottom: 15, textAlign: 'center' },
  ipText: { color: '#10b981', fontSize: 20, fontWeight: 'bold', padding: 10, backgroundColor: '#10b98120', borderRadius: 8 },
  footer: { color: '#555', marginTop: 20, fontSize: 12 }
});