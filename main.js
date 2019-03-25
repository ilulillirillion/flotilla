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


class Player {
  
  static attributes = [
    'armor_rating',
    'storage_capacity',
    'energy_capacity'
  ];

  constructor() {

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

  }

  get element_map() {
    console.log('Deriving element map');
    let element_map = {};
    let attributes = this.attributes;
    console.log(attributes);
    for (const [attribute, value] of Object.entries(attributes)) {
      console.log(`Iterating attribute: <${attribute}>`);
      let element_name = String(`player_attribute_${attribute}_p`);
      let inner_html_attribute = String(attribute.split('_').join(' '));
      // https://stackoverflow.com/questions/2332811/capitalize-words-in-string
      inner_html_attribute = inner_html_attribute.replace(/\b\w/g, l => l.toUpperCase())
      //inner_html_attribute = inner_html_attribute.charAt(0).toUpperCase() + inner_html_attribute.
      //inner_html_attribute = inner_html_attribute.charAt(0).toUpper
      let inner_html = String(`${inner_html_attribute}: ${value}`);
      element_map[element_name] = inner_html;
    }
    return element_map;
  }

  get attributes() {
    //let attributes = {
    //  'armor_rating': 0,
    //  'storage_capacity': 0
    //};
    console.log('deriving attributes');

    let attributes = {};
    console.log(attributes);
    console.log(Player.attributes);

    this.components.forEach(function(component) {
      Player.attributes.forEach(function(attribute) {
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

    console.log('Finished deriving attributes');
    console.log(attributes);
    return attributes;
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
    let player_attribute_armor_rating_p = document.createElement('p');
    player_attribute_armor_rating_p.setAttribute('id', 'player_attribute_armor_rating_p');
    player_info_div.appendChild(player_attribute_armor_rating_p);

    let player_attribute_storage_capacity_p = document.createElement('p');
    player_attribute_storage_capacity_p.setAttribute('id', 'player_attribute_storage_capacity_p');
    player_info_div.appendChild(player_attribute_storage_capacity_p);
    */

    Player.attributes.forEach(function(attribute) {
      let paragraph = document.createElement('p');
      paragraph.setAttribute('id', `player_attribute_${attribute}_p`);
      player_info_div.appendChild(paragraph);
    })

  }

  static update_document() {
    console.log('updating document');
    //console.log(id_value_map);
    for (const [element_id, inner_html] of Object.entries(Game.player.element_map)) {
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