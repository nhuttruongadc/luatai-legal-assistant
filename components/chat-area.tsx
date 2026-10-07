import { Copy, RefreshCcw, ThumbsDown, ThumbsUp } from "lucide-react";

export function ChatArea({ initialMessages }: { initialMessages: any[] }) {
  return (
    <div className="mt-6 space-y-5">
      {initialMessages.map((message) => (
        <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-3xl rounded-[22px] px-4 py-3 ${
              message.role === "assistant"
                ? "bg-slate-100 text-slate-800"
                : "bg-navy-800 text-white"
            }`}
          >
            <p className="whitespace-pre-line text-[15px] leading-7">{message.content}</p>
            <div className="mt-3 flex items-center gap-2 text-[11px] opacity-80">
              <span>{message.timestamp}</span>
              {message.role === "assistant" && (
                <div className="flex items-center gap-2">
                  <button className="rounded-full bg-white/10 p-1.5">
                    <Copy size={12} />
                  </button>
                  <button className="rounded-full bg-white/10 p-1.5">
                    <RefreshCcw size={12} />
                  </button>
                  <button className="rounded-full bg-white/10 p-1.5">
                    <ThumbsUp size={12} />
                  </button>
                  <button className="rounded-full bg-white/10 p-1.5">
                    <ThumbsDown size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-[24px] border border-navy-100 bg-gradient-to-br from-navy-50 to-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-800">📌 Kết luận sơ bộ</h3>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Cần xem xét thêm</span>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Tình huống của bạn có dấu hiệu thuộc lĩnh vực vay nợ – hợp đồng. Hiện cần xác định rõ thời hạn, chứng từ, và tính xác thực của khoản nợ trước khi đưa ra nhận định pháp lý chắc chắn.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="text-base font-bold text-slate-800">⚖️ Căn cứ pháp lý</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><span className="font-semibold text-slate-800">Bộ luật Dân sự</span> – Điều 468</li>
              <li><span className="font-semibold text-slate-800">Bộ luật Dân sự</span> – Điều 117</li>
              <li><span className="font-semibold text-slate-800">Nghị định/Chính sách liên quan</span> – kiểm tra theo tình huống</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="text-base font-bold text-slate-800">✅ Bạn nên làm gì?</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Lưu giữ tin nhắn, giấy tờ, chuyển khoản.</li>
              <li>• Gửi nhắc nhở thanh toán bằng văn bản.</li>
              <li>• Nếu cần, tham khảo luật sư hoặc cơ quan có thẩm quyền.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button className="rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700">
          Hỏi tiếp
        </button>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-navy-200 hover:bg-navy-50">
          Phân tích sâu hơn
        </button>
      </div>
    </div>
  );
}
