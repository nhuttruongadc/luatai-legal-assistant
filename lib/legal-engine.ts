import { legalCategories, legalSources } from "@/lib/legal-data";

export type LegalBasisItem = {
  title: string;
  article: string;
  summary: string;
  source: string;
};

export type LegalResponse = {
  category: string;
  conclusion: string;
  summary: string;
  legalBasis: LegalBasisItem[];
  analysis: string;
  nextSteps: string[];
  risks: string[];
  questions: string[];
};

function detectCategory(question: string) {
  const value = question.toLowerCase();

  if (/(vay|nợ|cho vay|đòi nợ|tiền mặt|tín dụng)/.test(value)) return "Vay tiền – nợ";
  if (/(ly hôn|hôn nhân|gia đình|nuôi con|chung sống)/.test(value)) return "Ly hôn";
  if (/(thừa kế|di chúc|tài sản cha mẹ|chia tài sản)/.test(value)) return "Thừa kế";
  if (/(đất|nhà ở|sổ đỏ|quyền sử dụng đất|chuyển nhượng đất)/.test(value)) return "Đất đai – nhà ở";
  if (/(lao động|lương|thỏa thuận lao động|kỷ luật|đi làm)/.test(value)) return "Lao động – tiền lương";
  if (/(hợp đồng|điều khoản|cung cấp dịch vụ|mua bán)/.test(value)) return "Hợp đồng";
  if (/(giao thông|tai nạn|phạt nguội|đường bộ)/.test(value)) return "Giao thông";
  if (/(hình sự|bắt giữ|cáo buộc|tội phạm)/.test(value)) return "Hình sự";
  if (/(doanh nghiệp|thành lập|công ty|đăng ký kinh doanh)/.test(value)) return "Doanh nghiệp";
  return "Các vấn đề pháp luật khác";
}

function needsMoreInfo(question: string) {
  const normalized = question.trim();
  return normalized.length < 30 || !/[\?\.|,]/.test(normalized);
}

function buildLegalBasis(category: string): LegalBasisItem[] {
  const categoryMap: Record<string, LegalBasisItem[]> = {
    "Vay tiền – nợ": [
      { title: "Bộ luật Dân sự", article: "Điều 468", summary: "Về nghĩa vụ thanh toán và thực hiện hợp đồng vay tiền.", source: "https://vanban.chinhphu.vn/" },
      { title: "Bộ luật Dân sự", article: "Điều 117", summary: "Về hợp đồng, nghĩa vụ và trách nhiệm dân sự.", source: "https://vanban.chinhphu.vn/" },
    ],
    "Ly hôn": [
      { title: "Bộ luật Hôn nhân và Gia đình", article: "Điều 51", summary: "Về ly hôn và thủ tục giải quyết khi vợ chồng không còn sự đồng thuận.", source: "https://moj.gov.vn/" },
      { title: "Bộ luật Hôn nhân và Gia đình", article: "Điều 81", summary: "Về nghĩa vụ cấp dưỡng và nuôi con sau ly hôn.", source: "https://moj.gov.vn/" },
    ],
    "Thừa kế": [
      { title: "Bộ luật Dân sự", article: "Điều 640", summary: "Về thừa kế theo di chúc và pháp luật.", source: "https://vanban.chinhphu.vn/" },
      { title: "Bộ luật Dân sự", article: "Điều 682", summary: "Về quyền và nghĩa vụ của người thừa kế liên quan đến tài sản. ", source: "https://vanban.chinhphu.vn/" },
    ],
    "Đất đai – nhà ở": [
      { title: "Luật Đất đai", article: "Điều 39", summary: "Về quyền sử dụng đất và chuyển nhượng quyền sử dụng đất.", source: "https://vanban.chinhphu.vn/" },
      { title: "Bộ luật Dân sự", article: "Điều 288", summary: "Về quyền sở hữu, sử dụng và thực hiện giao dịch tài sản.", source: "https://vanban.chinhphu.vn/" },
    ],
    "Lao động – tiền lương": [
      { title: "Bộ luật Lao động", article: "Điều 21", summary: "Về hợp đồng lao động và quyền lợi người lao động.", source: "https://molisa.gov.vn/" },
      { title: "Bộ luật Lao động", article: "Điều 91", summary: "Về tiền lương, chế độ lao động và bồi thường.", source: "https://molisa.gov.vn/" },
    ],
    "Hợp đồng": [
      { title: "Bộ luật Dân sự", article: "Điều 117", summary: "Về hợp đồng, nghĩa vụ và trách nhiệm thực hiện giao dịch.", source: "https://vanban.chinhphu.vn/" },
      { title: "Bộ luật Dân sự", article: "Điều 400", summary: "Về giao kết hợp đồng và phương thức thực hiện nghĩa vụ.", source: "https://vanban.chinhphu.vn/" },
    ],
    "Giao thông": [
      { title: "Luật Giao thông đường bộ", article: "Điều 57", summary: "Về người điều khiển phương tiện và trách nhiệm khi tham gia giao thông.", source: "https://moc.gov.vn/" },
      { title: "Luật Giao thông đường bộ", article: "Điều 12", summary: "Về các nguyên tắc xử lý vi phạm, tai nạn và bồi thường.", source: "https://moc.gov.vn/" },
    ],
    "Hình sự": [
      { title: "Bộ luật Hình sự", article: "Điều 2", summary: "Về nguyên tắc xử lý hành vi nguy hiểm cho xã hội.", source: "https://moj.gov.vn/" },
      { title: "Bộ luật Hình sự", article: "Điều 9", summary: "Về trách nhiệm hình sự và nguyên tắc xét xử.", source: "https://moj.gov.vn/" },
    ],
    "Doanh nghiệp": [
      { title: "Luật Doanh nghiệp", article: "Điều 10", summary: "Về nguyên tắc thành lập và hoạt động doanh nghiệp.", source: "https://vanban.chinhphu.vn/" },
      { title: "Luật Doanh nghiệp", article: "Điều 45", summary: "Về nghĩa vụ tài chính và quản trị doanh nghiệp.", source: "https://vanban.chinhphu.vn/" },
    ],
  };

  return categoryMap[category] ?? [
    { title: "Bộ luật Dân sự", article: "Điều 117", summary: "Về hợp đồng và nghĩa vụ dân sự chung.", source: "https://vanban.chinhphu.vn/" },
    { title: "Bộ luật Dân sự", article: "Điều 468", summary: "Về thực hiện nghĩa vụ và thanh toán khi có tranh chấp.", source: "https://vanban.chinhphu.vn/" },
  ];
}

