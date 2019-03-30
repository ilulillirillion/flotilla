class DocumentNode {
  constructor({
    element_id,
    value = '',
    max = null,
    decoration = '',
    element_type = 'p',
    parent_id = null,
    linebreak = true
  }) {

    this.element_id = element_id;
    this.value = value;
    this.max = max;
    this.decoration = decoration;
    this.element_type = element_type;
    this.parent_id = parent_id;

    // Create the element on instantiation
    let element = document.getElementById(element_id);
    try {
      if (!element) {
        console.log('Creating new element for DocumentNode');
        element = document.createElement(this.element_id);
        this.parent.appendChild(element);
        console.log(`Setting element id to ${this.element_id}`);
        element.setAttribute('id', this.element_id);
        element.innerHTML = this.inner_html;
        if (linebreak) {
          let br = document.createElement('br');
          this.parent.appendChild(br);
          //console.log(parent);
        }
      }
    }
    catch(err) {}
  }

  get parent() {
    // Note: https://jsperf.com/unique-by-tag-name
    let parent = document.body;
    if (this.parent_id) {
      // Simply trust that the parent exists
      parent = document.getElementById(this.parent_id);
    }
    if (!parent) {
      console.log('parent is null, substituting body');
      parent = document.body;
    }
    return parent;
  }

  get element() {
    let element = document.getElementById(this.element_id);
    // If the element doesn't exist, create it
    if (!element) {
      element = document.createElement(this.element_id);
      this.parent.appendChild(element);
    }
    // Always set the ID while updating element
    element.setAttribute('id', this.element_id);
    // Finally, just return the element
    return element;
  }


  get inner_html() {
    console.log('Retrieving DocumentNode inner_html');
    let inner_html = '';
    let value = String(`${parseInt('' + (this.value * 100)) / 100}`);
    if (this.max) {
      value = String(`${value}/${this.max}`);
    }
    if (Array.isArray(this.decoration)) {
      inner_html += this.decoration[0];
      inner_html += value;
      inner_html += this.decoration[1];
    }
    else {
      inner_html += this.decoration || '';
      inner_html += value;
    }
    console.log(inner_html);
    return inner_html;
  }

  tick() {
    console.log('Ticking DocumentNode');
    let inner_html = this.inner_html;
    this.element.innerHTML = inner_html;
  }
}


class ____GenericDocumentNode {
  constructor({
    element_id,
    value = null,
    element_type = 'p',
    parent_id = null    
  }) {

    // Create the element on instantiation
    element = document.getElementById(element_id);
    if (!element) {
      element = document.createElement(this.element_id);
      this.parent.appendChild(element);
      element.setAttribute('id', this.element_id);
    }
  }

  get parent() {
    // Simply trust that the parent exists
    let parent = document.getElementById(this.parent_id);
    return parent;
  }

  get element() {
    let element = document.getElementById(this.element_id);
    // If the element doesn't exist, create it
    if (!element) {
      element = document.createElement(this.element_id);
      this.parent.appendChild(element);
    }
    // Always set the ID while updating element
    element.setAttribute('id', this.element_id);
    // Finally, just return the element
    return element;
  }
  get inner_html() {
    inner_html = this.value;
    return inner_html;
  }

  tick() {
    this.element.innerHTML = this.value;
  }
}


class Attribute {
  //constructor(name, value=0, display_name=null, value_format_macro=null, maximum_value=null) {
  constructor({
    name,
    value=0,
    max=null,
    decoration=null
  }) {
    this.decoration = decoration;
    this.name = name;
    //this.display_name = display_name || name;
    this.value = value;
    this.max = max;
    //this.value_format_macro = value_format_macro;
  }

  get document_node() {
    let document_node = new DocumentNode({
      element_id: String(`player_attribute_${this.name}_p`),
      value: this.value,
      max: this.max,
      parent_id: 'player_info_div',
      decoration: this.decoration
    });
    return document_node;
  }

}

class Player {
  
  constructor() {

    let attributes = {
      'energy': new Attribute({
        name: 'energy', 
        value: 0,
        max: 10,
        decoration: ['Energy: ', ' watts']}),
      'hull_integrity': new Attribute({
        name: 'hull_integrity', 
        value: 1,
        max: 1,
        decoration: 'Hull Integrity: '})
      }
      
    this.attributes = attributes;

  }

  tick() {
    // Player gains energy every tick
    this.attributes.energy.value += 0.01;
    if (this.attributes.energy.value > this.attributes.energy.max) {
      this.attributes.energy.value = this.attributes.energy.max;
    }
  }

}


class PageController {

  static initialize_document() {


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    console.log(document.body);
    document.body.append(player_info_div);


  }

  static update_document() {
    console.log('updating document');

    // Attributes
    Object.values(Game.player.attributes).forEach(function(attribute) {

      attribute.document_node.tick();
    });


  }
}


class World {
  constructor() {
    console.log('instantiating world');
    console.log(document.getElementById('player_info_div'));
    this.epoch_seconds = new DocumentNode({
      element_id: 'world_epoch_seconds',
      value: 0,
      decoration: ['World Age: ', ' seconds'],
      parent_id: 'player_info_div'
    })
  }

  tick() {
    this.epoch_seconds.value += 1;
    console.log(`Epoch seconds: ${this.epoch_seconds.value}`);
    this.epoch_seconds.tick();
  }
}


class Game {
  static page_controller = PageController;
}

Game.main_loop = function() {
  setInterval(function() {
    Game.player.tick();
    Game.world.tick();
    Game.page_controller.update_document();
  }, 1000);
}


// Game Logic
window.onload = function() {

  Game.page_controller.initialize_document();
  Game.player = new Player();
  Game.world = new World();

  Game.main_loop();
  console.log(Game.player.attributes);
}