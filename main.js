class Component {
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


class Player {
  constructor() {

    // Represent ship parts and upgrades as 'components'
    let components = [
      new Component({
        name: 'satellite_hull',
        storage_capacity: 10 })
    ];
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

}


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


class Game {
  static player = new Player();
  static page_controller = PageController;
  
}


// Game Logic
window.onload = function() {

  Game.id_value_map = {
    'player_attribute_armor_rating_p': String(`Armor Rating: ${Game.player.armor_rating}`),
    'player_attribute_storage_capacity_p': String(`Storage Capacity: ${Game.player.storage_capacity}`)
  };

  //Game.page_controller.initialize_page();
  Game.page_controller.update_document(Game.id_value_map);
}