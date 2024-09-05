import React from "react";

import ExclamationIcon from "@/assets/svg/exclamation.svg";
import { Box, Text } from "@/components/";

import SrfValue from "../../utils/srfValue";

interface ErrorMessageProps {
  text: string;
}

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <Box alignItems="center" flexDirection="row">
      <ExclamationIcon height={SrfValue(14)} width={SrfValue(14)} />
      <Text color="error" marginLeft="xs" variant="regular14">
        {text}
      </Text>
    </Box>
  );
}

export { ErrorMessage };
