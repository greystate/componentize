import tableOfContents from './toc'
import createFilter from './filter'
import registerComponentViewer from './component-viewer'
import registerStateController from './state-controller'

window.addEventListener('DOMContentLoaded', () => {
	registerComponentViewer()
	registerStateController()

	const componentsWrapper = document.querySelector('.components')
	const componentViewers = document.querySelectorAll('component-viewer')

	const bodyElement = document.querySelector('body')

	if (componentsWrapper) {
		const filter = createFilter(componentsWrapper)
		const toc = tableOfContents(Array.from(componentViewers))

		componentsWrapper.insertBefore(filter, componentsWrapper.firstElementChild)
		bodyElement.appendChild(toc)
	}
})
