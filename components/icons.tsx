import type { SVGProps } from "react";
import type { ServiceIcon } from "@/data/types";

type IconProps = SVGProps<SVGSVGElement>;

function base(children: React.ReactNode, props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return base(
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z" />,
    props,
  );
}

export function CheckIcon(props: IconProps) {
  return base(<path d="m5 12 5 5L20 7" />, props);
}

export function PinIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>,
    props,
  );
}

export function ChevronDownIcon(props: IconProps) {
  return base(<path d="m6 9 6 6 6-6" />, props);
}

export function PlowIcon(props: IconProps) {
  return base(
    <>
      <path d="M3 17h4l2-6h8l3 6" />
      <path d="M9 11V6h6v5" />
      <circle cx="7" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </>,
    props,
  );
}

export function ShovelIcon(props: IconProps) {
  return base(
    <>
      <path d="M15 3 5 13" />
      <path d="M17 5 9 13a3 3 0 1 0 4 4l8-8Z" />
    </>,
    props,
  );
}

export function BlowerIcon(props: IconProps) {
  return base(
    <>
      <circle cx="9" cy="12" r="5" />
      <path d="M14 12h6M18 8v8" />
    </>,
    props,
  );
}

export function SaltIcon(props: IconProps) {
  return base(
    <>
      <path d="M8 3h8l2 6-4 12h-4L6 9Z" />
      <path d="M9 9h6" />
    </>,
    props,
  );
}

export function BrineIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3Z" />
    </>,
    props,
  );
}

export function RoofIcon(props: IconProps) {
  return base(<path d="M3 12 12 4l9 8M6 12v8h12v-8" />, props);
}

export function IcicleIcon(props: IconProps) {
  return base(
    <>
      <path d="M4 6h16" />
      <path d="M6 6v6l1.5 4M12 6v9l1.5 4M18 6v6l1.5 4" />
    </>,
    props,
  );
}

export function TruckIcon(props: IconProps) {
  return base(
    <>
      <path d="M3 16V7h10v9" />
      <path d="M13 10h4l4 4v2h-8" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </>,
    props,
  );
}

export function ContractIcon(props: IconProps) {
  return base(
    <>
      <path d="M7 3h8l4 4v14H7Z" />
      <path d="M15 3v4h4M10 13h6M10 17h6M10 9h2" />
    </>,
    props,
  );
}

export function BuildingIcon(props: IconProps) {
  return base(
    <>
      <path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
      <path d="M13 21v-9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9" />
      <path d="M9 8h0M9 12h0M9 16h0" />
    </>,
    props,
  );
}

export function OfficeIcon(props: IconProps) {
  return base(
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M9 4v16M4 9h16M4 14h5M15 14h5" />
    </>,
    props,
  );
}

export function SchoolIcon(props: IconProps) {
  return base(
    <>
      <path d="M12 3 2 8l10 5 10-5Z" />
      <path d="M6 10v6c0 1.5 3 3 6 3s6-1.5 6-3v-6" />
    </>,
    props,
  );
}

export function HoaIcon(props: IconProps) {
  return base(
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>,
    props,
  );
}

const serviceIconMap: Record<ServiceIcon, (props: IconProps) => React.JSX.Element> = {
  plow: PlowIcon,
  shovel: ShovelIcon,
  blower: BlowerIcon,
  salt: SaltIcon,
  brine: BrineIcon,
  roof: RoofIcon,
  icicle: IcicleIcon,
  truck: TruckIcon,
  contract: ContractIcon,
  phone: PhoneIcon,
  building: BuildingIcon,
  office: OfficeIcon,
  school: SchoolIcon,
  hoa: HoaIcon,
};

export function ServiceIconGlyph({
  icon,
  ...props
}: { icon: ServiceIcon } & IconProps) {
  const Glyph = serviceIconMap[icon];
  return <Glyph {...props} />;
}
