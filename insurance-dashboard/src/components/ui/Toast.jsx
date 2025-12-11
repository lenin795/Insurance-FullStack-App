// src/components/ui/Toast.js
export default function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
      <span>{message}</span>
      <button className="ml-4 font-bold" onClick={onClose}>×</button>
    </div>
  );
}