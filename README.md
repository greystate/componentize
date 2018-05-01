# Componentize

My way of collecting all components on a single page.

<img src="assets/screenshot_componentize.jpg" alt="Componentize Screenshot" />

## Installation

Drop the contents of the `dist` folder into your `vendor` (maybe using a [subtree merge][submerge]?) or similar, and reference the files as you do any other JS/CSS resource. You only need them on the page you want to show your components on.

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

### Helper classes

There are a couple of helper classes to put on individual components, if necessary:

- `.alt-bg` : Renders a transparent checkerboard background behind the component
- `.solid-bg` : Renders a solid color behind the component
- `.space-before`, `.space-after`, `.large-space-before` & `.large-space-after` : Makes extra room for the previous/next component (handy if a component does some position shifting, e.g. pulling an icon partly outside of the box)


The `componentize-app` script renders a *Table Of Contents* layer on the right side of the screen, where all the components are listed in alphabetical order, clickable of course :)

[submerge]: http://greystate.dk/resources/subtree-merge/?rf=dist&u=greystate&b=master&r=componentize&lf=vendor/componentize
