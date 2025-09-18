export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // hapus tanda kutip
    .replace(/\s+/g, "-") // spasi → dash
    .replace(/[^a-z0-9-]/g, ""); // buang karakter aneh
};
