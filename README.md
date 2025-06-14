# Destinasiku

Destinasiku adalah aplikasi rekomendasi destinasi wisata berbasis web yang dibuat menggunakan React dan Firebase. Aplikasi ini memungkinkan pengguna mencari, menyimpan, dan merencanakan perjalanan ke berbagai tempat wisata yang ada di wilayah Solo Raya.

## Fitur

- Autentikasi pengguna (register, login, forgot password)
- Rekomendasi dan pencarian destinasi wisata
- Menyukai dan menyimpan destinasi favorit
- Membuat rencana perjalanan (Plan)
- Halaman admin untuk kelola data wisata
- Filter berdasarkan kategori destinasi
- UI responsif

## Teknologi yang Digunakan

- React.js
- React Router DOM
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- Vercel (untuk deployment)

## Instalasi dan Setup Lokal

1. Clone repository ini

   ```bash
   git clone https://github.com/Oradra19/Capstone.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Buat file `.env` di root folder dan tambahkan variabel berikut:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
   ```

4. Jalankan server lokal

   ```bash
   npm run dev
   ```

5. Buka aplikasi di browser

   ```bash
   http://localhost:5173
   ```

## Deployment

Project ini dapat dideploy menggunakan Vercel berikut [Linknya](https://destinasiku.vercel.app/):

1. Hubungkan repository GitHub ke Vercel.
2. Di Vercel Dashboard, masuk ke **Settings > Environment Variables**.
3. Tambahkan semua environment variables seperti di file `.env` (gunakan awalan `VITE_`).
4. Klik **Deploy**.

## Kontribusi

- [Ogya Rajendra](https://github.com/Oradra19)
- [Diah Ayu Susilowati](https://github.com/dhayyue)
- [Yusuf Cahyo Utomo](https://github.com/username-teman)


## Lisensi

Project ini menggunakan lisensi [MIT](https://opensource.org/licenses/MIT).