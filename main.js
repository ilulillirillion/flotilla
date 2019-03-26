class Component {
  /*
  constructor({
      name = 'component',
      armor_rating = parseInt(0),
      storage_capacity = parseInt(0) } = {}) {
    this.name = name;
    this.armor_rating = armor_rating;
    this.storage_capacity = storage_capacity;

    console.log(this);
  }
  */
  constructor(name='component', modifiers={}) {
    this.name = name

    this.modifiers = {};
    for (const [modifier, value] of Object.entries(modifiers)) {
      this.modifiers[modifier] = value;
      //this.modifiers[modifier] = this  
    }
  }

}


class PlayerAttribute {
  constructor(name, value=0, display_name=null) {
    this.name = name;
    this.value = value;
    this.display_name = display_name || name;
  }
}


class Player {
  
  /*
  static base_attributes = {
    'armor_rating': 0,
    'storage_capacity': 0,
    'current_energy': 0,
    'energy_capacity': 0
  };
  */

  constructor() {

    //this.base_attributes = Player.base_attributes;
    /*
    let attributes = {
      'armor_rating': 0,
      'storage_capacity': 0, 
      'current_energy': 0,
      'energy_capacity': 0
    };
    */
    let attributes = [
      new PlayerAttribute('armor_rating'),
      new PlayerAttribute('storage_capacity'),
      new PlayerAttribute('current_energy'),
      new PlayerAttribute('energy_capacity')
    ];
    this.attributes = attributes;

    // Represent ship parts and upgrades as 'components'
    let components = [
      /*
      new Component({
        name: 'satellite_hull',
        storage_capacity: 10 })
      */
      new Component(
          'satellite_hull',
          {'storage_capacity': 10})
    ];
    this.components = components;

    /*
    this.status = {
      'energy': 0
    };
    */

  }

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

    /*
    let status_elements = this.status;
    for (const [status_element, value] of Object.entries(status_elements)) {
      let element_name = String(`player_status_${status_element}_p`);
      let inner_html_status_element_name = String(attribute.split('_').join(' '));
      inner_html_status_element_name = inner_html_status_element_name.replace(/\b\w/g, l => l.toUpperCase());
      let inner_html = String(`${inner_html_status_element_name}: ${value}`);
      element_map[element_name] = inner_html;
    }
    */

    return element_map;
  }

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

    /*
    this.components.forEach(function(component) {
      //Player.attributes.forEach(function(attribute) {
      Object.keys(attributes).forEach(function(attribute) {
        //let value = component[attribute];
        console.log(component);
        console.log(component.modifiers[attribute]);
        //console.log(value);
        attributes[attribute] = (attributes[attribute] || 0) + (component.modifiers[attribute] || 0);
        //attributes[attribute] += value;
        console.log(attributes);
      });

      //attributes.armor_rating += component.armor_rating;
      //attributes.storage_capacity += component.storage_capacity;
      //attributes.energy_capacity += component.energy_capacity;
    })
    */

    console.log('Finished deriving attributes');
    console.log(adjusted_attributes);
    return adjusted_attributes;
  }

  get armor_rating() {

    let total = this.components.reduce((a, b) => a + (b['armor_rating'] || 0), 0);
    return total;

  }

  get storage_capacity() {
    let total = this.components.reduce((a, b) => a + (b['storage_capacity'] || 0), 0);
    return total;
  }

}


class PageController {

  static initialize_document() {


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    document.body.append(player_info_div);


    /*
    Player.status.forEach(function(status_element) {
      let paragraph = document.createElement('p');
      paragraph.setAttribute('id', `player_status_${status_element}_p`);
      player_info_div.appendChild(paragraph);
    })
    */


    /*
    let player_attribute_armor_rating_p = document.createElement('p');
    player_attribute_armor_rating_p.setAttribute('id', 'player_attribute_armor_rating_p');
    player_info_div.appendChild(player_attribute_armor_rating_p);

    let player_attribute_storage_capacity_p = document.createElement('p');
    player_attribute_storage_capacity_p.setAttribute('id', 'player_attribute_storage_capacity_p');
    player_info_div.appendChild(player_attribute_storage_capacity_p);
    */

    //Object.keys(Player.base_attributes).forEach(function(attribute) {
    //Object.keys(Game.player.attributes).forEach(function(attribute) {
    Game.player.attributes.forEach(function(attribute) {
      let paragraph = document.createElement('p');
      paragraph.setAttribute('id', `player_attribute_${attribute.name}_p`);
      player_info_div.appendChild(paragraph);
    })

  }

  static update_document() {
    console.log('updating document');
    //console.log(id_value_map);
    for (const [element_id, inner_html] of Object.entries(Game.player.element_map)) {
      console.log(element_id);
      console.log(inner_html);
      let element = document.getElementById(element_id);
      element.innerHTML = inner_html;
    }
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
  console.log(Game.player.element_map);
}