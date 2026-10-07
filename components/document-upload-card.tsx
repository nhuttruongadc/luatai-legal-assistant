import { AlertTriangle, FileUp } from "lucide-react";

export function DocumentUploadCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Phân tích hồ sơ</p>
          <h3 className="mt-1 text-lg font-bold text-slate-800">Tải lên tài liệu pháp lý</h3>
        </div>
        <div className="rounded-full bg-amber-100 p-2 text-amber-700">
          <FileUp size={18} />
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-navy-300 hover:bg-navy-50">
        <FileUp size={28} className="text-navy-700" />
        <span className="mt-3 text-sm font-semibold text-slate-700">Kéo thả tài liệu hoặc nhấn để tải lên</span>
        <span className="mt-1 text-xs text-slate-500">PDF, Word, ảnh, hợp đồng, giấy vay, quyết định, đơn từ</span>
        <input type="file" className="hidden" multiple />
      </label>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle size={16} />
          Thông tin cảnh báo pháp lý
        </div>
        <p className="mt-2 text-amber-700">
          AI chỉ hỗ trợ phân tích, tóm tắt và đánh giá sơ bộ. Không thay thế tư vấn pháp lý chuyên nghiệp cho từng trường hợp cụ thể.
        </p>
      </div>
    </div>
  );
}
