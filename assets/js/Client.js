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
    getVisibleBySpecialist: function (specialist) {
        var allClients = Client.getAll();
        var visibleClients = Client.getByStatus(0, allClients);
        var clients = Client.getBySpecialist(specialist, visibleClients);

        return clients;
    },
    getLastNumber: function () {
        var clients = Client.getAll();

        var clientsNumbers = clients.sort(function (a, b) {
            return b.number - a.number;
        });

        if (0 === (clientsNumbers || []).length) {
            return 0;
        } else {
            return clientsNumbers[0].number;
        }
    },
    getLastRow: function () {
        var clients = Client.getAll();

        var clientsByRows = Client.orderByRow(clients);

        if (0 === clientsByRows.length) {
            return 0;
        } else {
            return clientsByRows[0].row;
        }
    },
    set: function (clients) {
        Storage.setItem('clients', clients);
        return;
    },
    create: function (specialist) {
        var clients = Client.getAll();

        var lastNumber = Client.getLastNumber();
        var lastRow = Client.getLastRow();

        /// Create client object
        var client = {
            id: id(),
            number: lastNumber + 1,
            status: 0,
            row: lastRow + 1,
            specialist: parseInt(specialist),
            registered_at: (new Date()).getTime(),
            serviced_at: null
        }

        clients.push(client);
        Client.set(clients);
    },
    orderBySpecialistAndRow: function (clients) {
        /// Order clients by specialist first then row

        clients.sort(function (a, b) {
            return a.specialist - b.specialist || a.row - b.row;
        });

        return clients;
    },
    orderByRow: function (clients, asc = true) {
        return clients.sort(function (a, b) {
            if (asc) {
                return b.row - a.row;
            } else {
                return a.row - b.row;
            }
        });
    },
    findIndex: function (client) {
        var allClients = Client.getVisibleBySpecialist(client.specialist);

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
    clientInRow: function (client, clients = null) {
        var allClients;

        if (null !== clients) {
            allClients = clients;
        } else {
            allClients = Client.getBySpecialist(client.specialist, Client.getByStatus(0));
        }

        var clientInRow = allClients.findIndex(function (item) {
            return item.id == client.id
        });

        return clientInRow;
    },
    averageWaitingTime: null,
    calculateAverageWaitingTime: function () {
        function calc() {
            var clients = Client.getByStatus(1);

            if (0 === clients.length) {
                return null;
            }

            var durations = [];

            for (let i in clients) {
                durations.push(clients[i].serviced_at - clients[i].registered_at);
            }

            var sum = durations.reduce(function (previous, current) {
                return current += previous
            });
            var avg = sum / clients.length;
            var average = avg;

            Client.averageWaitingTime = average;
        }

        calc();

        setInterval(calc, 5*1000);
    },
    approximateWaitingTime: function (client) {
        var averageWaitingTime = Client.averageWaitingTime;
        if(null === averageWaitingTime) {
            return 'N/A';
        }

        if(0 >= averageWaitingTime) {
            return 'Soon';
        }

        var numberInRow = Client.clientInRow(client);
        var seconds = averageWaitingTime * numberInRow;

        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        var displayHours = ("0" + hours).slice(-2);
        var displayMinutes = ("0" + Math.floor(minutes - hours * 60)).slice(-2);
        var displaySeconds = ("0" + Math.round(seconds - minutes * 60)).slice(-2);

        var result = '';
        result += displayHours + ":";
        result += displayMinutes + ":";
        result += displaySeconds;

        return result;
    }
}

Client.calculateAverageWaitingTime();