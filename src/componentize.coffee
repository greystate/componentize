MATCHING_CLASS = 'matched'
FILTERING_CLASS = 'filtered'
KEY_ESC = 27

do ->
	createStateToggler = () ->
		toggler = document.createElement 'button'
		toggler.type = 'button'
		toggler.textContent = 'Toggle state(s)'
		toggler.classList.add 'state-toggle'
		toggler.addEventListener 'click', (event) ->
			wrapper = event.target.parentNode
			component = wrapper.firstElementChild
			states = wrapper.dataset.states.split ','
			currentState = states.shift()
			component.classList.remove currentState unless currentState is 'nil'
			newState = states[0]
			component.classList.add newState unless newState is 'nil'
			states.push currentState
			wrapper.dataset.states = states.join ','
		toggler
	
	components = document.querySelector '.components'

	if components?
		items = (Array.from components.querySelectorAll '.component').sort (a, b) => a.dataset.title > b.dataset.title
		tocElement = document.createElement 'section'
		tocElement.classList.add 'components-toc'
		entries = [ '<ul>' ]
		for component in items
			states = component.dataset.states?.split ','
			if states?
				component.appendChild createStateToggler()
			componentID = component.getAttribute 'id' 
			componentName = component.dataset.title
			componentLink = componentID ? componentName.replace /\s+/g, '-'
			entries.push "<li><a href=\"##{componentLink}\">#{componentName}</a></li>"
			component.setAttribute 'id', componentLink unless componentID?
		
		entries.push '</ul>'
		tocElement.innerHTML = entries.join '\n'
		components.appendChild tocElement
		
		componentsFilter = document.createElement 'div'
		componentsFilter.classList.add 'components-filter'
		label = document.createElement 'label'
		label.htmlFor = 'components-filter'
		label.textContent = 'Filter components'
		input = document.createElement 'input'
		input.id = 'components-filter'
		input.type = 'text'
		input.placeholder = "E.g. 'gallery'"
		input.addEventListener 'keyup', (event) ->
			currentlyMatching = document.querySelectorAll ".#{MATCHING_CLASS}"
			if event.keyCode is KEY_ESC or input.value is ''
				components.classList.remove FILTERING_CLASS
				input.value = ''
				for component in currentlyMatching
					component.classList.remove MATCHING_CLASS
			else
				query = event.target.value
				if query.length > 2
					for component in currentlyMatching
						component.classList.remove MATCHING_CLASS
					components.classList.add FILTERING_CLASS
					matched = document.querySelectorAll "[data-title*=\"#{query}\" i]"
					if matched?
						for component in matched
							component.classList.add MATCHING_CLASS
		
		componentsFilter.appendChild label
		componentsFilter.appendChild input
		components.insertBefore(componentsFilter, components.firstElementChild)
