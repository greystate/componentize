const MATCHING_CLASS = 'matched'
const FILTERING_CLASS = 'filtered'
const KEY_ESC = 27

function componentFilter(wrapper) {
	const componentsFilter = document.createElement('div')
	componentsFilter.classList.add('components-filter')
	
	const label = document.createElement('label')
	label.htmlFor = 'components-filter'
	label.textContent = 'Filter components'
	
	const input = document.createElement('input')
	input.id = 'components-filter'
	input.type = 'text'
	input.placeholder = "E.g. 'gallery'"
	input.addEventListener('keyup', (event) => {
		const currentlyMatching = Array.from(document.querySelectorAll(`.${MATCHING_CLASS}`))
		if (event.keyCode === KEY_ESC || input.value === '') {
			wrapper.classList.remove(FILTERING_CLASS)
			input.value = ''
			currentlyMatching.forEach(component => component.classList.remove(MATCHING_CLASS))
		} else {
			const query = event.target.value
			if (query.length > 2) {
				currentlyMatching.forEach(component => component.classList.remove(MATCHING_CLASS))
				wrapper.classList.add(FILTERING_CLASS)
				const matched = document.querySelectorAll(`[data-title*="${query}" i]`)
				if (matched) {
					Array.from(matched).forEach(component => component.classList.add(MATCHING_CLASS))
				}
			}
		}
	})

	componentsFilter.appendChild(label)
	componentsFilter.appendChild(input)
	return componentsFilter
}

export default componentFilter
