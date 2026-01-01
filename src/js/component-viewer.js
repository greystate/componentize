class ComponentViewer extends HTMLElement {
	connectedCallback() {
		this.attachShadow({ mode: 'open' })
		this.setAttribute('id', this.id)

		this.shadowRoot.appendChild(this.styles)
		this.shadowRoot.appendChild(this.template)

		setEventHandler(this)
	}

	get states() {
		return this.getAttribute('states')?.split(',') ?? [ ]
	}

	get modifiers() {
		return this.getAttribute('modifiers')?.split(',') ?? [ ]
	}

	get sizeController() {
		return this.querySelector('#size-controller')
	}

	get innerComponent() {
		return this.firstElementChild
	}

	get name() {
		return this.getAttribute('label')
	}

	get id() {
		let idAttribute = this.name.toLowerCase()
		idAttribute = idAttribute.replaceAll(/\s+/g, '-')
		idAttribute = idAttribute.replaceAll(/[^a-z0-9-]/g, '')
		return idAttribute
	}

	get styles() {
		const styleSheet = document.createElement('style')
		styleSheet.textContent = `:host {
			--component-border-color: rgba(0 0 0 / 10%);
			--component-solid-bg-color: rgba(80, 80, 80);
			--controls-opacity: 0.1;
			--component-size: 100;

			transition: border-color 200ms ease-in;
			display: flex;
			flex-direction: column;
			gap: 0;
			border: 2px solid var(--component-border-color);
			padding: 0;
			margin-block: 4rem;
			border-radius: 8px;
			overflow: clip;
			background: rgba(0 0 0 / 5%);
		}

		:host(:hover),
		:host(:focus-within) {
			--component-border-color: rgba(0 0 0 / 90%);
			--controls-opacity: 1;
		}

		.component {
			background: white;
		}

		::slotted(*) {
			box-sizing: border-box;
			inline-size: calc(var(--component-size, 100) * 1%);
		}

		:host([background="transparent"]) .component {
			transition: background-color 0.5s linear;
			padding: 25px;
			background: rgba(255, 144, 192, 0.15) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAACKElEQVR4nO3VoRHEMBAEQcn1gX3+SZ2p0FAZdEewZGr3Wuu/+IyZuT2Bw3N7AHyZQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBMJvZm5v4LD3vj2BgweBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoHwAvXgB8+uySnZAAAAAElFTkSuQmCC') left top;
			background-size: 18px;
			border-radius: 0;
		}
		:host([background="transparent"]) .component:hover {
			background-color: #ff90c0;
		}

		:host([background="solid"]) .component {
			background: var(--component-solid-bg-color);
		}

		header {
			display: flex;
			justify-content: space-between;
			padding-inline: 1rem;
		}

		h2 {
			font-size: 0.75rem;
			font-weight: normal;
			font-family: Inconsolata, Andale Mono, monospace, sans-serif;
			display: block;
			align-self: center;
		}

		.controls label { cursor: pointer; }
		.controls, .component {
			transition: border-color 200ms ease-in;
			border-block-start: 2px solid var(--component-border-color, black);
			padding: 1rem;
		}

		.controls fieldset { display: flex; gap: 2em; border: none; font-family: monospace; opacity: var(--controls-opacity, 1); transition: opacity 200ms ease-in; }
		.controls state-controller > div { display: flex; gap: 0.5em }
		.controls .sizer { margin-inline-start: auto; }
		`

		return styleSheet
	}

	get template() {
		const templateElement = document.createElement('template')
		let html = `<header><h2 class="title">${this.name}</h2><input id="size-controller" class="sizer" type="range" min="25" max"100" value="100" step="25"></header>`
			html += `<article class="component"><slot></slot></article>`
		if (this.modifiers.length || this.states.length) {
			html += `<section class="controls"><fieldset><legend>States & modifiers</legend>`
			html += this.modifiers.length > 0 ? `<state-controller for="${this.id}" states="${this.modifiers.join(',')}" selected="${this.selectedModifiers}" is-multiple></state-controller>` : ''
			html += this.states.length > 0 ? `<state-controller for="${this.id}" states="${this.states.join(',')}" selected="${this.selectedState}"></state-controller>` : ''
			html += `</fieldset></section>`
		}

		templateElement.innerHTML = html

		return templateElement.content
	}

	get selectedModifiers() {
		return this.modifiers.filter(m => this.innerComponent.classList.contains(m)).join(',')
	}

	get selectedState() {
		return this.states.filter(s => this.innerComponent.classList.contains(s))[0]
	}
}

function setEventHandler(element) {
	const controls = element.shadowRoot.querySelector('.controls')
	const header = element.shadowRoot.querySelector('header')

	if (controls != null) {
		controls.addEventListener('click', (event) => {
			const target = event.target
			if (target.nodeName !== 'INPUT') { return }
			const value = target.value
			const componentWrapper = element.closest('component-viewer')
			const component = componentWrapper.firstElementChild


			if (target.type === 'radio') {
				setState(component, value)
			} else if (target.type === 'checkbox') {
				component.classList.toggle(value)
			}
		})
	}

	if (header != null) {
		header.addEventListener('mousemove', (event) => {
			if (event.target.type === 'range') {
				const value = event.target.value
				element.style.setProperty('--component-size', value)
			}
		})
	}
}

function setState(element, newState) {
	const states = element.parentNode.states
	states.forEach((state) => {
		if (state !== 'nil') {
			element.classList.remove(state)
		}
	})
	if (newState !== 'nil') {
		element.classList.add(newState)
	}
}

export { ComponentViewer }

export default function registerElement() {
	customElements.define('component-viewer', ComponentViewer)
}
