$(function() {
    loadClients();

    function orderClients(clients) {
        /// Order clients by specialist and number
        clients.sort(function (a, b) {
            return a.specialist - b.specialist || a.id - b.id;
        });

        return clients;
    }

    function loadClients() {
        /// Load clients from localStorage
        var clients = orderClients(Storage.getItem('clients') || []);

        /// Show message if waiting line is empty
        if(0 === Object.keys(clients).length) {
            $("<div class='message'>Empty waiting line</div>").insertBefore(".clients-list");
            $('.clients-list').hide();
        } else {
            $('.clients-list').show();

            var touchedSpecialists = [];

            for (var i in clients) {
                touchedSpecialists.push(clients[i].specialist);
            }

            touchedSpecialists = distinct(touchedSpecialists);

            for (var i in clients) {
                var client = clients[i];

                var isHighlighted = touchedSpecialists.indexOf(client.specialist) >= 0;

                var template = (
                    "<tr data-id='" + client.id + "' class='" + (isHighlighted ? 'highlight' : '') + "'>" +
                    "<td class='align-middle'>" + client.specialist + "</td>" +
                    "<td class='align-middle'>" + client.id + "</td>" +
                    "<td class='align-middle'>" + Client.approximateWaitingTime(client) + "</td>" +
                    "</tr>"
                );

                if (isHighlighted) {
                    touchedSpecialists.splice(touchedSpecialists.indexOf(client.specialist), 1);
                }

                $("table[data-name='clients-list'] tbody").append(template);
            }
        }
    }
});