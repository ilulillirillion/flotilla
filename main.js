class Component {

  constructor(name='component', modifiers={}) {
    this.name = name

    this.modifiers = {};
    for (const [modifier, value] of Object.entries(modifiers)) {
      this.modifiers[modifier] = value;
    }
  }
}


//IDEA: create element on document in constructor?
class GenericDocumentNode {
  constructor(
      value = '',
      element_type = 'p',
      element_id = null,
      parent_id = null,
  )

  get parent() {
    // Simply trust that the parent exists
    let parent = document.getElementById(this.parent_id);
    return parent;
  }

  get element() {
    let element = document.getElementById(this.element_id);
    if (!element) {
      element = document.createElement(this.element_type);
      this.parent.appendChild(element);
    }
    element.setAtrribute('id', this.element_id);
    return element;
  }

  get inner_html() {
    return this.value;
  }

  tick() {
    this.element.innerHTML = this.inner_html;
  }
}


class CountNode extends GenericDocumentNode {

  // Think this needs to be psuedo named to work
  constructor(
    prefix,
    tracked_value,
    suffix
  ) {
    super();
  }

  get inner_html() {
    let inner_html = value;

  }
}


class DynamicDocumentNode {
  constructor(name, value, element_type, element_id, parent_id, inner_html_name, inner_html_format_macro=null) {
    this.name = name;
    this.value = value;
    this.element_type = element_type;
    this.element_id = element_id;
    this.parent_id = parent_id;
    this.inner_html_name = inner_html_name;
    this.inner_html_format_macro = inner_html_format_macro;
  }

  get parent() {
    let parent = document.getElementById(this.parent_id);
    return parent;
  }

  get element() {
    let element = document.getElementById(this.element_id);
    if (!element) {
      element = document.createElement(this.element_type);
      this.parent.appendChild(element);
    }
    element.setAttribute('id', this.element_id);
    return element;

  }

  get inner_html() {
    console.log('getting inner_html');
    let value = this.value;
    console.log(`Raw value: <${value}>.`);
    if (this.inner_html_format_macro == 'watts_si') {
      value = String(`${parseInt('' + (value * 100)) / 100} watts`);
      console.log(`watts_si value: <${value}>.`);
    }
    let inner_html = String(`${this.inner_html_name}: ${value}`);
    return inner_html;
  }
}


class Attribute {
  constructor(name, value=0, display_name=null, value_format_macro=null, maximum_value=null) {
    this.name = name;
    this.display_name = display_name || name;
    this.value = value;
    this.value_format_macro = value_format_macro;
  }

  get dynamic_document_node() {
    let element_type = String('p');
    let dynamic_document_node = new DynamicDocumentNode(
        this.name, 
        this.value, 
        element_type,
        String(`player_attribute_${this.name}_${element_type}`),
        String('player_info_div'),
        this.display_name,
        this.value_format_macro);
    return dynamic_document_node;
  }
}


class Action {
  constructor() {
  }

  get dynamic_document_node() {
    let element_type = String('button');
    let dynamic_document_node = new DynamicDocumentNode(
      this.name,

    )
  }
}


class Player {
  
  constructor() {

    let attributes = {
      'hull_integrity': new Attribute('hull_integrity', 0, 'Hull Integrity'),
      'energy': new Attribute('energy', 0, 'Energy', 'watts_si')
    };
    this.attributes = attributes;

  }

  tick() {
    // Player gains energy every tick
    this.attributes.energy.value += 0.01;
  }

}


class PageController {

  static initialize_document() {


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    document.body.append(player_info_div);

    // World second ticker
    let element = document.createElement(Game.world.epoch_seconds.element_type);
    element.setAttribute('id', Game.world.epoch_seconds.element_id);
    let parent = document.getElementById(Game.world.epoch_seconds.parent_id);
    parent.appendChild(element);

  }

  static update_document() {
    console.log('updating document');

    // Attributes
    Object.values(Game.player.attributes).forEach(function(attribute) {
      let inner_html = attribute.dynamic_document_node.inner_html;
      console.log(inner_html);
      attribute.dynamic_document_node.element.innerHTML = inner_html;
    });

    // World Epoch Seconds
    console.log(Game.world.epoch_seconds);
    let element = document.getElementById(Game.world.epoch_seconds.element_id);
    //let parent = document.getElementById(Game.world.epoch_seconds.dynamic_document_node.parent_id);
    let inner_html = Game.world.epoch_seconds.inner_html;
    console.log(inner_html);
    element.innerHTML = inner_html;

  }
}


class World {
  constructor() {
    this.epoch_seconds = new DynamicDocumentNode(
        'epoch_seconds',
        0,
        'p',
        'world_epoch_seconds',
        'player_info_div',
        'World Age');
  }

  tick() {
    this.epoch_seconds.value += 1;
  }
}


class Game {
  static player = new Player();
  static world = new World();
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
  Game.page_controller.update_document();
  Game.main_loop();
  console.log(Game.player.attributes);
}