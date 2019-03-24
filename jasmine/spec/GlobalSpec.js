describe('Dev Game test', function() {

  /*
  it('Game ID-value map yields correct armor rating', function() {
    expect(Game.id_value_map.player_attribute_armor_rating).toBe(10);
  })
  */

})


describe('Dev PageController test', function() {})


describe('Dev Player test', function() {

  let expected_values = {
    'initial_armor_rating': 0,
    'initial_storage_capcity':  10
  };
  let fakePlayer = new Player();

  it('Player is initialized with correct storage capacity', function() {
    //console.log(fakePlayer);
    expect(fakePlayer.storage_capacity).toBe(expected_values.initial_storage_capcity);
  });
  it('Player is initialized with correct armor rating', function() {
    expect(fakePlayer.armor_rating).toBe(expected_values.initial_armor_rating);
  });


});