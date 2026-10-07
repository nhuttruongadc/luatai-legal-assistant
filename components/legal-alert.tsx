export function LegalAlert() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="max-w-5xl rounded-full border border-blue-200 bg-white/95 px-5 py-3 text-center text-xs font-medium text-slate-700 shadow-2xl backdrop-blur-md sm:text-sm">
        “Thông tin do AI cung cấp chỉ nhằm mục đích tham khảo và hỗ trợ tra cứu pháp luật, không thay thế tư vấn pháp lý của luật sư hoặc cơ quan có thẩm quyền.”
      </div>
    </div>
  );
}
