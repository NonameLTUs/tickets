var Client = {
    getAll: function () {
        return Storage.getItem('clients') || [];
    },
    getByStatus: function (status, clients = null) {
        var allClients;
        
        if(null !== clients) {
            allClients = clients;
        } else {
            allClients = Client.getAll();
        }

        var result = allClients.filter(function (client) {
            if(status == client.status) {
                return client
            }
        });

        if("undefined" === typeof result) {
            result = [];
        }

        return result;
    },
    getBySpecialist: function (specialist, clients = null) {
        var allClients;

        if (null !== clients) {
            allClients = clients;
        } else {
            allClients = Client.getAll();
        }

        var filteredClients = allClients.filter(function (client) {
            if (specialist == client.specialist) {
                return client
            }
        });

        filteredClients.sort(function (a, b) {
            return a.id - b.id;
        })

        return filteredClients;
    },
    set: function (clients) {
        Storage.setItem('clients', clients);
        return;
    },
    create: function (specialist) {
        var clients = Client.getAll();
        var clientsNumbers = clients.sort(function (a, b) {
            return b.id - a.id
        });

        var lastNumber;
        if (0 === (clientsNumbers || []).length) {
            lastNumber = 1;
        } else {
            lastNumber = clientsNumbers[0].id;
        }

        /// Create client object
        var client = {
            id: lastNumber + 1,
            status: 0,
            specialist: parseInt(specialist),
            registered_at: (new Date()).getTime(),
            serviced_at: null
        }

        clients.push(client);

        Client.set(clients);
        return;
    },
    findIndex: function (client) {
        var allClients = Client.getAll();

        var indexOfClient = allClients.findIndex(function (object) {
            if(object.id == client.id) {
                return client;
            }
        });
        
        return indexOfClient
    },
    update: function (oldClient, newClient) {
        var clients = Client.getAll();
        var indexOfClient = Client.findIndex(oldClient);

        if(0 > indexOfClient) {
            return "Index not found!";
        }

        clients[indexOfClient] = newClient;

        Client.set(clients);

        return clients;
    },
    findById: function (id) {
        var clients = Client.getAll();

        return clients.find(function (client) {
            if (client.id == id) {
                return client;
            }
        })
    },
    clientInRow: function (client) {
        var clients = Client.getByStatus(0, Client.getBySpecialist(client.specialist));
        
        var clientInRow = clients.findIndex(function (item) {
            return item.id == client.id
        });

        return clientInRow;
    },
    averageWaitingTime: function () {
        var clients = Client.getByStatus(1);
        
        if(0 === clients.length) {
            return null;
        }

        var durations = [];

        for(let i in clients) {
            durations.push(clients[i].serviced_at/1000 - clients[i].registered_at);
        }

        var sum = durations.reduce(function (previous, current) {
            return current += previous
        });
        var avg = sum / clients.length;
        var average = avg;

        return average;
    },
    approximateWaitingTime: function (client) {
        var averageWaitingTime = Client.averageWaitingTime();
        if(null === averageWaitingTime) {
            return 'N/A';
        }

        if(0 >= averageWaitingTime) {
            return 'Soon';
        }

        var numberInRow = Client.clientInRow(client);
        var seconds = averageWaitingTime * numberInRow / 1000;
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        var displayHours = ("0" + hours).slice(-2);
        var displayMinutes = ("0" + Math.floor(minutes - hours * 60)).slice(-2);
        var displaySeconds = ("0" + Math.round(seconds - minutes * 60)).slice(-2);

        var result = '';
        if(0 < hours) {
            result += displayHours + ":";
        }
        result += displayMinutes + ":";
        result += displaySeconds;

        return result;
    }
}