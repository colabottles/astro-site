import { defineComponent, h, createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { h as h$1, Component } from 'preact';
import { renderToStringAsync } from 'preact-render-to-string';

const setup = () => {};

const contexts$1 = new WeakMap();

const ID_PREFIX = 'v';

function getContext$1(rendererContextResult) {
	if (contexts$1.has(rendererContextResult)) {
		return contexts$1.get(rendererContextResult);
	}
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		},
	};
	contexts$1.set(rendererContextResult, ctx);
	return ctx;
}

function incrementId$1(rendererContextResult) {
	const ctx = getContext$1(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * This is the Vue + JSX equivalent of using `<div v-html="value" />`
 */
const StaticHtml$1 = defineComponent({
	props: {
		value: String,
		name: String,
		hydrate: {
			type: Boolean,
			default: true,
		},
	},
	setup({ name, value, hydrate }) {
		if (!value) return () => null;
		let tagName = hydrate ? 'astro-slot' : 'astro-static-slot';
		return () => h(tagName, { name, innerHTML: value });
	},
});

function check$1(Component) {
	return !!Component['ssrRender'] || !!Component['__ssrInlineRender'];
}

async function renderToStaticMarkup$1(Component, inputProps, slotted, metadata) {
	let prefix;
	if (this && this.result) {
		prefix = incrementId$1(this.result);
	}
	const attrs = { prefix };

	const slots = {};
	const props = { ...inputProps };
	delete props.slot;
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () =>
			h(StaticHtml$1, {
				value,
				name: key === 'default' ? undefined : key,
				// Adjust how this is hydrated only when the version of Astro supports `astroStaticSlot`
				hydrate: metadata.astroStaticSlot ? !!metadata.hydrate : true,
			});
	}
	const app = createSSRApp({ render: () => h(Component, props, slots) });
	app.config.idPrefix = prefix;
	await setup();
	const html = await renderToString(app);
	return { html, attrs };
}

const _renderer0 = {
	name: '@astrojs/vue',
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
	supportsAstroStaticSlot: true,
};

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "p" + this.c.toString();
    },
    signals: /* @__PURE__ */ new Map(),
    propsToSignals: /* @__PURE__ */ new Map()
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

function isSignal(x) {
  return x != null && typeof x === "object" && typeof x.peek === "function" && "value" in x;
}
function restoreSignalsOnProps(ctx, props) {
  let propMap;
  if (ctx.propsToSignals.has(props)) {
    propMap = ctx.propsToSignals.get(props);
  } else {
    propMap = /* @__PURE__ */ new Map();
    ctx.propsToSignals.set(props, propMap);
  }
  for (const [key, signal] of propMap) {
    props[key] = signal;
  }
  return propMap;
}
function serializeSignals(ctx, props, attrs, map) {
  const signals = {};
  for (const [key, value] of Object.entries(props)) {
    const isPropArray = Array.isArray(value);
    const isPropObject = !isSignal(value) && typeof props[key] === "object" && props[key] !== null && !isPropArray;
    if (isPropObject || isPropArray) {
      const values = isPropObject ? Object.keys(props[key]) : value;
      values.forEach((valueKey, valueIndex) => {
        const signal = isPropObject ? props[key][valueKey] : valueKey;
        if (isSignal(signal)) {
          const keyOrIndex = isPropObject ? valueKey.toString() : valueIndex;
          props[key] = isPropObject ? Object.assign({}, props[key], { [keyOrIndex]: signal.peek() }) : props[key].map(
            (v, i) => i === valueIndex ? [signal.peek(), i] : v
          );
          const currentMap = map.get(key) || [];
          map.set(key, [...currentMap, [signal, keyOrIndex]]);
          const currentSignals = signals[key] || [];
          signals[key] = [...currentSignals, [getSignalId(ctx, signal), keyOrIndex]];
        }
      });
    } else if (isSignal(value)) {
      props[key] = value.peek();
      map.set(key, value);
      signals[key] = getSignalId(ctx, value);
    }
  }
  if (Object.keys(signals).length) {
    attrs["data-preact-signals"] = JSON.stringify(signals);
  }
}
function getSignalId(ctx, item) {
  let id = ctx.signals.get(item);
  if (!id) {
    id = incrementId(ctx);
    ctx.signals.set(item, id);
  }
  return id;
}

const StaticHtml = ({ value, name, hydrate = true }) => {
  if (!value) return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return h$1(tagName, { name, dangerouslySetInnerHTML: { __html: value } });
};
StaticHtml.shouldComponentUpdate = () => false;
var static_html_default = StaticHtml;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
let originalConsoleError;
let consoleFilterRefs = 0;
async function check(Component$1, props, children) {
  if (typeof Component$1 !== "function") return false;
  if (Component$1.name === "QwikComponent") return false;
  if (Component$1.prototype != null && typeof Component$1.prototype.render === "function") {
    return Component.isPrototypeOf(Component$1);
  }
  useConsoleFilter();
  try {
    const { html } = await renderToStaticMarkup.call(this, Component$1, props, children, void 0);
    if (typeof html !== "string") {
      return false;
    }
    return html == "" ? false : !html.includes("<undefined>");
  } catch {
    return false;
  } finally {
    finishUsingConsoleFilter();
  }
}
function shouldHydrate(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  const ctx = getContext(this.result);
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = h$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value,
      name
    });
  }
  let propsMap = restoreSignalsOnProps(ctx, props);
  const newProps = { ...props, ...slots };
  const attrs = {};
  serializeSignals(ctx, props, attrs, propsMap);
  const vNode = h$1(
    Component,
    newProps,
    children != null ? h$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value: children
    }) : children
  );
  const html = await renderToStringAsync(vNode);
  return { attrs, html };
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError) return;
  }
  originalConsoleError(msg, ...rest);
}
const renderer = {
  name: "@astrojs/preact",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: _renderer0 }),Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js"}, { ssr: server_default }),];

export { renderers };
