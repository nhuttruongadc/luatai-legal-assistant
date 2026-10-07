export async function POST(request: Request) {
  const { message, history = [] } = await request.json();
  const answer = buildLegalResponse(message, history);

  return Response.json({
    success: true,
    category: answer.category,
    answer,
  });
}

function buildLegalResponse(message: string, history: Array<{ role: string; content: string }>) {
  const question = (message || "").trim();
  const followUp = question.length < 30;

  const base = {
    conclusion: followUp
      ? "Cần bổ sung thông tin quan trọng để phân tích đúng tình huống."
      : "Kết luận sơ bộ: bạn đang đối mặt với vấn đề pháp lý cần phân tích theo lĩnh vực phù hợp.",
    category: "Vay tiền – nợ",
    legalBasis: [
      {
        title: "Bộ luật Dân sự",
        article: "Điều 468",
        summary: "Về nghĩa vụ thanh toán và thực hiện hợp đồng vay tiền.",
        source: "https://vanban.chinhphu.vn/",
      },
      {
        title: "Bộ luật Dân sự",
        article: "Điều 117",
        summary: "Về hợp đồng, nghĩa vụ và trách nhiệm dân sự khi thực hiện giao dịch.",
        source: "https://vanban.chinhphu.vn/",
      },
    ],
    analysis: "AI cần đối chiếu các chứng cứ và tình tiết thực tế. Nếu không rõ thời hạn, số tiền, hoặc chứng từ, cần hỏi thêm để tránh kết luận sai.",
    nextSteps: [
      "Lưu giữ giấy tờ, tin nhắn, lời hứa nợ hoặc chuyển khoản.",
      "Gọi điện/viết thư nhắc trả nợ theo lịch trình hợp lý.",
      "Nếu cần, nhờ luật sư hoặc cơ quan có thẩm quyền hỗ trợ xử lý.",
    ],
    risks: [
      "Thiếu chứng cứ có thể làm giảm khả năng chứng minh.",
      "Không rõ thời hạn hoặc tính chất của khoản nợ có thể làm thay đổi kết luận.",
    ],
    questions: [
      "Số tiền là bao nhiêu?",
      "Có giấy tờ, tin nhắn, chuyển khoản không?",
      "Đã đến hạn trả chưa?",
    ],
  };

  return {
    ...base,
    answer: {
      conclusion: base.conclusion,
      legalBasis: base.legalBasis,
      analysis: base.analysis,
      nextSteps: base.nextSteps,
      risks: base.risks,
      questions: base.questions,
      context: history.length,
    },
  };
}
