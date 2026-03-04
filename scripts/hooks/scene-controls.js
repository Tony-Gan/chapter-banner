import { MODULE_ID, SETTINGS } from "../constants.js";
import { getBannerInstance, openBanner, closeBanner } from "../utils/banner-api.js";

const TOOL_ID = "chapter-banner-open";

export function registerSceneControls() {
  Hooks.on("getSceneControlButtons", (controls) => {
    const tokenControls = controls.tokens;
    if (!tokenControls) return;

    const minRole = game.settings.get(MODULE_ID, SETTINGS.MIN_ROLE) ?? CONST.USER_ROLES.GAMEMASTER;
    const canUse = (game.user?.role ?? 0) >= minRole;
    if (!canUse) return;

    const app = getBannerInstance();
    const isActive = Boolean(app?.element?.isConnected);

    tokenControls.tools[TOOL_ID] = {
      name: TOOL_ID,
      title: "打开 Chapter Banner",
      icon: "fas fa-flag",
      order: Object.keys(tokenControls.tools).length,
      button: true,
      toggle: true,
      active: isActive,
      visible: true,
      onChange: async (event, active) => {
        try {
          if (active) await openBanner();
          else await closeBanner();
        } catch (err) {
          console.error("[Chapter Banner] 打开/关闭窗口失败", err);
          ui.notifications?.error?.("Chapter Banner 打开失败：请查看 F12 控制台错误信息。");
        } finally {
          ui.controls?.render();
        }
      }
    };
  });

  Hooks.on("closeChapterBannerApp", () => {
    try {
      const controls = ui.controls;
      const setToolInactive = (tool) => {
        if (tool && typeof tool === "object") tool.active = false;
      };

      const tokenCtl = controls?.controls?.find?.((c) => c?.name === "tokens");
      const tools = tokenCtl?.tools;
      if (Array.isArray(tools)) {
        setToolInactive(tools.find((t) => t?.name === TOOL_ID));
      } else if (tools && typeof tools === "object") {
        setToolInactive(tools[TOOL_ID]);
      }

      const curTools = controls?.control?.tools;
      if (Array.isArray(curTools)) {
        setToolInactive(curTools.find((t) => t?.name === TOOL_ID));
      } else if (curTools && typeof curTools === "object") {
        setToolInactive(curTools[TOOL_ID]);
      }
    } catch (_) { /* ignore */ }

    ui.controls?.render();
  });
}
