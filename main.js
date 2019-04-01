class DocumentNode {
  constructor({
    element_id,
    value = '',
    action = null,
    max = null,
    min = null,
    decoration = '',
    element_type = 'p',
    parent_id = null,
    linebreak = false,
    listeners = [],
    visible_when = []
  }) {

    this.element_id = element_id;
    this.value = value;
    this.action = action;
    this.max = max;
    this.min = min;
    this.decoration = decoration;
    this.element_type = element_type;
    this.parent_id = parent_id;
    this.listeners = listeners;
    this.visible_when = visible_when;

    // Create the element on instantiation
    let element = document.getElementById(element_id);
    try {
      if (!element) {
        console.log('Creating new element for DocumentNode');
        element = document.createElement(this.element_type);
        this.parent.appendChild(element);
        console.log(`Setting element id to ${this.element_id}`);
        element.setAttribute('id', this.element_id);
        element.innerHTML = this.inner_html;
        if (linebreak) {
          let br = document.createElement('br');
          this.parent.appendChild(br);
        }
        console.log('Checking element action');
        console.log(this);
        console.log(this.action);
        //if (this.action != null) {
        if (this.action != null) {
          console.log('Adding action to element');
          //element.onclick = this.action;
          //element.onclick = function() {
          //  action();
          //  this.update_visibility();
          //}
          element.onclick = this.resolve_action.bind(this);
          //let that = this;
          //element.onclick = function(that) {
          //  that.action;
          //  that.update_visibility();
          //}
        }
      }
    }
    catch(err) {}
  }

  resolve_action() {
    this['action']();
    this.update_visibility();
  }

  modify_value(modification, set=false) {
    if (set) {
      var proposed_value = modification;
    }
    else {
      var proposed_value = this.value + modification;
    }
    if (this.max) {
      //if (this.value == this.max) {
      //  return false;
      //}
      if (proposed_value >= this.max) {
        proposed_value = this.max;
      }
    }
    console.log('Checking proposed value against minimum');
    console.log(this.min);
    //if (this.min && proposed_value < this.min) {
    if (this.min != null) {
      console.log(`Proposed value, min: ${proposed_value}, ${this.min}`);
      if (proposed_value < this.min) {
        console.log('Value is below minimum, setting to minimum');
        proposed_value = this.min;
      }
    }
    this.value = proposed_value;
    this.update_html();

    // visibility rules
    //this.visible_when.forEach(function(rule))
    this.update_visibility();
    

    

    // Trigger listeners
    for (var i=0; i < this.listeners.length; i++) {
      console.log('iterating on listeners');
      this.listeners[i]();
    }
  }

  update_visibility() {
    let show_element = 'block'
    this.visible_when.forEach(function(rule) {
      console.log('iterating a visibility rule');
      console.log(rule);
      //if (!rule()) {
      //  show_element = 'hidden'
      //}
      let result = rule();
      if (!result) {
        console.log('hiding element');
        show_element = 'none';
      }
    });
    console.log(show_element);
    this.element.style.display = show_element;
  }

  update_value(change) {
    let value = this.value + change;
    if (this.max && value > this.max) {
      value = this.max;
    }
    else if (this.min && value < this.min) {
      value = this.min;
    }
    //return value;
    this.value = value;
    //this.listeners.forEach(function(listener) {
    for (var i=0; i < this.listeners.length; i++) {
      console.log('iterating on listeners');
      this.listeners[i]();
    }
  }

  set_value(value) {
    if (this.max && value > this.max) {
      value = this.max;
    }
    else if (this.min && value < this.min) {
      value = this.min;
    }
    this.value = value;
    for (var i=0; i < this.listeners.length; i++) {
      console.log('iterating on listeners');
      this.listeners[i]();
    }
  }

  //get value() {
    /*
    if (this.max) {
      if (this._value > this.max) {
        this._value = this.max;
      }
    }
    */
    //this.tick();
  //  return this._value;
  //}

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
    if (this.value == null || this.value == '') {
      var value = String('');
    }
    else {
      var value = String(`${parseInt('' + (this.value * 100)) / 100}`);
    }
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

  update_html() {
    let inner_html = this.inner_html;
    this.element.innerHTML = inner_html;

  }

  tick() {
    console.log('Ticking DocumentNode');
    this.update_html();
  }
}


