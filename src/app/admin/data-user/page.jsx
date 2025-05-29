// import React, { useState, useEffect } from "react";
// import Sidebar from "../../../components/admin/sidebar";
// import Header from "../../../components/admin/header";
// import Footer from "../../../components/admin/footer";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import ModalForm from "../../../components/admin/modalformuser"; 
// import { db, auth } from "../../../firebase/firebase";
// import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const DataUser = () => {
//   const [users, setUsers] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const usersData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(usersData);
//     });
//     return () => unsubscribe();
//   }, []);


//   const handleEdit = (user) => {
//     setEditUser(user);
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//   if (window.confirm("Yakin ingin menghapus user ini?")) {
//     await deleteDoc(doc(db, "users", id));
//   }
// };


//   const handleAdd = () => {
//     setEditUser(null);
//     setModalOpen(true);
//   };

//  const handleSubmit = async (data) => {
//   try {
//     if (editUser) {
//       const userRef = doc(db, "users", editUser.id);
//       await updateDoc(userRef, data);
//     } else {
//       // 1. Buat akun auth
//       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//       const uid = userCredential.user.uid;

//       // 2. Simpan ke firestore dengan UID
//       await addDoc(collection(db, "users"), {
//         uid,
//         username: data.username,
//         email: data.email,
//         role: data.role,
//       });
//     }
//   } catch (error) {
//     console.error("Gagal menyimpan data user:", error.message);
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row font-sans">
//       <Sidebar />
//       <main className="ml-64 flex-1 bg-[#F5F7FA] p-6 flex flex-col min-h-screen pb-24">
//         <Header title="Data User" />
//         <div className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between mb-4">
//             <div>
//               Show{" "}
//               <select className="border rounded px-2 py-1 mx-2">
//                 <option>10</option>
//               </select>{" "}
//               entries
//             </div>
//             <button
//               onClick={handleAdd}
//               className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
//             >
//               + tambah user
//             </button>
//           </div>
//           <table className="w-full text-sm border text-center">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1">No</th>
//                 <th className="border px-2 py-1">Nama</th>
//                 <th className="border px-2 py-1">Email</th>
//                 <th className="border px-2 py-1">Role</th>
//                 <th className="border px-2 py-1">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user.id} className="border">
//                   <td className="border px-2 py-1">{index + 1}</td>
//                   <td className="border px-2 py-1 font-semibold">{user.nama}</td>
//                   <td className="border px-2 py-1">{user.email}</td>
//                   <td className="border px-2 py-1 text-center">{user.role}</td>
//                   <td className="border px-2 py-1 flex gap-1 justify-center">
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
//                     >
//                       <FaEdit /> edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
//                     >
//                       <FaTrash /> hapus
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <Footer />
//       </main>

//       <ModalForm
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         initialData={editUser}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default DataUser;
