var Storage = {
    setItem: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
    },
    getItem: function (key) {
        return JSON.parse(localStorage.getItem(key))
    }
}