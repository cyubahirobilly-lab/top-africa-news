export default function BreakingNews({ text = 'Breaking: African Union summit begins today.' }) {
  return (
    <div className="bg-[#D62828] px-4 py-2 text-center text-sm font-semibold text-white">
      {text}
    </div>
  )
}
