import { DefaultProps } from "..";

export interface TypeOption extends DefaultProps {
  type?: string;
}

export interface ShadowProps extends DefaultProps {
  shadowDirection?: "left" | "right" | "bottom" | "left-right";
}

export interface ButtonProps extends DefaultProps {
  onClick?: Function;
  text: string;
  to?: string;
  type: "submit" | "button" | "reset";
  subType?: "primary" | "secondary" | "tertiary";
}

export interface BoxShadowProps extends ShadowProps {
  classOuter?: string;
  classInner?: string;
}

export interface HeaderProps extends DefaultProps {
  alignment?: "left" | "center";
  platformType?: string;
}

export interface SideNavProps {
  baseUrl: string;
  pages: string[];
}