export async function POST(request: Request) {
  const input = await request.json();
  const message = String(input?.message ?? "").trim();
  const history = Array.isArray(input?.history) ? input.history : [];

  const category = detectCategory(message) || "Các vấn đề pháp luật khác";
  const shortQuestion = needsMoreInfo(message);

  const response: LegalResponse = {
    category,
    conclusion: shortQuestion
      ? "Cần bổ sung thông tin quan trọng để đánh giá đúng tình huống."
      : `Tình huống của bạn thuộc lĩnh vực ${category}. Cần xác định rõ các yếu tố thực tế và chứng cứ trước khi kết luận chắc chắn.`,
    summary: shortQuestion
      ? `Bạn đang gặp vấn đề liên quan đến ${category}. Hiện chưa đủ dữ liệu để xác định hoàn toàn hướng xử lý phù hợp.`
      : `Bạn đang gặp một vấn đề thuộc ${category}. Cần đánh giá kỹ về pháp lý, chứng cứ và quyền lợi của các bên liên quan.`,
    legalBasis: buildLegalBasis(category),
    analysis: shortQuestion
      ? "Nếu thiếu số tiền, thời hạn, chứng từ, lời thừa nhận của bên liên quan hoặc các sự kiện quan trọng, kết quả phân tích có thể thay đổi. Người dùng nên cung cấp thêm thông tin để AI đánh giá chính xác hơn."
      : "Pháp luật sẽ xem xét các yếu tố như thời điểm phát sinh, hành vi, giấy tờ, cam kết, quyền và nghĩa vụ, cũng như các chứng cứ hiện có. Kết luận phụ thuộc vào sự thật và dữ liệu cụ thể của từng vụ việc.",
    nextSteps: shortQuestion
      ? [
          "Liệt kê cụ thể thời điểm, số tiền, công việc hoặc tài sản liên quan.",
          "Tổng hợp giấy tờ, tin nhắn, hóa đơn, chuyển khoản hoặc biên bản.",
          "Nếu có dấu hiệu rủi ro cao, tham khảo luật sư hoặc cơ quan có thẩm quyền.",
        ]
      : [
          "Lưu giữ chứng cứ và thông tin liên quan.",
          "Xác định hướng xử lý phù hợp: thương lượng, khiếu nại, hòa giải hoặc nhờ luật sư.",
          "Nếu vụ việc có tính nghiêm trọng, tham khảo cơ quan hoặc luật sư có thẩm quyền.",
        ],
    risks: shortQuestion
      ? [
          "Thiếu chứng cứ có thể làm sai lệch kết luận pháp lý.",
          "Bất đồng về thời điểm hoặc nội dung lời nói có thể làm thay đổi cách đánh giá.",
        ]
      : [
          "Thiếu chứng cứ có thể làm suy yếu quyền yêu cầu và khả năng bảo vệ lợi ích.",
          "Kết luận có thể thay đổi nếu có thêm thông tin mới hoặc khi có văn bản pháp lý cụ thể áp dụng.",
        ],
    questions: shortQuestion
      ? [
          "Số tiền hoặc giá trị cụ thể là bao nhiêu?",
          "Bạn có giấy tờ, tin nhắn, hóa đơn, hợp đồng, lời thừa nhận nào không?",
          "Khoản việc đã xảy ra khi nào, và đã đến hạn chưa?",
        ]
      : [
          "Bạn muốn tiếp tục xử lý theo hướng thương lượng, khiếu nại hay cần tư vấn pháp lý chi tiết hơn?",
          "Bạn có thể cung cấp thêm các chứng cứ quan trọng không?",
          "Nếu cần, tôi có thể giúp bạn lập danh sách hồ sơ và các bước xử lý theo từng tình huống.",
        ],
  };

  return Response.json({ success: true, category, answer: response, historyCount: history.length });
}
