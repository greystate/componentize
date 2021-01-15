"use strict";

(function () {
  var FILTERING_CLASS, KEY_ESC, MATCHING_CLASS;
  MATCHING_CLASS = 'matched';
  FILTERING_CLASS = 'filtered';
  KEY_ESC = 27;

  (function () {
    var component, componentID, componentLink, componentName, components, componentsFilter, createStateToggler, entries, i, input, items, label, len, ref, states, tocElement;

    createStateToggler = function createStateToggler() {
      var toggler;
      toggler = document.createElement('button');
      toggler.type = 'button';
      toggler.textContent = 'Toggle state(s)';
      toggler.classList.add('state-toggle');
      toggler.addEventListener('click', function (event) {
        var component, currentState, newState, states, wrapper;
        wrapper = event.target.parentNode;
        component = wrapper.firstElementChild;
        states = wrapper.dataset.states.split(',');
        currentState = states.shift();

        if (currentState !== 'nil') {
          component.classList.remove(currentState);
        }

        newState = states[0];

        if (newState !== 'nil') {
          component.classList.add(newState);
        }

        states.push(currentState);
        return wrapper.dataset.states = states.join(',');
      });
      return toggler;
    };

    components = document.querySelector('.components');

    if (components != null) {
      items = Array.from(components.querySelectorAll('.component')).sort(function (a, b) {
        return a.dataset.title > b.dataset.title;
      });
      tocElement = document.createElement('section');
      tocElement.classList.add('components-toc');
      entries = ['<ul>'];

      for (i = 0, len = items.length; i < len; i++) {
        component = items[i];
        states = (ref = component.dataset.states) != null ? ref.split(',') : void 0;

        if (states != null) {
          component.appendChild(createStateToggler());
        }

        componentID = component.getAttribute('id');
        componentName = component.dataset.title;
        componentLink = componentID != null ? componentID : componentName.replace(/\s+/g, '-');
        entries.push("<li><a href=\"#".concat(componentLink, "\">").concat(componentName, "</a></li>"));

        if (componentID == null) {
          component.setAttribute('id', componentLink);
        }
      }

      entries.push('</ul>');
      tocElement.innerHTML = entries.join('\n');
      components.appendChild(tocElement);
      componentsFilter = document.createElement('div');
      componentsFilter.classList.add('components-filter');
      label = document.createElement('label');
      label.htmlFor = 'components-filter';
      label.textContent = 'Filter components';
      input = document.createElement('input');
      input.id = 'components-filter';
      input.type = 'text';
      input.placeholder = "E.g. 'gallery'";
      input.addEventListener('keyup', function (event) {
        var currentlyMatching, j, k, l, len1, len2, len3, matched, query, results, results1;
        currentlyMatching = document.querySelectorAll(".".concat(MATCHING_CLASS));

        if (event.keyCode === KEY_ESC || input.value === '') {
          components.classList.remove(FILTERING_CLASS);
          input.value = '';
          results = [];

          for (j = 0, len1 = currentlyMatching.length; j < len1; j++) {
            component = currentlyMatching[j];
            results.push(component.classList.remove(MATCHING_CLASS));
          }

          return results;
        } else {
          query = event.target.value;

          if (query.length > 2) {
            for (k = 0, len2 = currentlyMatching.length; k < len2; k++) {
              component = currentlyMatching[k];
              component.classList.remove(MATCHING_CLASS);
            }

            components.classList.add(FILTERING_CLASS);
            matched = document.querySelectorAll("[data-title*=\"".concat(query, "\" i]"));

            if (matched != null) {
              results1 = [];

              for (l = 0, len3 = matched.length; l < len3; l++) {
                component = matched[l];
                results1.push(component.classList.add(MATCHING_CLASS));
              }

              return results1;
            }
          }
        }
      });
      componentsFilter.appendChild(label);
      componentsFilter.appendChild(input);
      return components.insertBefore(componentsFilter, components.firstElementChild);
    }
  })();
}).call(void 0);

//# sourceMappingURL=componentize.js.map
