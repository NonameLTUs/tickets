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
            for (var i in clients) {
                var client = clients[i];

                var template = (
                    "<tr data-id='" + client.id + "'>" +
                    "<td class='align-middle'>" + client.specialist + "</td>" +
                    "<td class='align-middle'>" + client.id + "</td>" +
                    "</tr>"
                );

                $("table[data-name='clients-list'] tbody").append(template);
            }
        }
    }
});