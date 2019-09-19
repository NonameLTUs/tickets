$(function () {
    /// Events
    $(document).on('click', "button[data-action='clientServiced']", function() { serviced(this) });
    $(document).on('change', "select[name='specialist']", function() { filterBySpecialist(this) });

    function orderClients(clients) {
        /// Order clients by specialist and number
        clients.sort(function (a, b) {
            return a.specialist - b.specialist || a.id - b.id;
        });

        return clients;
    }

    var allClients = Storage.getItem('clients') || [];
    var visibleClients = orderClients(allClients);
    loadClients();
    updateSpecialistsSelect(allClients);

    function serviced(button) {
        var id = parseInt($(button).attr('data-id'));
        var clients = Storage.getItem('clients');

        /// Get all clients except one with given ID
        allClients = clients.filter(function (client) {
            if(client.id !== parseInt(id)) {
                return client;
            }
        })
        
        Storage.setItem('clients', allClients);

        if (0 === allClients.length) {
            loadClients();
        } else {
            $("tr[data-id='" + id + "']").remove();
        }

        updateSpecialistsSelect(allClients);
    }

    function loadClients() {
        /// Show message if waiting line is empty
        if (0 === Object.keys(visibleClients).length) {
            if(!$('.alert').length) {
                $("<div class='alert alert-primary' role='alert'>Empty waiting line</div>").insertBefore("table[data-name='clients-list']");
            }

            $("table[data-name='clients-list']").hide();
        } else {
            $("table[data-name='clients-list']").show();
            $("table[data-name='clients-list'] tbody td").remove();

            for (var i in visibleClients) {
                var client = visibleClients[i];

                var template = (
                    "<tr data-id='" + client.id + "'>" +
                    "<td class='align-middle'>" + client.specialist + "</td>" +
                    "<td class='align-middle'>" + client.id + "</td>" +
                    "<td><button type='button' class='btn btn-success' data-id='" + client.id + "' data-action='clientServiced'>Serviced</button></td>" +
                    "</tr>"
                );

                $("table[data-name='clients-list'] tbody").append(template);
            }
        }
    }

    /**
     * SPECIALISTS
     */
    function availableSpecialists (clients) {
        var specialists = clients.map(function (client) {
                return client.specialist
            })
            .filter(function (value, index, self) {
                return self.indexOf(value) === index
            })

        return specialists;
    }

    function updateSpecialistsSelect (clients) {
        if(!clients.length) {
            $(".choose-specialist").hide();
        } else {
            $(".choose-specialist").show();
            var specialists = availableSpecialists(clients)
                .sort(function (a, b) { return a - b });

            
            $("select[name='specialist'] option[value!='all']").remove();

            for (let i in specialists) {
                let specialist = specialists[i];

                $("select[name='specialist']").append("<option value='"+specialist+"'>"+specialist+"</option>");
            }
        }
    }

    function filterBySpecialist(select) {
        var specialist = $(select).val();

        if("all" === specialist) {
            visibleClients = orderClients(Storage.getItem('clients'));
        } else {
            visibleClients = orderClients(allClients.filter(function (client) { return client.specialist == specialist }));
        }

        loadClients();
    }
});