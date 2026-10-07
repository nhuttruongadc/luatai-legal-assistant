"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Copy,
  FileText,
  MessageSquareText,
  RefreshCcw,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { legalCategories } from "@/lib/legal-data";

type LegalBasisItem = {
  title: string;
  article: string;
  summary: string;
  source: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  conclusion?: string;
  legalBasis?: LegalBasisItem[];
  analysis?: string;
  nextSteps?: string[];
  risks?: string[];
  questions?: string[];
};

const starterMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Xin chào! Tôi là LUẬT AI. Bạn có thể mô tả vấn đề pháp lý của mình, ví dụ: vay nợ, ly hôn, hợp đồng, lao động, đất đai...",
    timestamp: "Vừa xong",
    conclusion: "Hãy mô tả rõ tình huống và thông tin cần thiết để tôi phân tích.",
    legalBasis: [],
    analysis:
      "Tôi sẽ xác định lĩnh vực pháp lý, tóm tắt tình huống, nêu căn cứ pháp lý có liên quan và đề xuất hướng xử lý thực tế.",
    nextSteps: [
      "Mô tả tình huống bằng ngôn ngữ tự nhiên.",
      "Cung cấp thông tin về thời điểm, chứng cứ và mục đích giải quyết.",
    ],
    risks: ["Không đủ dữ kiện có thể làm thay đổi kết luận pháp lý."],
    questions: [
      "Bạn đang gặp vấn đề gì?",
      "Đã có giấy tờ/chứng cứ chưa?",
      "Bạn muốn giải quyết bằng thương lượng, khiếu kiện hay tư vấn?",
    ],
  },
];

const historyItems = [
  { title: "Vay nợ 100 triệu", time: "Hôm nay" },
  { title: "Ly hôn và tài sản", time: "Hôm qua" },
  { title: "Hợp đồng lao động", time: "2 ngày trước" },
  { title: "Thừa kế đất đai", time: "Tuần trước" },
];

