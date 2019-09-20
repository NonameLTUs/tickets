function distinct (array) {
      function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
      }

      var unique = array.filter(onlyUnique);

      return unique;
}

function id () {
    return Math.random().toString(36).substr(2, 9);
}