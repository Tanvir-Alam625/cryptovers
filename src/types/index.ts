import { Config } from '@/config';
import { RouteObject } from 'react-router-dom';

export type CSSUnit = `${number}${'px' | 'rem' | 'em' | 'vw' | 'vh' | '%'}`;
export type LayoutType = keyof typeof Config.layouts;

export type ColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';

export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Radius = 'square' | 'rounded' | 'circle';

export type AppRoute = RouteObject & {
  layout?: LayoutType;
};
export type SelectOption<T = string> = {
  label: string;
  value: T;
};

export type ConfigType = {
  appName: string;
  appDescription: string;
  layouts: Record<string, React.FC>;
};
