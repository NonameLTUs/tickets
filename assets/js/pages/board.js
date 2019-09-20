$(function() {
    loadClients();

    function loadClients() {
        /// Load clients from localStorage
        var clients = Client.orderBySpecialistAndNumber(Client.getByStatus(0));

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
                    "<td class='align-middle'>" + client.number + "</td>" +
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