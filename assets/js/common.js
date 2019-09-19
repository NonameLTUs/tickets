function distinct (array) {
      function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
      }

      var unique = array.filter(onlyUnique);

      return unique;
}