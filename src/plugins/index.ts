import { type App } from "vue"
import { loadElementPlus, loadElementPlusIcon } from "./element-plus"

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
}

