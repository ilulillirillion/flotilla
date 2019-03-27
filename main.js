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
    //this.maximum_value = maximum_value;
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

    let attributes = [
      new Attribute('hull_integrity')
    ];
    this.attributes = attributes;

    /*
    let raw_attributes = [
      new PlayerAttribute('armor_rating'),
      new PlayerAttribute('storage_capacity'),
      new PlayerAttribute('current_energy'),
      new PlayerAttribute('energy_capacity')
    ];
    this.raw_attributes = raw_attributes;
    */

    // Represent ship parts and upgrades as 'components'
    /*
    let components = [
      new Component(
          'satellite_hull',
          {'storage_capacity': 10})
    ];
    this.components = components;
    */

  }

  /*
  get attributes() {

    let attributes = {};


    Game.player.attributes.forEach(function(attribute) {
      adjusted_attributes[attribute.name] = (adjusted_attributes[attribute.name] || 0) + attribute.value;
    });

    this.components.forEach(function(component) {
      //Object.keys(component.modifiers).forEach(function(attribute) {
      for (const [attribute, value] of Object.entries(component.modifiers)) {
        adjusted_attributes[attribute] = (adjusted_attributes[attribute] || 0) + value;
      }
    });

  }
  */

  /*
  get element_map() {
    console.log('Deriving element map');
    let element_map = {};

    //let attributes = this.attributes;
    let attributes = this.adjusted_attributes;
    console.log(attributes);
    for (const [attribute, value] of Object.entries(attributes)) {
      console.log(`Iterating attribute: <${attribute}>`);
      let element_name = String(`player_attribute_${attribute}_p`);
      let inner_html_attribute = String(attribute.split('_').join(' '));
      // https://stackoverflow.com/questions/2332811/capitalize-words-in-string
      inner_html_attribute = inner_html_attribute.replace(/\b\w/g, l => l.toUpperCase());
      //inner_html_attribute = inner_html_attribute.charAt(0).toUpperCase() + inner_html_attribute.
      //inner_html_attribute = inner_html_attribute.charAt(0).toUpper
      let inner_html = String(`${inner_html_attribute}: ${value}`);
      element_map[element_name] = inner_html;
    }

    return element_map;
  }
  */

  /*
  get adjusted_attributes() {
    //let attributes = {
    //  'armor_rating': 0,
    //  'storage_capacity': 0
    //};
    console.log('deriving attributes');

    //let attributes = {};

    //let attributes = this.base_attributes;

    let adjusted_attributes = {};

    //console.log(attributes);
    //console.log(Player.base_attributes);

    //for (const [attribute, value] of Object.entries(Game.player.attributes)) {
    Game.player.attributes.forEach(function(attribute) {
      adjusted_attributes[attribute.name] = (adjusted_attributes[attribute.name] || 0) + attribute.value;
    });

    this.components.forEach(function(component) {
      //Object.keys(component.modifiers).forEach(function(attribute) {
      for (const [attribute, value] of Object.entries(component.modifiers)) {
        adjusted_attributes[attribute] = (adjusted_attributes[attribute] || 0) + value;
      }
    });


    console.log('Finished deriving attributes');
    console.log(adjusted_attributes);
    return adjusted_attributes;
  }
  */

  /*
  get armor_rating() {

    let total = this.components.reduce((a, b) => a + (b['armor_rating'] || 0), 0);
    return total;

  }
  */

  /*
  get storage_capacity() {
    let total = this.components.reduce((a, b) => a + (b['storage_capacity'] || 0), 0);
    return total;
  }
  */

}


class PageController {

  static initialize_document() {


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    document.body.append(player_info_div);


    //Object.keys(Player.base_attributes).forEach(function(attribute) {
    //Object.keys(Game.player.attributes).forEach(function(attribute) {
    Game.player.attributes.forEach(function(attribute) {

      let element = document.createElement(attribute.dynamic_document_node.element_type);
      element.setAttribute('id', attribute.dynamic_document_node.element_id);
      //attribute.dynamic_document_node.parent
      let parent = document.getElementById(attribute.dynamic_document_node.parent_id);
      parent.appendChild(element);

      /*
      let paragraph = document.createElement('p');
      paragraph.setAttribute('id', `player_attribute_${attribute.name}_p`);
      player_info_div.appendChild(paragraph);
      */
    })

  }

  static update_document() {
    console.log('updating document');
    //console.log(id_value_map);
    /*
    for (const [element_id, inner_html] of Object.entries(Game.player.element_map)) {
      console.log(element_id);
      console.log(inner_html);
      let element = document.getElementById(element_id);
      element.innerHTML = inner_html;
    }
    */

    // Attributes
    Game.player.attributes.forEach(function(attribute) {
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

  /*
  static id_value_map = {
    'player_attribute_armor_rating_p': String(`Armor Rating: ${Game.player.armor_rating}`),
    'player_attribute_storage_capacity_p': String(`Storage Capacity: ${Game.player.storage_capacity}`)
  };
  */
  
}


// Game Logic
window.onload = function() {

  

  Game.page_controller.initialize_document();
  Game.page_controller.update_document(Game.id_value_map);
  console.log(Game.player.attributes);
  //console.log(Game.player.element_map);
}