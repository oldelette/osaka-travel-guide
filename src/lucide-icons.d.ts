declare module 'lucide-react/dist/esm/icons/*.js' {
  import type { FC, SVGProps } from 'react';
  type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  };
  const Icon: FC<IconProps>;
  export default Icon;
}
