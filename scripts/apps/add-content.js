import { ADD_CONTENT_APP_ID, MODULE_ID } from "../constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ChapterBannerAddContentApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: ADD_CONTENT_APP_ID,
    classes: ["chapter-banner-add-content-app"],
    tag: "section",
    actions: {
      logType: ChapterBannerAddContentApp._onLogType
    },
    window: {
      icon: "fas fa-plus",
      title: "添加内容",
      resizable: false
    },
    position: {
      width: 420,
      height: 220
    }
  }, { inplace: false });

  static PARTS = {
    body: {
      template: `modules/${MODULE_ID}/templates/add-content.hbs`
    }
  };

  async _prepareContext(_options) {
    return {};
  }

  static _onLogType(event, target) {
    event.preventDefault();
    const text = (target?.textContent ?? "").trim();
    console.log(text);
  }
}
