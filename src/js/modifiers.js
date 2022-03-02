function createModifierSwitches(componentWrapper) {
	const togglesElement = document.createElement('fieldset')
	togglesElement.classList.add('component-states-modifiers')
	
	const legend = document.createElement('legend')
	legend.textContent = 'States & Modifiers'
	
	togglesElement.appendChild(legend)
	
	
	const identifier = getIdentifierFromName(componentWrapper.dataset.title)
	const states = componentWrapper.dataset.states?.split(',')
	const modifiers = componentWrapper.dataset.modifiers?.split(',')
	
	if (modifiers) {
		const wrapper = document.createElement('div')
		modifiers.forEach((modifier) => {
			const field = document.createElement('div')
			const input = document.createElement('input')
			input.type = 'checkbox'
			input.name = `mod-${modifier}`
			input.value = modifier
			input.id = `${identifier}-mod-${modifier}`
			
			const label = document.createElement('label')
			label.htmlFor = input.id
			label.textContent = modifier
			
			field.appendChild(input)
			field.appendChild(label)
			
			wrapper.appendChild(field)
		})
		
		togglesElement.appendChild(wrapper)
	}
	
	if (states) {
		const wrapper = document.createElement('div')
		states.forEach((state, index) => {
			const field = document.createElement('div')
			const input = document.createElement('input')
			input.type = 'radio'
			input.name = 'component-state'
			input.value = state
			input.id = `${identifier}-state-${state}`
			input.checked = index == 0
			
			const label = document.createElement('label')
			label.htmlFor = input.id
			label.textContent = (state == 'nil' ? '(none)' : state)
			
			field.appendChild(input)
			field.appendChild(label)
			
			wrapper.appendChild(field)
		})
		
		togglesElement.appendChild(wrapper)
	}
	
	setEventHandler(togglesElement)
	
	return togglesElement
}

function setEventHandler(element) {
	element.addEventListener('click', (event) => {
		const target = event.target
		if (target.nodeName !== 'INPUT') { return }
		const value = target.value
		const componentWrapper = element.parentNode
		const component = componentWrapper.firstElementChild
		
		if (target.type === 'radio') {
			setState(component, value)
		} else {
			component.classList.toggle(value)
		}
	})
}

function getIdentifierFromName(name) {
	let identifier = name.toLowerCase().replaceAll(/\s+/g, '-')
	identifier = identifier.replaceAll(/[()%&?]/g, '')
	return identifier
}

function setState(element, newState) {
	const states = element.parentNode.dataset.states.split(',')
	states.forEach((state) => {
		if (state !== 'nil') {
			element.classList.remove(state)
		}
	})
	if (newState !== 'nil') {
		element.classList.add(newState)
	}
}

export default createModifierSwitches