const suggestionTags = [
  "Đất đai",
  "Vay nợ",
  "Ly hôn",
  "Lao động",
  "Giao thông",
  "Hợp đồng",
  "Thừa kế",
  "Hình sự",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredHistory = useMemo(() => {
    if (!searchText.trim()) return historyItems;
    return historyItems.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSend = async (value?: string) => {
    const message = (value ?? draft).trim();
    if (!message || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: "Vừa xong",
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: messages }),
      });

      const payload = await response.json();
      const answer = payload.answer ?? payload;

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          answer?.analysis ??
          "Tôi đã nhận được câu hỏi. Cần thêm dữ kiện để đánh giá đúng tình huống.",
        timestamp: "Vừa xong",
        conclusion: answer?.conclusion ?? "Cần bổ sung thông tin để phân tích rõ hơn.",
        legalBasis: answer?.legalBasis ?? [],
        analysis:
          answer?.analysis ?? answer?.summary ?? "Tôi cần kiểm tra thêm các yếu tố liên quan.",
        nextSteps:
          answer?.nextSteps ?? [
            "Thu thập chứng cứ.",
            "Xác định thời điểm phát sinh tranh chấp.",
          ],
        risks:
          answer?.risks ?? ["Thiếu dữ kiện có thể làm thay đổi kết luận."],
        questions: answer?.questions ?? ["Bạn có thể cung cấp thêm thông tin?"],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            "Tôi đang gặp sự cố kỹ thuật tạm thời. Vui lòng thử lại hoặc mô tả rõ hơn tình huống pháp lý của bạn.",
          timestamp: "Vừa xong",
          conclusion: "Tạm thời chưa thể đánh giá chính xác do lỗi kỹ thuật.",
          legalBasis: [],
          nextSteps: [
            "Thử lại sau vài giây.",
            "Mô tả rõ tình huống đối với trường hợp này.",
          ],
          risks: ["Kết luận có thể không chính xác nếu chưa có đủ thông tin."],
          questions: ["Bạn đang gặp vụ việc nào?"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-4 xl:px-6">
        <header className="rounded-[28px] border border-slate-200 bg-white/90 px-5 py-4 shadow-glow backdrop-blur-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy-700/70">
                AI LEGAL ASSISTANT
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-navy-900 md:text-4xl">
                LUẬT AI
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Trợ lý pháp luật Việt Nam
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-navy-200 hover:bg-navy-50">
                Tạo cuộc trò chuyện mới
              </button>
              <button
                className="rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-navy-800/20 transition hover:bg-navy-700"
                onClick={() => handleSend()}
              >
                Gửi câu hỏi
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
          <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-glow">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                  Lịch sử
                </p>
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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="mt-5 space-y-3">
              {filteredHistory.map((item) => (
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
                        <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                        {item.time}
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
              <p className="mt-2 text-sm text-slate-600">
                Phân tích PDF, Word, hợp đồng, giấy vay, quyết định xử phạt, đơn từ và văn bản liên quan.
              </p>
            </div>
          </aside>

          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-glow">
            <div className="border-b border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Cuộc trò chuyện
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-800">Hỏi đáp pháp lý</h2>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Mô hình tham khảo
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-[22px] border border-dashed border-slate-200 bg-slate-50 p-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Bạn đang gặp vấn đề pháp lý gì?
                </label>
                <textarea
                  className="mt-3 min-h-[110px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-700 outline-none transition focus:border-navy-400 focus:ring-4 focus:ring-navy-100"
                  placeholder="Ví dụ: Tôi cho người khác vay 100 triệu nhưng đến hạn họ không trả thì tôi phải làm gì?"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestionTags.map((tag) => (
                    <button
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-navy-200 hover:bg-navy-50"
                      onClick={() => setDraft(`Tôi cần tư vấn về ${tag.toLowerCase()}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-[22px] px-4 py-3 ${
                        message.role === "assistant"
                          ? "bg-slate-100 text-slate-800"
                          : "bg-navy-800 text-white"
                      }`}
                    >
                      <p className="whitespace-pre-line text-[15px] leading-7">
                        {message.content}
                      </p>

                      {message.role === "assistant" && (
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Sparkles size={16} className="text-navy-700" />
                            <span>📌 Kết luận sơ bộ</span>
                          </div>
                          <p className="mt-2 text-sm leading-7 text-slate-700">
                            {message.conclusion ?? "Cần bổ sung thông tin để phân tích đúng trường hợp."}
                          </p>

                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-3">
                              <h4 className="text-sm font-bold text-slate-800">⚖️ Căn cứ pháp lý</h4>
                              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                                {message.legalBasis && message.legalBasis.length > 0 ? (
                                  message.legalBasis.map((item, index) => (
                                    <li key={`${item.title}-${index}`}>
                                      <span className="font-semibold text-slate-800">
                                        {item.title}
                                      </span>{" "}
                                      – {item.article}
                                    </li>
                                  ))
                                ) : (
                                  <li>• Bộ luật Dân sự, Điều 468 và Điều 117</li>
                                )}
                              </ul>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-3">
                              <h4 className="text-sm font-bold text-slate-800">✅ Bạn nên làm gì?</h4>
                              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                                {(message.nextSteps ?? [
                                  "Lưu giữ giấy tờ liên quan.",
                                  "Đánh giá chứng cứ và nhu cầu tư vấn.",
                                ]).map((item, idx) => (
                                  <li key={`${item}-${idx}`}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                              <AlertTriangle size={15} />
                              ⚠️ Rủi ro cần lưu ý
                            </div>
                            <ul className="mt-2 space-y-1 text-xs text-amber-700">
                              {(message.risks ?? ["Kết luận có thể thay đổi nếu thiếu chứng cứ."]).map(
                                (item, idx) => <li key={`${item}-${idx}`}>• {item}</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}

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

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-xl rounded-[22px] bg-slate-100 px-4 py-3 text-slate-700">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-navy-700" />
                        LUẬT AI đang phân tích...
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    className="rounded-full bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
                    onClick={() => handleSend()}
                  >
                    Hỏi tiếp
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-navy-200 hover:bg-navy-50">
                    Phân tích sâu hơn
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Phân tích hồ sơ
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-800">
                    Tải lên tài liệu pháp lý
                  </h3>
                </div>
                <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                  <UploadCloud size={18} />
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-navy-300 hover:bg-navy-50">
                <UploadCloud size={28} className="text-navy-700" />
                <span className="mt-3 text-sm font-semibold text-slate-700">
                  Kéo thả tài liệu hoặc nhấn để tải lên
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  PDF, Word, ảnh, hợp đồng, giấy vay, quyết định, đơn từ
                </span>
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

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-glow">
              <h3 className="text-lg font-bold text-slate-800">Điểm nổi bật</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="rounded-xl bg-slate-50 p-3">• Xác định lĩnh vực pháp lý đúng tình huống</li>
                <li className="rounded-xl bg-slate-50 p-3">• Căn cứ pháp lý + giải thích dễ hiểu</li>
                <li className="rounded-xl bg-slate-50 p-3">• Hướng xử lý theo từng bước thực tế</li>
                <li className="rounded-xl bg-slate-50 p-3">• Rủi ro và câu hỏi bổ sung khi thiếu dữ kiện</li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-glow">
              <h3 className="text-lg font-bold text-slate-800">Các lĩnh vực</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {legalCategories.slice(0, 8).map((item) => (
                  <span
                    key={item.name}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
        <div className="max-w-5xl rounded-full border border-blue-200 bg-white/95 px-5 py-3 text-center text-xs font-medium text-slate-700 shadow-2xl backdrop-blur-md sm:text-sm">
          “Thông tin do AI cung cấp chỉ nhằm mục đích tham khảo và hỗ trợ tra cứu pháp luật, không thay thế tư vấn pháp lý của luật sư hoặc cơ quan có thẩm quyền.”
        </div>
      </div>
    </main>
  );
}