/*
class ValueListener {
  constructor({
    target,

  }) {}
}
*/



class Component {
  constructor({
    player_object,
    name,
    bonuses
  }) {
    this.name = name;
    this.bonuses = bonuses

    //this.bonuses.forEach(function(bonus) {
    for (const [attribute, modification] of Object.entries(this.bonuses)) {
      player_object.attributes[attribute].max += (modification);
    }

  }
}


class Player {
  
  constructor() {
    let test_listener = function() {
      console.log('test listener fired!');
    }

    let components = [];
    this.components = components;

    let attributes = {
      'energy': new DocumentNode({
        element_id: String('player_attribute_energy_p'),
        element_type: 'p',
        value: 0,
        max: 10,
        parent_id: 'player_info_div',
        decoration: ['Energy: ', ' watts']
      }),
      'hull_integrity': new DocumentNode({
        element_id: String('player_attribute_hull_integrity_p'),
        element_type: 'p',
        value: 1,
        max: 5,
        min: 0,
        decoration: 'Hull Integrity: ',
        parent_id: 'player_info_div',
        listeners: [
          test_listener.bind(),
          this.check_if_hull_critical.bind(this)
        ]
      }),
     'minerals': new DocumentNode({
       element_id: 'player_attribute_minerals_p',
       value: 0,
       max: 10,
       decoration: 'Minerals: ',
       parent_id: 'player_info_div'
     })
    }
    this.attributes = attributes;

    var that = this;
    let actions = {
      'charge_energy': new DocumentNode({
        element_id: 'player_action_charge_energy_button',
        element_type: 'button',
        decoration: 'Charge Energy',
        action: this.charge_energy.bind(this),
        parent_id: 'player_actions_div'
      }),
      //'collide_with_space_debris': new DocumentNode({
      //  element_id: 'player_action_collide_with_space_debris_button',
      //  element_type: 'button',
      //  decoration: 'Collide'
      //}),
      'gather_space_debris': new DocumentNode({
        element_id: 'player_action_gather_space_debris_button',
        element_type: 'button',
        decoration: 'Gather Space Debris',
        action: this.gather_space_debris.bind(this),
        parent_id: 'player_actions_div'
      }),
      'repair_hull': new DocumentNode({
        element_id: 'player_action_repair_hull_button',
        element_type: 'button',
        decoration: 'Repair Hull',
        action: this.repair_hull.bind(this),
        parent_id: 'player_actions_div'
      }),
      'reboot': new DocumentNode({
        element_id: 'player_action_reboot_button',
        element_type: 'button',
        decoration: 'Reboot',
        action: this.reboot.bind(this),
        parent_id: 'player_actions_div'
      }),
      'build_test_component': new DocumentNode({
        element_id: 'player_action_build_test_component',
        element_type: 'button',
        decoration: 'Build crude minerals storage',
        action: this.build_simple_storage.bind(this),
        parent_id: 'player_actions_div',
        visible_when: [
          function() {
            console.log(that.components);
            //if (!'test_component' in that.components) {
            that.components.forEach(function(component) {
              console.log('checking component name');
              if (component.name == 'crude_minerals_storage') {
                console.log('found match');
                return true;
              }
            });
            //return true;
          //}
          //else {
            return false;
          }
        ]
      })
    }
    this.actions = actions;

  }

  reboot() {
    if (this.attributes.energy.value >= 1) {
      Game.write('Rebooting');
      this.attributes.energy.modify_value(-1);
      //this.attributes.energy.modify_value(-10);
      this.attributes.hull_integrity.modify_value(1, true);
    }
  }

  build_simple_storage() {
    if (this.attributes.minerals.value >= 10) {
      this.attributes.minerals.modify_value(-10);
      let component = new Component({
        player_object: this,
        name: 'crude_mineral_storage',
        bonuses: {
          'minerals': 5
        }
      });
      this.components.push(component);
    }
  }

  repair_hull() {
    if (this.attributes.minerals.value >= 10 &&
        this.attributes.energy.value >= 1 &&
        this.attributes.hull_integrity.value < this.attributes.hull_integrity.max) {
        //this.attributes.energy.value >= 1) {
      Game.write('Repairing hull');
      //this.attributes.minerals.update_value(-10);
      this.attributes.minerals.modify_value(-10);
      this.attributes.energy.modify_value(-1);
      //this.attributes.hull_integrity.update_value(1);
      this.attributes.hull_integrity.modify_value(1);
    }
  }

