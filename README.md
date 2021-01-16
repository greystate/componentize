# Componentize

My way of collecting all components on a single page.

<img src="assets/screenshot_componentize.jpg" alt="Componentize Screenshot" />

## Installation

Drop the contents of the `dist` folder into your `vendor` (maybe using a [subtree merge][submerge]?) or similar, and reference the files as you do any other JS/CSS resource. You only need them on the page you want to show your components on.

## Usage

Build your components section like this:

```html
<section class="components">
	<div class="components-description">
		<!-- Any description you want to have on the page before the component list -->
	</div>
	
	<div class="component" data-title="ComponentName">
		
		<!-- Your component markup here -->
		
	</div>
	
	<!-- Additional components -->
	
</section>
```

### Component States and/or Modifiers

Sometimes a component exist in a couple of variations, which can be expressed with CSS classes - you can list these in a `data-states` attribute to have the component automatically present radiobuttons for them, e.g.:

```html
<div class="component" data-title="Spinner" data-states="paused,running">
	<div class="spinner paused">[°•°°°°]</div>
</div>
```

You can add a *no-state* state as well, by adding `nil` to `data-states`, e.g.:

```html
<div class="component" data-title="Spinner" data-states="nil,paused,running">
	<div class="spinner paused">[°•°°°°]</div>
</div>
```

Modifiers works in a similar fashion, except they're represented by checkboxes.
So it's possible to have one or many modifiers selected at a time, but only a
single state at any time.


### Helper classes

There are a couple of helper classes to put on individual components, if necessary:

- `.alt-bg` : Renders a transparent checkerboard background behind the component
- `.solid-bg` : Renders a solid color behind the component
- `.space-before`, `.space-after`, `.large-space-before` & `.large-space-after` : Makes extra room for the previous/next component (handy if a component does some position shifting, e.g. pulling an icon partly outside of the box)

When using `.solid-bg` it's possible to specify a specific background color using a **CSS Custom Property** (aka *CSS Variable*) named `--bg-color`.
Because of the way CSS Custom Properties work, you can set this variable on any ancestor (e.g. the `<body>`) element to effectively
override the default `#505050` as specified in the distributed CSS - and *still* override it on a specific component, if needed.
CSS Custom Properties can be set in a style attribute, e.g.:

```html
<div class="component solid-bg" style="--bg-color: yellow;">
	<!-- A dark, pure-CSS Batman logo that needs a yellow background maybe? -->
</div>
```

The `componentize.js` adds some nice enhancements:

- Renders a *Table Of Contents* layer on the right side of the screen, where all the components are listed in alphabetical order, clickable of course :)
- Adds a textbox for live-filtering the components on the page.
- Adds a state toggle for components that has a `data-states` attribute

[submerge]: http://greystate.dk/resources/subtree-merge/?rf=dist&u=greystate&b=master&r=componentize&lf=vendor/componentize
