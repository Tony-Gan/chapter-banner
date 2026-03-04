import { MODULE_ID, SETTINGS } from "./constants.js";
import { ChapterBannerConfigApp } from "./apps/config.js";

export function registerSettings() {
  game.settings.register(MODULE_ID, SETTINGS.MIN_ROLE, {
    name: "Chapter Banner：入口可用级别",
    hint: "设置哪些用户可以使用左上角的 Chapter Banner 入口按钮（最低可到 Trusted Player）。",
    scope: "world",
    config: true,
    type: Number,
    choices: {
      [CONST.USER_ROLES.GAMEMASTER]: "仅 GM",
      [CONST.USER_ROLES.ASSISTANT]: "Assistant GM",
      [CONST.USER_ROLES.TRUSTED]: "受信玩家 (Trusted Player)"
    },
    default: CONST.USER_ROLES.GAMEMASTER,
    restricted: true,
    onChange: () => ui.controls?.render()
  });

  game.settings.registerMenu(MODULE_ID, SETTINGS.CONFIG_MENU, {
    name: "Chapter Banner：配置",
    label: "打开",
    hint: "打开 Chapter Banner 的配置面板（当前为空）。",
    icon: "fas fa-cog",
    type: ChapterBannerConfigApp,
    restricted: true
  });
}
