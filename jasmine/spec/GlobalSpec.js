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


describe('Dev Player test', function() {

  /*
  let expected_values = {
    'initial_armor_rating': 0,
    'initial_storage_capcity':  10
  };
  */
  let fakePlayer = new Player();

  it('Player is initialized with correct storage capacity', function() {
    //console.log(fakePlayer);
    expect(fakePlayer.storage_capacity).toBe(expected_values.player_initial_storage_capacity);
  });
  it('Player is initialized with correct armor rating', function() {
    expect(fakePlayer.armor_rating).toBe(expected_values.player_initial_armor_rating);
  });

  it('Player element-map yields correct armor rating', function() {
    expect(fakePlayer.element_map.player_attribute_armor_rating_p).toBe(
      `Armor Rating: ${expected_values.player_initial_armor_rating}`);
  });
  it('Player element-map yields correct storage capacity', function() {
    expect(fakePlayer.element_map.player_attribute_storage_capacity_p).toBe(
      `Storage Capacity: ${expected_values.player_initial_storage_capacity}`);
  });


});