var Client = {
    specialistsList: {
        1: 'Gustas Martynaitis',
        2: 'Aleksandras Malkovas',
        3: 'Margarita Kokosina'
    },
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

        if ("undefined" === typeof clients){
            return 0;
        }

        var clientsNumbers = clients.sort(function (a, b) {
            return b.number - a.number;
        });

        if (0 === (clientsNumbers || []).length) {
            return 0;
        }

        return clientsNumbers[0].number;
    },
    getNthClientsInRow: function (nth, count = 1) {
        var rows = Client.getRows();
        var clients = [];
        var specialists = Object.keys(rows);

        for (let i in specialists) {
            specialist = specialists[i];
            if ((rows[specialist] || []).length) {
                clients.push(rows[specialist].slice(nth, nth + count));
            }
        }

        return clients.flat();
    },
    set: function (clients) {
        Storage.setItem('clients', clients);
    },
    create: function (specialist) {
        var clients = Client.getAll();

        var lastNumber = Client.getLastNumber();

        /// Create client object
        var client = {
            id: id(),
            number: lastNumber + 1,
            status: 0,
            specialist: parseInt(specialist),
            registered_at: (new Date()).getTime(),
            serviced_at: null
        }

        clients.push(client);
        Client.set(clients);

        return client;
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
    findIndex: function (client, clients = null) {
        var allClients;
        if(null === clients) {
            allClients = Client.getAll();
        } else {
            allClients = clients;
         }

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
    getLastServicingTime: function () {
        return Storage.getItem('last_servicing_time');
    },
    updateLastServicingTime: function () {
        Storage.setItem('last_servicing_time', (new Date()).getTime());
        return;
    },
    getRows: function (specialist = null) {
        var rows = Storage.getItem('clients_rows') || {};
        
        if (null === specialist) {
            return rows;
        } else {
            if(rows.hasOwnProperty(specialist)) {
                return rows[specialist];
            } else {
                return [];
            }
        }
    },
    initRows: function () {
        var clients = Client.getByStatus(0);
        var rows = {};

        for(let i in clients) {
            var client = clients[i];
            if(!rows.hasOwnProperty(client.specialist)) {
                rows[client.specialist] = [];
            }

            rows[client.specialist].push(client);
        }

        Storage.setItem('clients_rows', rows);

        return;
    },
    setRows: function (clients, specialist) {
        var rows = Client.getRows();
        rows[specialist] = clients;

        Storage.setItem('clients_rows', rows);
    },
    updateRow: function (client, action) {
        var rows = Client.getRows(client.specialist);

        var index = rows.findIndex(function (row) {
            return row.id === client.id;
        });

        if("remove" === action) {
            if(index > -1) {
                rows.splice(index, 1);
            }
        }

        if("down" === action) {
            if(index > -1) {
                var item = rows.splice(index, 1)[0];
                rows.splice(index + 1, 0, item);
            }
        }

        Client.setRows(rows, client.specialist);
    },
    findById: function (id) {
        var clients = Client.getAll();

        return clients.find(function (client) {
            if (client.id == id) {
                return client;
            }
        })
    },
    findByNumber: function (number) {
        var clients = Client.getAll();

        return clients.find(function (client) {
            if (client.number == number) {
                return client;
            }
        })
    },
    clientInRow: function (client) {
        var rows = Client.getRows(client.specialist);

        var clientInRow = rows.findIndex(function (item) {
            return item.id == client.id
        });

        return clientInRow;
    },
    lastRow: function (client, clients = null) {
        var allClients;

        if (null !== clients) {
            allClients = clients;
        } else {
            allClients = Client.getBySpecialist(client.specialist, Client.getByStatus(0));
        }

        return allClients.length - 1;
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
            var average = sum / clients.length;

            Client.averageWaitingTime = average;
        }

        calc();

        setInterval(calc, 5*1000);
    },
    approximateWaitingTime: function (client) {
        var averageWaitingTime = Client.averageWaitingTime;
        if(null === averageWaitingTime) {
            return 'Skaičiuojama';
        }

        if(0 >= averageWaitingTime) {
            return 'Netrukus';
        }

        var lastServicingTime = Client.getLastServicingTime();
        var currentTime = (new Date).getTime();
        var numberInRow = Client.clientInRow(client);
        var miliseconds = (lastServicingTime + averageWaitingTime * numberInRow) - currentTime;
        var seconds =  miliseconds / 1000;

        if(0 >= miliseconds) {
            var row = Client.getRows(client.specialist).findIndex(function (item) {
                return item.id === client.id
            });
            
            if(row > 0) {
                return 'Netrukus';
            }
            
            return 'Šiuo metu aptarnaujamas';
        }

        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        var displayHours = ("0" + hours).slice(-2);
        var displayMinutes = ("0" + Math.floor(minutes - hours * 60)).slice(-2);
        var displaySeconds = ("0" + Math.floor(seconds - minutes * 60)).slice(-2);

        var result = '';
        result += displayHours + ":";
        result += displayMinutes + ":";
        result += displaySeconds;

        return result;
    }
}

Client.calculateAverageWaitingTime();

if("undefined" === typeof Client.getLastServicingTime()) {
    Client.updateLastServicingTime();
}

if (0 <= Object.keys(Client.getRows()).length) {
    Client.initRows();
}