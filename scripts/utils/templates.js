import { MODULE_ID } from "../constants.js";

export async function preloadChapterBannerTemplates() {
  try {
    const paths = [
      `modules/${MODULE_ID}/templates/banner.hbs`,
      `modules/${MODULE_ID}/templates/config.hbs`,
      `modules/${MODULE_ID}/templates/add-content.hbs`
    ];

    await loadTemplates(paths);
  } catch (err) {
    console.error("[Chapter Banner] 模板预加载失败：", err);
    ui.notifications?.error?.("Chapter Banner 模板加载失败，请检查模块文件是否完整。详情见 F12。");
  }
}
