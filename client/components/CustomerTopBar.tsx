interface CustomerTopBarProps {
  clientName: string;
}

export default function CustomerTopBar({ clientName }: CustomerTopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-green-600">Vreeker BV</div>
        <div className="text-sm text-gray-600">
          Welkom, <span className="font-semibold text-gray-900">{clientName}</span>
        </div>
      </div>
    </div>
  );
}
