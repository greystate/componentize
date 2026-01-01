import createToggles from './modifiers'

function tableOfContents(items) {
	// Fork off if we're using the legacy version
	if (items[0].nodeName != 'COMPONENT-VIEWER') {
		return tableOfContents_Legacy(items)
	}

	items.sort((a, b) => a.name > b.name ? 1 : -1)

	const tocElement = document.createElement('section')
	tocElement.classList.add('components-toc')
	const entries = [ '<ul>' ]
	items.forEach((component) => {
		entries.push(`<li><a href="#${component.id}">${component.name}</a></li>`)
	})

	entries.push('</ul>')
	tocElement.innerHTML = entries.join('\n')
	return tocElement
}

function tableOfContents_Legacy(items) {
	items.sort((a, b) => a.dataset.title > b.dataset.title ? 1 : -1)
	const tocElement = document.createElement('section')
	tocElement.classList.add('components-toc')
	const entries = [ '<ul>' ]
	items.forEach((component) => {
		const states = component.dataset.states
		const modifiers = component.dataset.modifiers
		if (states || modifiers) {
			component.appendChild(createToggles(component))
		}
		const componentID = component.getAttribute('id')
		const componentName = component.dataset.title
		const componentLink = componentID || componentName.replace(/\s+/g, '-')
		entries.push(`<li><a href="#${componentLink}">${componentName}</a></li>`)
		if (!componentID) {
			component.setAttribute('id', componentLink)
		}
	})

	entries.push('</ul>')
	tocElement.innerHTML = entries.join('\n')
	return tocElement
}

export default tableOfContents
