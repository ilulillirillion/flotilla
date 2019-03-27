

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

  test_player = new Player();

  simple_tests = [
    new SimpleTest(
        'Hull integrity has correct initial value',
        //test_player.attributes.find())
        test_player.attributes.hull_integrity.value,
        0)
  ];

  simple_tests.forEach(function(test) {
    it(test.name, function() {
      expect(test.test_value).toBe(test.expected_value);
    });
  });
});