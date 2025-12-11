// src/components/ui/ClaimModal.js
export default function ClaimModal({ policy, onClose, showToast }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-2xl p-10 shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">File Claim for {policy.id}</h2>
        <input placeholder="Claim details..." className="w-full px-4 py-3 border rounded-lg mb-6" />
        <div className="flex justify-end gap-4">
          <button onClick={() => { showToast("Claim submitted!", "success"); onClose(); }} className="bg-green-600 text-white px-6 py-3 rounded-lg">Submit</button>
          <button onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
}