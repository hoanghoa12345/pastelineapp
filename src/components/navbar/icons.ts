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

const MenuIcon = defineComponent({
  name: "MenuIcon",
  render: () =>
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
          "fill-rule": "evenodd",
          d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
          "clip-rule": "evenodd",
        }),
      ]
    ),
});

const CloseIcon = defineComponent({
  name: "CloseIcon",
  render: () =>
    h(
      "svg",
      {
        "aria-hidden": "true",
        class: "w-6 h-6",
        fill: "currentColor",
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg",
      },
      [
        h("path", {
          "fill-rule": "evenodd",
          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
          "clip-rule": "evenodd",
        }),
      ]
    ),
});

export { BellIcon, AppIcon, MenuIcon, CloseIcon };
