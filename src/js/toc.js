import createStateToggler from './toggler'

function tableOfContents(items) {
	// items = (Array.from components.querySelectorAll '.component').sort (a, b) => a.dataset.title > b.dataset.title
	items.sort((a, b) => a.dataset.title > b.dataset.title)
	const tocElement = document.createElement('section')
	tocElement.classList.add('components-toc')
	const entries = [ '<ul>' ]
	items.forEach((component) => {
		const states = component.dataset.states?.split(',')
		if (states) {
			component.appendChild(createStateToggler())
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
