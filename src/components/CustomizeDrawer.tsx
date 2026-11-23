import { RotateCcw, X } from 'lucide-react';
import { DEFAULT_WEDDING_DETAILS, WeddingDetails } from '../types/wedding';

interface CustomizeDrawerProps {
  isOpen: boolean;
  details: WeddingDetails;
  onChange: (next: WeddingDetails) => void;
  onClose: () => void;
}

export function CustomizeDrawer({
  isOpen,
  details,
  onChange,
  onClose,
}: CustomizeDrawerProps) {
  if (!isOpen) return null;

  const updateField = <K extends keyof WeddingDetails>(key: K, value: WeddingDetails[K]) => {
    onChange({ ...details, [key]: value });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personalize Wedding Card Details"
      className="fixed inset-0 z-50 flex justify-end bg-[#1E191B]/45 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-[#FCFBF8] border-l border-[#E4DDD4] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-[#E4DDD4]">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#1E191B]">
              Personalize Your Card
            </h2>
            <p className="text-xs text-[#5B4F53] mt-0.5">
              Adjust any name, date, phone number, or Google Maps link before sharing on WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close personalization drawer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#5B4F53] hover:text-[#1E191B] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#6B1D34]">Couple Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Groom&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.groomName}
                  onChange={(e) => updateField('groomName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Bride&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.brideName}
                  onChange={(e) => updateField('brideName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>
            </div>
          </div>

          <div className="pt-5 border-t border-[#E4DDD4] space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#6B1D34]">
              Parents &amp; Family Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Groom&apos;s Father&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.groomFather}
                  onChange={(e) => updateField('groomFather', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Groom&apos;s Mother&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.groomMother}
                  onChange={(e) => updateField('groomMother', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Groom&apos;s Elder Brother
                </span>
                <input
                  type="text"
                  value={details.groomBrother}
                  onChange={(e) => updateField('groomBrother', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Sister-in-Law (Boudi)
                </span>
                <input
                  type="text"
                  value={details.groomSisterInLaw}
                  onChange={(e) => updateField('groomSisterInLaw', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Bride&apos;s Father&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.brideFather}
                  onChange={(e) => updateField('brideFather', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Bride&apos;s Mother&apos;s Name
                </span>
                <input
                  type="text"
                  value={details.brideMother}
                  onChange={(e) => updateField('brideMother', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>
            </div>
          </div>

          <div className="pt-5 border-t border-[#E4DDD4] space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#6B1D34]">
              Dates, Venue &amp; Google Maps Link
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Shubho Bibaho Date
                </span>
                <input
                  type="text"
                  value={details.weddingDateDisplay}
                  onChange={(e) => updateField('weddingDateDisplay', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Pritibhoj Reception Date
                </span>
                <input
                  type="text"
                  value={details.receptionDateDisplay}
                  onChange={(e) => updateField('receptionDateDisplay', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                Venue Name
              </span>
              <input
                type="text"
                value={details.venueName}
                onChange={(e) => updateField('venueName', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                Full Venue Address
              </span>
              <textarea
                rows={2}
                value={details.venueAddress}
                onChange={(e) => updateField('venueAddress', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                Direct Google Maps URL
              </span>
              <input
                type="url"
                value={details.mapsUrl}
                onChange={(e) => updateField('mapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Primary Contact Number
                </span>
                <input
                  type="text"
                  value={details.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-[#5B4F53] mb-1.5">
                  Secondary Contact Number
                </span>
                <input
                  type="text"
                  value={details.secondaryPhone}
                  onChange={(e) => updateField('secondaryPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-md border border-[#DDD3C5] bg-white text-[#1E191B] focus:outline-none focus:border-[#6B1D34]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[#E4DDD4] bg-[#F6F2EB]">
          <button
            type="button"
            onClick={() => onChange(DEFAULT_WEDDING_DETAILS)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#5B4F53] hover:text-[#1E191B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-md bg-[#6B1D34] text-[#FCFBF8] text-sm font-medium hover:bg-[#541528] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Save &amp; Preview Card
          </button>
        </div>
      </div>
    </div>
  );
}
