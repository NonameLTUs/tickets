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

    var allClients = Client.getByStatus(0);
    var visibleClients = orderClients(allClients);

    loadClients();
    updateSpecialistsSelect(allClients);

    function updateServicedUser(client) {
        var updatedClient = Object.assign({}, client);

        updatedClient.status = 1;
        updatedClient.serviced_at = (new Date()).getTime();

        return updatedClient;
    }

    function serviced(button) {
        var id = $(button).attr('data-id');

        var client = Client.findById(id);

        Client.update(client, updateServicedUser(client));
        allClients = Client.getByStatus(0);
        filterBySpecialist();

        $("tr[data-id='" + id + "']").remove();

        if (0 === Object.keys(visibleClients).length) {
            loadClients();
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

            return;
        }
        
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

    function filterBySpecialist(select = null) {
        var specialist;
        if(null === select) {
            specialist = $("select[name = 'specialist']").val();
        } else {
            specialist = $(select).val();
        }

        if(0 < allClients.length) {
            if("all" === specialist) {
                visibleClients = orderClients(allClients);
            } else {
                visibleClients = orderClients(allClients.filter(function (client) { return client.specialist == specialist }));
            }
        } else {
            visibleClients = [];
        }

        loadClients();
    }
});