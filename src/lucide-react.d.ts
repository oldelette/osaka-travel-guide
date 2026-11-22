declare module 'lucide-react' {
  import type { FC, SVGProps } from 'react';
  type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  };
  export const ArrowDown: FC<IconProps>;
  export const ArrowUpRight: FC<IconProps>;
  export const CalendarDays: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const Compass: FC<IconProps>;
  export const ExternalLink: FC<IconProps>;
  export const MapPin: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const Plane: FC<IconProps>;
  export const Printer: FC<IconProps>;
  export const TrainFront: FC<IconProps>;
  export const X: FC<IconProps>;
}
