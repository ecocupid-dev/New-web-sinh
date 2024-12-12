// Hàm này dùng để load tất cả các model của mình để Mongoose đăng ký model --> này do Nextjs chưa handle chỗ này cho mình
export function loadModels() {
  require("./article");
  require("./category");
  require("./project");
  require("./users");
  require("./videos");
  require("./writer");
}
