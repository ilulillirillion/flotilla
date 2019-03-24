class Component {
  //static name = 'component';
  constructor({
      name = 'component',
      armor_rating = parseInt(0),
      storage_capacity = parseInt(0) } = {}) {
    this.name = name;
    this.armor_rating = armor_rating;
    this.storage_capacity = storage_capacity;
    console.log(this);
  }
}


/*
class Hull extends Component {
  static name = 'hull';
  static storage = parseInt(10);
}
*/



class Player {
  constructor() {

    // Represent ship parts and upgrades as 'components'
    let components = [
      new Component({
        name: 'satellite_hull',
        storage_capacity: 10 })
    ];
    //let components = [Hull];
    this.components = components;

  }

  get armor_rating() {

    let total = this.components.reduce((a, b) => a + (b['armor_rating'] || 0), 0);
    return total;

  }

  get storage_capacity() {
    let total = this.components.reduce((a, b) => a + (b['storage_capacity'] || 0), 0);
    return total;
  }

  /*
  get storage_capacity() {
    try {
      capacity = this.compon
    }
  }
  */
}


//class PageController {
//  static render_document() {
//
//  }
//}


/*
class PageElement {
  constructor({
      id,
      parent = document.body,
      children = [] }) {
    this.id = id;
    this.parent = parent;
    this.children = children;
    
    this.parent.appendChild(this);
    
  }
}
*/


/*
class Page {
  constructor() {

    //this.body = [
    //  new PageElement({
    //    id: 'player_info_div',
    //  })
    //];

    this.body = []
      
    element = document.createElement('div')
    element.setAttribute('id', 'player_info_div');
    element.innerHTML =
  }

  render() {
    this.body.forEach(function(element) {

    })
  }
}
*/

class PageController {
  static update_document(id_value_map) {
    console.log('updating document');
    console.log(id_value_map);
    for (const [element_id, inner_html] of Object.entries(id_value_map)) {
      let element = document.getElementById(element_id);
      element.innerHTML = inner_html;
    }
  }
}


class PageController__ {

  //static elements = [];
  static elements = {};
  static spans = {};

  //var player_info_div_id = String('player_info_div');

  static initialize_page() {

    let player_info_div_id = String('player_info_div');
    let player_info_div = document.createElement('div')
    player_info_div.setAttribute('id', player_info_div_id);
    document.body.append(player_info_div);
    PageController.elements.player_info_div = player_info_div;
    //PageController.elements['player_info_div'] = player_info_div;


    let exposed_attributes = [
      'armor_rating'
    ];

    exposed_attributes.forEach(function(attribute) {
      let paragraph_id = String(`player_attribute_${attribute}_p`);
      let span_id = String(`player_attribute_${attribute}_span`);
      let paragraph_inner_html = String(`${attribute}: <span id='${span_id}'></span>`);
      let paragraph = document.createElement('p');
      console.log(paragraph_id);
      console.log(paragraph);
      paragraph.setAttribute('id', paragraph_id);
      paragraph.innerHTML = paragraph_inner_html;
      PageController.elements.player_info_div.appendChild(paragraph);
      PageController.elements[paragraph_id] = paragraph;
      let span = document.getElementById(span_id);
      console.log(span_id);
      console.log(span);
      PageController.spans[span_id] = span;
      
    });

    /*
    let player_components_div_id = String('player_components_div');
    let player_components_div = document.createElement('div');
    player_components_div.setAttribute('id', player_components_div_id);
    PageController.elements.player_info_div.appendChild(player_components_div);
    PageController.elements.player_components_div = player_components_div;
    */




  }

  static update_document() {

    /*
    let player_info_div_id = String('player_info_div');
    let player_info_div = document.getElementById(div_id);
    
    let player_components_div_id = String(`player_components_p`);
    let player_components_div = document.create
    */

    console.log(PageController);
    console.log(PageController.elements);

    /*
    PageController.player_info_div.innerHTML = '';
    let exposed_attributes = [
      'armor_rating'
    ];
    let span_id = String(`player_attribute_${attribute}_p`);
    exposed_attributes.forEach(function(attribute) {
      PageController.elements[paragraph_id].innerHTML = 
    })
    */

    /*
    console.log(PageController.elements.player_components_div);
    PageController.elements.player_components_div.innerHTML = '';
    Game.player.components.forEach(function(component) {
      let element_id = String(`player_component_${component.name}_p`);
      let element_inner_html = String(component.name);
      let element = document.createElement('p');
      element.setAttribute('id', element_id);
      element.innerHTML = element_inner_html;
      PageController.elements.player_components_div.appendChild(element);
    });
    */

    console.log(PageController);
    console.log(PageController.spans);
    PageController.spans.values().forEach(function(span) {
      span.innerHTML = PageController.span_lookups[span];
    });

  }

}


class Game {
  static player = new Player();
  static page_controller = PageController;
  
}


// Game Logic
window.onload = function() {

  //Game.page_controller.span_lookups = {
  //  'player_attribute_armor_rating_span'  : Game.player.armor_rating
  //};
  
  Game.id_value_map = {
    'player_attribute_armor_rating_p': String(`Armor Rating: ${Game.player.armor_rating}`),
    'player_attribute_storage_capacity_p': String(`Storage Capacity: ${Game.player.storage_capacity}`)
  };

  //Game.page_controller.initialize_page();
  Game.page_controller.update_document(Game.id_value_map);
}