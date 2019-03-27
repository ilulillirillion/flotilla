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
      'hull_integrity': new Attribute('hull_integrity', 0, 'Hull Integrity')
    };
    this.attributes = attributes;

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

    })

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
  }
}


class Game {
  static player = new Player();
  static page_controller = PageController;

}


// Game Logic
window.onload = function() {

  

  Game.page_controller.initialize_document();
  Game.page_controller.update_document(Game.id_value_map);
  console.log(Game.player.attributes);
}