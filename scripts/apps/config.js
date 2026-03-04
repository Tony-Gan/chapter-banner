import { MODULE_ID } from "../constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ChapterBannerConfigApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: "chapter-banner-config",
    classes: ["chapter-banner-config-app"],
    tag: "section",
    window: {
      icon: "fas fa-cog",
      title: "Chapter Banner 配置",
      resizable: false
    },
    position: {
      width: 420,
      height: 220
    }
  }, { inplace: false });

  static PARTS = {
    body: {
      template: `modules/${MODULE_ID}/templates/config.hbs`
    }
  };

  async _prepareContext(_options) {
    return {};
  }
}
