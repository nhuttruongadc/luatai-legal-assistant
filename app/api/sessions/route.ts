export async function GET() {
  return Response.json({
    conversations: [
      { id: "1", title: "Vay nợ 100 triệu", updatedAt: "Hôm nay" },
      { id: "2", title: "Ly hôn và tài sản", updatedAt: "Hôm qua" },
      { id: "3", title: "Hợp đồng lao động", updatedAt: "2 ngày trước" },
    ],
  });
}
