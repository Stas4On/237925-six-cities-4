import * as React from "react";

export const MessageStyles: React.CSSProperties = {
  position: `fixed`,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: `10px 20px`,
  backgroundColor: `#f47d75`,
  borderRadius: `0 0 20px 20px`,
  color: `#ffffff`,
  display: `flex`
};

export const MessageTitleStyles: React.CSSProperties = {
  marginRight: `20px`
};

export const ButtonStyles: React.CSSProperties = {
  position: `absolute`,
  top: `8px`,
  right: `20px`,
  zIndex: 10,
  padding: `10px`,
  backgroundSize: `20px`,
  backgroundImage: `url(./img/close.svg)`,
  backgroundPosition: `center`,
  backgroundRepeat: `no-repeat`
};
