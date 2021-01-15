function createStateToggler() {
	const toggler = document.createElement('button')
	toggler.type = 'button'
	toggler.textContent = 'Toggle state(s)'
	toggler.classList.add('state-toggle')
	toggler.addEventListener('click', (event) => {
		const wrapper = event.target.parentNode
		const component = wrapper.firstElementChild
		const states = wrapper.dataset.states.split(',')
		const currentState = states.shift()
		const newState = states[0]
		if (currentState !== 'nil') {
			component.classList.remove(currentState)
		}
		if (newState !== 'nil') {
			component.classList.add(newState)
		}
		states.push(currentState)
		wrapper.dataset.states = states.join(',')
	})
	return toggler
}

export default createStateToggler
