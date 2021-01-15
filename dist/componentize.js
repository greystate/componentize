(function () {
	'use strict';

	function createStateToggler() {
		const toggler = document.createElement('button');
		toggler.type = 'button';
		toggler.textContent = 'Toggle state(s)';
		toggler.classList.add('state-toggle');
		toggler.addEventListener('click', (event) => {
			const wrapper = event.target.parentNode;
			const component = wrapper.firstElementChild;
			const states = wrapper.dataset.states.split(',');
			const currentState = states.shift();
			const newState = states[0];
			if (currentState !== 'nil') {
				component.classList.remove(currentState);
			}
			if (newState !== 'nil') {
				component.classList.add(newState);
			}
			states.push(currentState);
			wrapper.dataset.states = states.join(',');
		});
		return toggler
	}

	function tableOfContents(items) {
		// items = (Array.from components.querySelectorAll '.component').sort (a, b) => a.dataset.title > b.dataset.title
		items.sort((a, b) => a.dataset.title > b.dataset.title);
		const tocElement = document.createElement('section');
		tocElement.classList.add('components-toc');
		const entries = [ '<ul>' ];
		items.forEach((component) => {
			const states = component.dataset.states?.split(',');
			if (states) {
				component.appendChild(createStateToggler());
			}
			const componentID = component.getAttribute('id');
			const componentName = component.dataset.title;
			const componentLink = componentID || componentName.replace(/\s+/g, '-');
			entries.push(`<li><a href="#${componentLink}">${componentName}</a></li>`);
			if (!componentID) {
				component.setAttribute('id', componentLink);
			}
		});
		
		entries.push('</ul>');
		tocElement.innerHTML = entries.join('\n');
		return tocElement
	}

	const MATCHING_CLASS = 'matched';
	const FILTERING_CLASS = 'filtered';
	const KEY_ESC = 27;

	function componentFilter(wrapper) {
		const componentsFilter = document.createElement('div');
		componentsFilter.classList.add('components-filter');
		
		const label = document.createElement('label');
		label.htmlFor = 'components-filter';
		label.textContent = 'Filter components';
		
		const input = document.createElement('input');
		input.id = 'components-filter';
		input.type = 'text';
		input.placeholder = "E.g. 'gallery'";
		input.addEventListener('keyup', (event) => {
			const currentlyMatching = Array.from(document.querySelectorAll(`.${MATCHING_CLASS}`));
			if (event.keyCode === KEY_ESC || input.value === '') {
				wrapper.classList.remove(FILTERING_CLASS);
				input.value = '';
				currentlyMatching.forEach(component => component.classList.remove(MATCHING_CLASS));
			} else {
				const query = event.target.value;
				if (query.length > 2) {
					currentlyMatching.forEach(component => component.classList.remove(MATCHING_CLASS));
					wrapper.classList.add(FILTERING_CLASS);
					const matched = document.querySelectorAll(`[data-title*="${query}" i]`);
					if (matched) {
						Array.from(matched).forEach(component => component.classList.add(MATCHING_CLASS));
					}
				}
			}
		});

		componentsFilter.appendChild(label);
		componentsFilter.appendChild(input);
		return componentsFilter
	}

	window.addEventListener('DOMContentLoaded', () => {
		const componentsWrapper = document.querySelector('.components');

		if (componentsWrapper) {
			const filter = componentFilter(componentsWrapper);
			const components = componentsWrapper.querySelectorAll('.component');
			const toc = tableOfContents(Array.from(components));
			componentsWrapper.appendChild(toc);
			componentsWrapper.insertBefore(filter, componentsWrapper.firstElementChild);
		}
	});

}());
