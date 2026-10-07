export function PromptChips() {
  const chips = ["Đất đai", "Vay nợ", "Ly hôn", "Lao động", "Giao thông", "Hợp đồng", "Thừa kế", "Hình sự"];

  return (
    <>
      {chips.map((chip) => (
        <button
          key={chip}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-navy-200 hover:bg-navy-50"
        >
          {chip}
        </button>
      ))}
    </>
  );
}
