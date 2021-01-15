import tableOfContents from './toc'

const componentsWrapper = document.querySelector('.components')

if (componentsWrapper) {
	const components = componentsWrapper.querySelectorAll('.component')
	const toc = tableOfContents(Array.from(components))
	componentsWrapper.appendChild(toc)
}
