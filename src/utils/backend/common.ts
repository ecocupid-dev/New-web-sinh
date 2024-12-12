export const removeVietnameseTones = (str: string) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu thanh tiếng Việt
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str;
};

export const convertTitleToSlug = (title: string) => {
  if (!title) return "";

  return removeVietnameseTones(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Thay thế các ký tự không phải chữ và số bằng dấu gạch ngang
    .replace(/(^-|-$)+/g, ""); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
};

const fieldsToRemove = [
  "Content",
  "Summary",
  "Tags",
  "OgUrl",
  "MetaDescription",
  "MetaKeywords",
  "MetaTitle",
  "OgDescription",
  "OgFacebookDescription",
  "OgFacebookImage",
  "OgFacebookTitle",
  "OgTitle",
  "OgxDescription",
  "OgxImage",
  "OgxTitle",
];

export const filterFields = (object: any) => {
  const filteredObject = { ...object };
  fieldsToRemove.forEach((field) => delete filteredObject[field]);
  return filteredObject;
};
