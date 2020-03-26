import React, { memo } from "react";

import { Container } from "./styles";

function Header({ children }) {
  return <Container>{children}</Container>;
}

export default memo(Header);
