export default function parseRegex(text) {
  if (text) {
    return text.replace(/[|&;$%@"<>()#=*`]/g, '');
  }
}
