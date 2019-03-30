

class SimpleTest {
  constructor(
      name,
      test_value,
      expected_value) {
    this.name = name;
    this.test_value = test_value;
    this.expected_value = expected_value;
  }
}




describe('Master Test Suite', function() {


  console.log('TEST2');
  console.log(document.body);
  let test_player = new Player();
  console.log(test_player);
  let test_world = new World();
  console.log(test_world);

  simple_tests = [
      new SimpleTest(
          'Player hull integrity has correct initial value',
          test_player.attributes.hull_integrity.value,
          1),
      new SimpleTest(
          'Player energy has correct initial value',
          test_player.attributes.energy.value,
          0),
      new SimpleTest(
          'World epoch seconds has correct initial value',
          test_world.epoch_seconds.value,
          0)
  ];

  simple_tests.forEach(function(test) {
    it(test.name, function() {
      expect(test.test_value).toBe(test.expected_value);
    });
  });
});