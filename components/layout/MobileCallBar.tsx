import { business } from "@/config/business";
import { PhoneIcon } from "@/components/icons";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-200 bg-white p-3 sm:hidden">
      <a
        href={`tel:${business.phoneHref}`}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-600 py-3 text-[15px] font-semibold text-white"
      >
        <PhoneIcon className="size-4" />
        Call {business.phone}
      </a>
    </div>
  );
}
