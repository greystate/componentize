class StateController extends HTMLElement {
	constructor() {
		super()
	}

	// <state-controller for="component-name" states="nil,one,far-fetched" selected="" is-multiple></state-controller>
	//
	// <state-controller for="component-name" states="nil,one,far-fetched" selected=""></state-controller>
	//

	connectedCallback() {
		const isMultiple = this.hasAttribute('is-multiple')

		const identifier = this.componentName
		const states = this.states

		const wrapper = document.createElement('div')
		wrapper.style = 'display: flex; align-items: center; gap: 1em;'
		states.forEach((state, index) => {
			const field = document.createElement('div')
			const input = document.createElement('input')

			input.value = state

			if (isMultiple) {
				input.type = 'checkbox'
				input.switch = true
				input.name = `mod-${state}`
				input.id = `${identifier}-mod-${state}`
				input.checked = this.selected.includes(state)
			} else {
				input.type = 'radio'
				input.name = `${identifier}-state`
				input.id = `${identifier}-state-${state}`
				input.checked = this.selected == state || index == 0;
			}

			const label = document.createElement('label')
			label.htmlFor = input.id
			label.textContent = isMultiple ? state : (state == 'nil' ? '(none)' : state)

			field.style = 'display: flex; align-items: center; gap: 0.5em;'
			field.appendChild(input)
			field.appendChild(label)

			wrapper.appendChild(field)
		})

		this.appendChild(wrapper)
	}

	get componentName() {
		return this.getAttribute('for') ?? 'generated-name'
	}

	get states() {
		return this.getAttribute('states')?.split(',') ?? [ ]
	}

	get selected() {
		return this.getAttribute('selected')?.split(',') ?? [ ]
	}
}

export { StateController }

export default function registerElement() {
	customElements.define('state-controller', StateController)
}
