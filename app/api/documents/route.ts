export async function POST(request: Request) {
  const body = await request.json();
  const { fileName = "document.pdf", fileType = "application/pdf" } = body ?? {};

  const result = {
    fileName,
    fileType,
    summary: "Tài liệu cho thấy các bên có xác nhận cam kết và nghĩa vụ thực hiện hợp đồng. Cần kiểm tra các điều khoản trọng tâm, thời hạn, chứng từ và chứng cứ liên quan.",
    legalIssues: ["Khả năng phát sinh tranh chấp do điều khoản chưa rõ.", "Cần xác định quyền và nghĩa vụ của các bên.", "Thiếu chứng cứ xác minh có thể làm suy yếu yêu cầu pháp lý."],
    importantClauses: ["Điều khoản thanh toán", "Thời hạn thực hiện", "Chứng nhận xác nhận bởi các bên"],
    obligations: ["Bên A phải thực hiện đúng cam kết trong hợp đồng.", "Bên B có quyền yêu cầu thực hiện đúng nghĩa vụ theo thỏa thuận."],
    missingEvidence: ["Biên bản xác nhận giao dịch", "Hóa đơn, chuyển khoản, email hoặc tin nhắn", "Bằng chứng xác nhận thời điểm thực hiện"],
    recommendations: ["Xác minh các điều khoản bằng văn bản rõ ràng.", "Thu thập thêm chứng cứ liên quan đến thực hiện nghĩa vụ.", "Tham khảo luật sư nếu có dấu hiệu rủi ro pháp lý cao."],
  };

  return Response.json({ success: true, document: result });
}
