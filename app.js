
import root from '__GENERATED__/root.svelte';
import { respond } from '/Users/kaynenheikkinen/Develop/bingo-gen/.svelte-kit/runtime/server/index.js';
import { set_paths, assets, base } from '/Users/kaynenheikkinen/Develop/bingo-gen/.svelte-kit/runtime/paths.js';
import { set_prerendering } from '/Users/kaynenheikkinen/Develop/bingo-gen/.svelte-kit/runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"description\" content=\"\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t\t<style>\n\t\t\t.body-bg {\n\t\t\t\tbackground-color: #9921e8;\n\t\t\t\tbackground-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);\n\t\t\t}\n\t\t</style>\n\t</head>\n<body class=\"body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0\" style=\"font-family:'Lato',sans-serif;\">\n    <header class=\"max-w-lg mx-auto\">\n        <a href=\"#\">\n            <h1 class=\"text-4xl font-bold text-white text-center\">Bingo</h1>\n        </a>\n    </header>\n\n    <main class=\"bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl\">\n        <section>\n            <h3 class=\"font-bold text-2xl\">Let's Play Bingo!!!</h3>\n            <p class=\"text-gray-600 pt-2\">Generate some numbers</p>\n        </section>\n\n        <section class=\"mt-10\">\n\t\t\t<div>" + body + "</div>\n        </section>\n    </main>\n\n    <footer class=\"max-w-lg mx-auto flex justify-center text-white\">\n        <a href=\"#\" class=\"hover:underline\">Contact</a>\n        <span class=\"mx-3\">•</span>\n        <a href=\"#\" class=\"hover:underline\">Privacy</a>\n    </footer>\n</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ event, resolve }) => resolve(event)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class App {
	constructor(manifest) {
		const hooks = get_hooks(user_hooks);

		this.options = {
			amp: false,
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			floc: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/_app/',
			prerender: true,
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	render(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to app.render must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		return respond(request, this.options, options);
	}
}
