export const legalCategories = [
  { name: "Đất đai – nhà ở", summary: "Quyền sử dụng đất, mua bán, tranh chấp nhà ở." },
  { name: "Hôn nhân – gia đình", summary: "Hôn nhân, tài sản chung, con cái, nghĩa vụ." },
  { name: "Ly hôn", summary: "Thủ tục ly hôn, tài sản, nuôi con, chăm sóc con." },
  { name: "Thừa kế", summary: "Di chúc, thừa kế theo pháp luật, chia tài sản." },
  { name: "Vay tiền – nợ", summary: "Hợp đồng vay, lãi suất, đòi nợ, chứng từ." },
  { name: "Hợp đồng", summary: "Hợp đồng mua bán, dịch vụ, thực hiện nghĩa vụ." },
  { name: "Dân sự", summary: "Bồi thường, tài sản, nghĩa vụ dân sự." },
  { name: "Hình sự", summary: "Tội phạm, điều tra, xét xử, bảo vệ quyền." },
  { name: "Hành chính", summary: "Khiếu nại, quyết định hành chính, cấp phép." },
  { name: "Giao thông", summary: "Tai nạn, vi phạm giao thông, phạt nguội." },
  { name: "Lao động – tiền lương", summary: "Hợp đồng lao động, lương, nghỉ phép, chấm dứt." },
  { name: "Bảo hiểm xã hội", summary: "BHXH, bảo hiểm thất nghiệp, chế độ lao động." },
  { name: "Thuế", summary: "Hồ sơ, nghĩa vụ thuế, xử lý sai phạm." },
  { name: "Doanh nghiệp", summary: "Thành lập, pháp lý doanh nghiệp, tranh chấp." },
  { name: "Hộ kinh doanh", summary: "Đăng ký, nghĩa vụ, thuế, pháp lý hộ kinh doanh." },
  { name: "Mua bán hàng hóa", summary: "Bán hàng, đổi trả, bảo hành, vi phạm." },
  { name: "Khiếu nại – tố cáo", summary: "Thủ tục khiếu nại, tố cáo, giải quyết." },
  { name: "Giáo dục", summary: "Học phí, học bạ, chế độ, quyền lợi học sinh." },
  { name: "Quyền riêng tư", summary: "Bảo vệ thông tin cá nhân, mạng xã hội, dữ liệu." },
  { name: "Internet – mạng xã hội", summary: "Bài viết, hình ảnh, lừa đảo, kiểm soát dữ liệu." },
  { name: "Các vấn đề pháp luật khác", summary: "Vấn đề ngoài các lĩnh vực phổ biến." },
];

export const legalSources = [
  {
    title: "Bộ luật Dân sự",
    article: "Điều 468",
    summary: "Về nghĩa vụ trả nợ và thực hiện hợp đồng vay tiền.",
    source: "https://vanban.chinhphu.vn/",
  },
  { title: "Bộ luật Dân sự", article: "Điều 117", summary: "Việc xác định hợp đồng và nghĩa vụ dân sự.", source: "https://vanban.chinhphu.vn/" },
  { title: "Bộ luật Hôn nhân và Gia đình", article: "Điều 49", summary: "Về quyền nuôi con và nghĩa vụ cấp dưỡng.", source: "https://moj.gov.vn/" },
  { title: "Bộ luật Lao động", article: "Điều 21", summary: "Về hợp đồng lao động và quyền lợi người lao động.", source: "https://molisa.gov.vn/" },
  { title: "Luật Đất đai", article: "Điều 39", summary: "Về quyền sử dụng đất và chuyển nhượng đất.", source: "https://vanban.chinhphu.vn/" },
  { title: "Luật Giao thông đường bộ", article: "Điều 29", summary: "Về nghĩa vụ và trách nhiệm khi tham gia giao thông.", source: "https://moc.gov.vn/" },
];

export function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ");
}

