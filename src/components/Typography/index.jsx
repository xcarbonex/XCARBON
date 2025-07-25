import React from "react";
import PropTypes from "prop-types";

const variants = {
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

const colors = {
  primary: "text-text",
  secondary: "text-tbase",
  disabled: "text-gray-400",
  error: "text-red-500",
};

const Typography = ({
  variant = "body1",
  color = "secondary",
  component,
  className = "",
  children,
  ...props
}) => {
  const Component = component || (variant.startsWith("h") ? variant : "p");
  const combinedClassName =
    `${variants[variant]} text-${colors[color]} ${className}`.trim();

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

// Add Title and Text sub-components
Typography.Title = ({level = 1, ...props}) => {
  const variant = `h${level}`;
  return <Typography variant={variant} component={`h${level}`} {...props} />;
};

Typography.Text = (props) => (
  <Typography variant="body1" component="span" {...props} />
);

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "overline",
  ]),
  color: PropTypes.oneOf(["primary", "secondary", "disabled", "error"]),
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Typography.Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
};

Typography.Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Typography;