  check_if_hull_critical() {
    console.log('Checking if hull is critical');
    if (this.attributes.hull_integrity.value <= 0) {
      console.log('HULL INTEGRITY CRITICAL!');
      //this.attributes.minerals.update_value()
      //this.attributes.minerals.set_value(0);
      this.attributes.minerals.modify_value(0, true);
      //this.attributes.energy.set_value(0);
      this.attributes.energy.modify_value(0, true);
      //this.attributes.hull_integrity.set_value(1);
    }
  }

  gather_space_debris() {
    console.log('test: gathering space debris');
    if (this.attributes.energy.value > 0.1) {
      /*
      this.attributes.energy._value -= 0.1;
      this.attributes.minerals._value += 1;
      this.attributes.energy.update_html();
      this.attributes.minerals.update_html();
      */
      this.attributes.energy.modify_value(0.1);
      this.attributes.minerals.modify_value(1);
    }
  }

  charge_energy() {
    //this.attributes.energy._value += 1;
    //this.attributes.energy.update_value(1);
    //this.attributes.energy.update_html();
    this.attributes.energy.modify_value(0.1);
  }

  tick() {

    console.log('hull test...');
    console.log(this.attributes.hull_integrity);
    // Player gains energy every tick
    //this.attributes.energy._value += 0.01;
    //this.attributes.energy.update_value(0.01);
    this.attributes.energy.modify_value(0.01);


    // Collide with space debris random event;
    if (Math.random() < 0.05) {
      console.log('Triggering space collision passive event');
      Game.write('Colliding with space debris');
      //this.attributes.minerals.value += 10;
      //this.attributes.minerals.update_value(10);
      this.attributes.minerals.modify_value(10);
      
      //this.attributes.minerals.update_html();
      //this.attributes.hull_integrity._value -= 1;
      if (Math.random() < 0.3) {
        //this.attributes.hull_integrity.update_value(-1);
        //this.attributes.hull_integrity.update_html();
        console.log('Decrementing hull value...');
        this.attributes.hull_integrity.modify_value(-1);
      }
    }
  }

}


class PageController {

  static initialize_document() {

    let player_action_div = document.createElement('div');
    player_action_div.setAttribute('id', 'player_actions_div');
    document.body.append(player_action_div);


    let player_info_div = document.createElement('div');
    player_info_div.setAttribute('id', 'player_info_div');
    console.log(document.body);
    document.body.append(player_info_div);


    let game_messages_div = document.createElement('div');
    game_messages_div.setAttribute('id', 'game_messages_div');
    console.log(`Game messages div: ${game_messages_div}`)
    document.body.append(game_messages_div);
    console.log(game_messages_div);


  }

  static update_document() {
    console.log('updating document');

    // Attributes
    Object.values(Game.player.attributes).forEach(function(attribute) {

      attribute.tick();
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
    //this.epoch_seconds._value += 1;
    //this.epoch_seconds.update_value(1);
    this.epoch_seconds.modify_value(1);
    console.log(`Epoch seconds: ${this.epoch_seconds.value}`);
    this.epoch_seconds.tick();
  }
}


class Game {
  static page_controller = PageController;

  static write(message) {
    /*
    let element = document.getElementById(element_id);
    try {
      if (!element) {
        console.log('Creating new element for DocumentNode');
        element = document.createElement(this.element_type);
        this.parent.appendChild(element);
        console.log(`Setting element id to ${this.element_id}`);
        element.setAttribute('id', this.element_id);
        element.innerHTML = this.inner_html;
        if (linebreak) {
          let br = document.createElement('br');
          this.parent.appendChild(br);
        }
        console.log('Checking element action');
        console.log(this);
        console.log(this.action);
        if (this.action != null) {
          console.log('Adding action to element');
          element.onclick = this.action;
        }
      }
    }
    */

    let element = document.createElement('p');
    element.innerHTML = String(message);

    let parent = document.getElementById('game_messages_div');
    if (parent.children.length >= 3) {
      let earliest_message = parent.children[0];
      parent.removeChild(earliest_message);
    }

    parent.appendChild(element);
    

  }
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