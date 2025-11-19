class StateController extends HTMLElement {
	constructor() {
		super()
	}

	// <state-controller states="nil,one,far-fetched" selected="" multiple></state-controller>
	//
	// <state-controller states="nil,one,far-fetched" selected=""></state-controller>
	//

	connectedCallback() {
		this.states = this.getAttribute('states')?.split(',')
		this.selected = this.getAttribute('selected')?.split(',')

		const isMultiple = this.hasAttribute('multiple')

		const togglesElement = document.createElement('fieldset')
		togglesElement.classList.add('component-states-modifiers')

		const legend = document.createElement('legend')
		legend.textContent = 'States & Modifiers'

		togglesElement.appendChild(legend)
		const innerComponent = this.firstElementChild

		const identifier = this.id

		const states = this.states

		const wrapper = document.createElement('div')
		states.forEach((state) => {
			const field = document.createElement('div')
			const input = document.createElement('input')

			input.value = state

			if (isMultiple) {
				input.type = 'checkbox'
				input.name = `mod-${state}`
				input.id = `${identifier}-mod-${state}`
				input.checked = this.selected.contains(state)
			} else {
				input.type = 'radio'
				input.name = `${identifier}-state`
				input.id = `${identifier}-state-${state}`
				input.checked = this.selected.contains(state) || index == 0;
			}

			const label = document.createElement('label')
			label.htmlFor = input.id
			label.textContent = isMultiple ? state : (state == 'nil' ? '(none)' : state)

			field.appendChild(input)
			field.appendChild(label)

			wrapper.appendChild(field)
		}

		this.appendChild(wrapper)
	}
}

export { StateController }

export default function registerElement() {
	customElements.define('state-controller', StateController)
}
