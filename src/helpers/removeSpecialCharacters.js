export default function removeSpecialCharacters(text) {
  if (!text) return;

  return text.replace(/[|&;$%@"<>()#=*`]/g, "");
}
