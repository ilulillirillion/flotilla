const expected_values = {
  'player_initial_armor_rating': 0,
  'player_initial_storage_capacity': 10,
};


describe('Dev Game test', function() {

  /*
  it('Game ID-value map yields correct armor rating', function() {
    console.log(Game);
    console.log(Game.id_value_map);
    console.log(Game.id_value_map.player_attribute_armor_rating_p);
    expect(Game.id_value_map.player_attribute_armor_rating_p).toBe(`Armor Rating: ${expected_values.player_initial_armor_rating}`);
  })
  */

  

  /*
  it('Game ID-value map yields correct storage capacity', function() {
    expect(Game.id_value_map.player_attribute_storage_capacity_p).toBe(
      `Storage Capacity: ${expected_values.player_initial_storage_capacity}`);
  })
  */

  

})


describe('Dev PageController test', function() {})


//var test_player_attribute = function(attribute, expected value) {
//
//}


describe('Dev Player test', function() {

  /*
  let expected_values = {
    'initial_armor_rating': 0,
    'initial_storage_capacity':  10
  };
  */

  let attribute_tests = {
    'armor_rating': {
      '1': 0,
      '2': 'Armor Rating: 0' },
    'current_energy': {
      '1': 0,
      '2': 'Energy: 0' },
    'energy_capacity': {
      '1': 0,
      '2': 'Energy Capacity: 0' },
    'storage_capacity':  {
      '1': 10,
      '2': 'Storage Capacity: 10' }
  };
  let fakePlayer = new Player();

  for (const [attribute, expected_value] of Object.entries(attribute_tests)) {
    console.log('Testing player attribute');
    console.log(attribute);
    console.log(expected_value);
    it(`Player is initialized with correct ${attribute}`, function() {
      expect(fakePlayer.adjusted_attributes[attribute]).toBe(expected_value['1']);
    });

    it(`Player element-map yields correct ${attribute}`, function() {
      console.log(`Expected value: ${expected_value['2']}`);
      expect(fakePlayer.element_map[`player_attribute_${attribute}_p`]).toBe(expected_value['2']);
    });
  }

  /*
  it('Player is initialized with correct storage capacity', function() {
    //console.log(fakePlayer);
    console.log('Testing player storage capacity');
    console.log(fakePlayer);
    console.log(fakePlayer.storage_capacity);
    expect(fakePlayer.attributes.storage_capacity).toBe(expected_values.player_initial_storage_capacity);
  });
  it('Player is initialized with correct armor rating', function() {
    expect(fakePlayer.attributes.armor_rating).toBe(expected_values.player_initial_armor_rating);
  });
  it('Player is initialized with correct energy capacity', function() {
    expect(fakePlayer.attributes.energy_capacity).toBe(expected_values.player_initial_energy_capacity);
  });
  */



  /*
  it('Player element-map yields correct armor rating', function() {
    expect(fakePlayer.element_map.player_attribute_armor_rating_p).toBe(
      `Armor Rating: ${expected_values.player_initial_armor_rating}`);
  });
  it('Player element-map yields correct storage capacity', function() {
    expect(fakePlayer.element_map.player_attribute_storage_capacity_p).toBe(
      `Storage Capacity: ${expected_values.player_initial_storage_capacity}`);
  });
  it('Player element-map yields correct storage capacity', function() {
    expect(fakePlayer.element_map.player_attribute_energy_capacity_p).toBe(
      `Energy Capacity: ${expected_values.player_initial_energy_capacity}`);
  })
  */


});