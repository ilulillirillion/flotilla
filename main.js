class Component {

  constructor(name='component', modifiers={}) {
    this.name = name

    this.modifiers = {};
    for (const [modifier, value] of Object.entries(modifiers)) {
      this.modifiers[modifier] = value;
    }
  }
}


class DynamicDocumentNode {
  constructor(name, value, element_type, element_id, parent_id, inner_html_name) {
    this.name = name;
    this.value = value;
    this.element_type = element_type;
    this.element_id = element_id;
    this.parent_id = parent_id;
    this.inner_html_name = inner_html_name;
  }

  get inner_html() {
    let inner_html = String(`${this.inner_html_name}: ${this.value}`);
    return inner_html;
  }
}


class Attribute {
  constructor(name, value=0, display_name=null, maximum_value=null) {
    this.name = name;
    this.display_name = display_name || name;
    this.value = value;
  }

  get dynamic_document_node() {
    let element_type = String('p');
    let dynamic_document_node = new DynamicDocumentNode(
        this.name, 
        this.value, 
        element_type,
        String(`player_attribute_${this.name}_${element_type}`),
        String('player_info_div'),
        this.display_name);
    return dynamic_document_node;
  }
}


class Player {
  
  constructor() {

    let attributes = {
      'hull_integrity': new Attribute('hull_integrity', 0, 'Hull Integrity'),
      'energy': new Attribute('energy', 0, 'Energy')
    };
    this.attributes = attributes;

  }

  tick() {

    // Player gains 0.001 energy every tick
    this.attributes.energy.value += 0.001;

  }

}


class PageController {

  static initialize_document() {


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    document.body.append(player_info_div);


    Object.values(Game.player.attributes).forEach(function(attribute) {
      let element = document.createElement(attribute.dynamic_document_node.element_type);
      element.setAttribute('id', attribute.dynamic_document_node.element_id);
      let parent = document.getElementById(attribute.dynamic_document_node.parent_id);
      parent.appendChild(element);
    });

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
      let element = document.getElementById(attribute.dynamic_document_node.element_id);
      let parent = document.getElementById(attribute.dynamic_document_node.parent_id);
      let inner_html = attribute.dynamic_document_node.inner_html;
      element.innerHTML = inner_html;
    });

    // World Epoch Seconds
    console.log(Game.world.epoch_seconds);
    let element = document.getElementById(Game.world.epoch_seconds.element_id);
    //let parent = document.getElementById(Game.world.epoch_seconds.dynamic_document_node.parent_id);
    let inner_html = Game.world.epoch_seconds.inner_html;
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