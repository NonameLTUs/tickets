$(function() {
    loadClients();

    function loadClients() {
        /// Load clients from localStorage
        var clients = [
            Client.getNthClientsInRow(0),
            Client.getNthClientsInRow(1, 2)
        ].flat();

        /// Show message if waiting line is empty
        if(0 === Object.keys(clients).length) {
            if (!$('.alert').length) {
                $("<div class='alert alert-primary' role='alert'>Empty waiting line</div>").insertBefore("table[data-name='clients-list']");
            }
            $("table[data-name='clients-list']").hide();
        } else {
            $("table[data-name='clients-list']").show();

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
                    "<td class='align-middle'>" + client.number + "</td>" +
                    "<td class='align-middle' data-name='approximateWaitingTime'>" + Client.approximateWaitingTime(client) + "</td>" +
                    "</tr>"
                );

                if (isHighlighted) {
                    touchedSpecialists.splice(touchedSpecialists.indexOf(client.specialist), 1);
                }

                $("table[data-name='clients-list'] tbody").append(template);
            }
        }
    }

    setInterval(function () {
        var clients = Client.orderBySpecialistAndRow(Client.getByStatus(0));
        
        for (var i in clients) {
            var client = clients[i];
            $("tr[data-id='" + client.id + "'] td[data-name='approximateWaitingTime']").html(Client.approximateWaitingTime(client));
        }
    }, 1000);
});