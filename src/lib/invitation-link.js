export function formatGuestNameFromToParam(toParam) {
  if (!toParam) return "Bapak/Ibu/Saudara/i";

  const label = toParam
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return label || "Bapak/Ibu/Saudara/i";
}

export function buildInvitationPath(slug) {
  return `/?to=${encodeURIComponent(slug)}`;
}
