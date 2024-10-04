import tableOfContents from './toc'
import createFilter from './filter'

window.addEventListener('DOMContentLoaded', () => {
	const componentsWrapper = document.querySelector('.components')
	const bodyElement = document.querySelector('body')

	if (componentsWrapper) {
		const filter = createFilter(componentsWrapper)
		const components = componentsWrapper.querySelectorAll('.component')
		const toc = tableOfContents(Array.from(components))
		componentsWrapper.insertBefore(filter, componentsWrapper.firstElementChild)
		bodyElement.appendChild(toc)
	}
})
