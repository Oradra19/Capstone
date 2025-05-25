import { FaEdit, FaTrash } from "react-icons/fa";

const DataTableDestinasi = ({ data, onEdit, onDelete }) => (
  <table className="w-full text-sm border text-center">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-2 py-1">No</th>
        <th className="border px-2 py-1">Foto</th>
        <th className="border px-2 py-1">Rating</th>
        <th className="border px-2 py-1">Nama</th>
        <th className="border px-2 py-1">Deskripsi</th>
        <th className="border px-2 py-1">Harga</th>
        <th className="border px-2 py-1">Gmaps</th>
        <th className="border px-2 py-1">Lokasi</th>
        <th className="border px-2 py-1">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id} className="border">
          <td className="border px-2 py-1">{index + 1}</td>
          <td className="border px-2 py-1">
            <img
              src={item.foto}
              alt={item.nama}
              className="w-24 h-16 object-cover rounded"
            />
          </td>
          <td className="border px-2 py-1">{item.rating}★</td>
          <td className="border px-2 py-1 font-bold">{item.nama}</td>
          <td className="border px-2 py-1 text-gray-700">
            {item.deskripsi.length > 50
              ? `${item.deskripsi.slice(0, 50)}...`
              : item.deskripsi}
          </td>
          <td className="border px-2 py-1 text-center">{item.harga}</td>
          <td className="border px-2 py-1 text-blue-600 underline text-center">
            <a href={item.gmaps} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </td>
          <td className="border px-2 py-1 text-center">{item.lokasi}</td>
          <td className="border px-2 py-1 flex gap-1 justify-center">
            <button
              onClick={() => onEdit(item)}
              className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
            >
              <FaEdit /> edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
            >
              <FaTrash /> hapus
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTableDestinasi;
