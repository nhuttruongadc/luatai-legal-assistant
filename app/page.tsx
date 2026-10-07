import { fetchLegalAnswer } from "@/lib/legal-data";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatArea } from "@/components/chat-area";
import { DocumentUploadCard } from "@/components/document-upload-card";
import { PromptChips } from "@/components/prompt-chips";
import { LegalAlert } from "@/components/legal-alert";

const initialConversation = [
  {
    id: "welcome",
    role: "assistant",
    content: "Xin chào! Tôi là LUẬT AI. Bạn có thể mô tả vấn đề pháp lý của mình, ví dụ: vay nợ, ly hôn, hợp đồng, lao động, đất đai...",
    timestamp: "just now",
    metadata: {
      conclusion: "Hãy mô tả rõ tình huống và thông tin cần thiết để tôi phân tích.",
      legalBasis: [],
      riskLevel: "thấp",
    },
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-4 xl:px-6">
        <header className="rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 shadow-glow backdrop-blur-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy-700/70">AI LEGAL ASSISTANT</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-navy-900 md:text-4xl">
                LUẬT AI
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">Trợ lý pháp luật Việt Nam</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-navy-200 hover:bg-navy-50">
                Tạo cuộc trò chuyện mới
              </button>
              <button className="rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-navy-800/20 transition hover:bg-navy-700">
                Gửi câu hỏi
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
          <ChatSidebar />

          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-glow">
            <div className="border-b border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Cuộc trò chuyện</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-800">Hỏi đáp pháp lý</h2>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Mô hình tham khảo
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-4">
                <label className="block text-sm font-semibold text-slate-700">Bạn đang gặp vấn đề pháp lý gì?</label>
                <textarea
                  className="mt-3 min-h-[110px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-700 outline-none transition focus:border-navy-400 focus:ring-4 focus:ring-navy-100"
                  placeholder="Ví dụ: Tôi cho người khác vay 100 triệu nhưng đến hạn họ không trả thì tôi phải làm gì?"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <PromptChips />
                </div>
              </div>

              <ChatArea initialMessages={initialConversation as any} />
            </div>
          </section>

          <div className="space-y-6">
            <DocumentUploadCard />
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-glow">
              <h3 className="text-lg font-bold text-slate-800">Điểm nổi bật</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="rounded-xl bg-slate-50 p-3">• Xác định lĩnh vực pháp lý đúng tình huống</li>
                <li className="rounded-xl bg-slate-50 p-3">• Căn cứ pháp lý + giải thích dễ hiểu</li>
                <li className="rounded-xl bg-slate-50 p-3">• Hướng xử lý theo từng bước thực tế</li>
                <li className="rounded-xl bg-slate-50 p-3">• Rủi ro và câu hỏi bổ sung khi thiếu dữ kiện</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <LegalAlert />
    </main>
  );
}
