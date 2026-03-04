import { registerSettings } from "./settings.js";
import { registerSceneControls } from "./hooks/scene-controls.js";
import { preloadChapterBannerTemplates } from "./utils/templates.js";

Hooks.once("init", async () => {
  registerSettings();
  registerSceneControls();
  await preloadChapterBannerTemplates();
});

Hooks.once("ready", () => {});
