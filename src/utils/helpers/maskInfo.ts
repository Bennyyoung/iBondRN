export const maskContactInfo = (contactInfo: string): string => {
  if (contactInfo.includes('@')) {
    const [local, domain] = contactInfo.split('@');
    const maskedLocal =
      local.length > 2
        ? `${local.slice(0, 2)}****${local.slice(-1)}`
        : `${local.charAt(0)}****`;
    return `${maskedLocal}@${domain}`;
  } else {
    return contactInfo.length > 4
      ? `${contactInfo.slice(0, 2)}****${contactInfo.slice(-2)}`
      : contactInfo;
  }
};
