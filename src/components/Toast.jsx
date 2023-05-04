import { toast } from "react-toastify";
export const toastAddToCart = () => toast.success("🛒已加入至購物車!");
export const toastUpdateQty = () => toast.info("已更新數量");
export const toastDeleteItem = () => toast.error("已刪除商品");
export const toastAddToWish = () => toast.success("❤️已加入至願望清單");
export const toastRemoveFromWish = () => toast.error("已從願望清單中移除");
export const toastError = () => toast.error("無法預期的錯誤，請稍後再嘗試");
