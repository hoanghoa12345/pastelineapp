import { defineComponent, h } from "vue";

const BellIcon = defineComponent({
  name: "BellIcon",
  setup() {
    return () =>
      h(
        "svg",
        {
          ariaHidden: "true",
          class: "w-6 h-6",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg",
        },
        [
          h("path", {
            d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z",
          }),
        ]
      );
  },
});

const AppIcon = defineComponent({
  name: "AppIcon",
  setup() {
    return () =>
      h(
        "svg",
        {
          class: "w-6 h-6",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg",
        },
        [
          h("path", {
            d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
          }),
        ]
      );
  },
});

export { BellIcon, AppIcon };
