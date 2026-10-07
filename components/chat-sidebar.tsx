import { Clock3, FileText, MessageSquareText, Search, Trash2 } from "lucide-react";

const conversations = [
  { title: "Vay nợ 100 triệu", time: "Hôm nay" },
  { title: "Ly hôn và tài sản", time: "Hôm qua" },
  { title: "Hợp đồng lao động", time: "2 ngày trước" },
  { title: "Thừa kế đất đai", time: "Tuần trước" },
];

export function ChatSidebar() {
  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-glow">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Lịch sử</p>
          <h3 className="text-lg font-bold text-slate-800">Cuộc trò chuyện</h3>
        </div>
        <button className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-navy-200 hover:bg-navy-50">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        <Search size={16} />
        <input
          className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
          placeholder="Tìm kiếm lịch sử"
        />
      </div>

      <div className="mt-5 space-y-3">
        {conversations.map((item) => (
          <button
            key={item.title}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:border-navy-200 hover:bg-navy-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-navy-100 p-2 text-navy-700">
                <MessageSquareText size={16} />
              </div>
              <div>
                <p className="font-semibold text-slate-700">{item.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={12} /> {item.time}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-navy-50 via-white to-blue-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
          <FileText size={16} />
          Tài liệu pháp lý
        </div>
        <p className="mt-2 text-sm text-slate-600">Phân tích PDF, Word, hợp đồng, giấy vay, quyết định xử phạt, đơn từ và văn bản liên quan.</p>
      </div>
    </aside>
  );
}
