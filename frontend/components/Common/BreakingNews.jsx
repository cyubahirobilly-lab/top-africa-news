export default function BreakingNews({ text = 'Breaking: African Union summit begins today.' }) {
  return (
    <div className="bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white">
      {text}
    </div>
  )
}
