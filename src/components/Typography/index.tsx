import React from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type TypographyColor = "primary" | "secondary" | "disabled" | "error";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

interface TitleProps extends Omit<TypographyProps, "variant" | "component"> {
  level?: TitleLevel;
}

interface TextProps extends Omit<TypographyProps, "variant" | "component"> {}

const variants: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold leading-tight",
  h2: "text-3xl font-bold leading-tight",
  h3: "text-2xl font-semibold leading-tight",
  h4: "text-xl font-semibold leading-snug",
  h5: "text-lg font-medium leading-snug",
  h6: "text-base font-medium leading-normal",
  subtitle1: "text-lg font-normal leading-relaxed",
  subtitle2: "text-base font-medium leading-relaxed",
  body1: "text-base font-normal leading-relaxed",
  body2: "text-sm font-normal leading-relaxed",
  caption: "text-xs font-normal leading-normal",
  overline: "text-xs font-medium uppercase leading-normal tracking-wider",
};

const colors: Record<TypographyColor, string> = {
  primary: "text-text",
  secondary: "text-tbase",
  disabled: "text-gray-400",
  error: "text-red-500",
};

const Typography: React.FC<TypographyProps> & {
  Title: React.FC<TitleProps>;
  Text: React.FC<TextProps>;
} = ({ variant = "body1", color = "secondary", component, className = "", children, ...props }) => {
  const Component = component || (variant.startsWith("h") ? variant : "p");
  const combinedClassName = `${variants[variant]} text-${colors[color]} ${className}`.trim();

  const ElementComponent = Component as React.ElementType;

  return (
    <ElementComponent className={combinedClassName} {...props}>
      {children}
    </ElementComponent>
  );
};

// Add Title and Text sub-components
Typography.Title = ({ level = 1, ...props }: TitleProps) => {
  const variant = `h${level}` as TypographyVariant;
  return <Typography variant={variant} component={`h${level}`} {...props} />;
};

Typography.Text = (props: TextProps) => <Typography variant="body1" component="span" {...props} />;

export default Typography;