function matchCategory(question: string) {
  const normalized = question.toLowerCase();
  const found = legalCategories.find((category) => {
    const categoryKey = category.name.toLowerCase();
    return (
      normalized.includes(categoryKey.split("-")[0].trim()) ||
      normalized.includes("vay") ||
      normalized.includes("nợ") ||
      normalized.includes("ly hôn") ||
      normalized.includes("hôn nhân") ||
      normalized.includes("đất") ||
      normalized.includes("thừa kế") ||
      normalized.includes("lao động") ||
      normalized.includes("hợp đồng") ||
      normalized.includes("giao thông") ||
      normalized.includes("hình sự")
    );
  });

  return found ?? legalCategories[legalCategories.length - 1];
}

function shortQuestionChecklist(question: string) {
  const lower = question.toLowerCase();
  const isShort = lower.length < 30 || !/[\?\.|,]/.test(lower);
  if (!isShort) return null;

  return [
    "Số tiền hoặc giá trị cụ thể là bao nhiêu?",
    "Có giấy tờ, chứng từ hoặc tin nhắn xác nhận khoản nợ không?",
    "Khoản nợ đã đến hạn thanh toán hay chưa?",
    "Bên đối phương có thừa nhận khoản nợ không?",
  ];
}

export function fetchLegalAnswer(question: string) {
  const cleanQuestion = normalizeQuestion(question);
  const category = matchCategory(cleanQuestion);
  const followUp = shortQuestionChecklist(cleanQuestion);
  const legalBasis = legalSources.slice(0, 3).map((item) => ({
    title: item.title,
    article: item.article,
    summary: item.summary,
    source: item.source,
  }));

  return {
    category: category.name,
    conclusion:
      followUp
        ? "Cần bổ sung thông tin quan trọng để đánh giá đúng tình huống."
        : `Tình huống của bạn thuộc lĩnh vực ${category.name}. Cần xem xét căn cứ pháp lý và yếu tố thực tế trước khi đưa ra kết luận chắc chắn.`,
    sections: {
      summary: followUp
        ? `Bạn đang gặp vấn đề liên quan đến ${category.name}. Hiện chưa đủ dữ kiện để kết luận chắc chắn.`
        : `Bạn đang đối mặt với một vấn đề liên quan đến ${category.name}. Cần xác định rõ các yếu tố quan trọng như thời điểm phát sinh, chứng cứ, quyền và nghĩa vụ của các bên.`,
      legalBasis: legalBasis,
      analysis:
        followUp
          ? "Việc thiếu dữ kiện như số tiền, thời hạn, chứng từ và sự thừa nhận của bên liên quan có thể làm thay đổi cách đánh giá. Nếu có hợp đồng, tin nhắn xác nhận hoặc biên lai, bạn nên tổng hợp trước khi xác định hướng xử lý."
          : "Pháp luật sẽ xem xét hợp đồng, hành vi, chứng cứ, thời hạn, trách nhiệm và quyền lợi của mỗi bên. Nếu yếu tố nào không rõ, kết quả pháp lý có thể thay đổi đáng kể.",
      nextSteps: [
        "Lập tức kiểm tra và lưu giữ mọi giấy tờ, tin nhắn, cuộc gọi, giao dịch liên quan.",
        "Liệt kê các sự kiện theo thời gian để dễ đối chiếu với quy định pháp luật.",
        "Nếu vấn đề có tính nghiêm trọng hoặc rủi ro cao, tham khảo luật sư hoặc cơ quan có thẩm quyền.",
      ],
      risks: [
        "Thiếu chứng cứ có thể làm giảm khả năng bảo vệ quyền lợi.",
        "Nội dung vụ việc nếu có tranh chấp có thể thay đổi theo hợp đồng, thời hạn và sự thừa nhận của bên liên quan.",
      ],
      questions: followUp ?? [
        "Tình huống cụ thể xảy ra ở đâu và thời điểm nào?",
        "Bạn có giấy tờ hoặc thông tin để chứng minh không?",
        "Bạn muốn giải quyết bằng thương lượng, khiếu nại, hay cần tư vấn pháp lý?",
      ],
    },
    followUp,
  };
}
