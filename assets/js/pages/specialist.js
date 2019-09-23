$(function () {
    /// Events
    $(document).on('click', "button[data-action='clientServiced']", function() { serviced(this) });
    $(document).on('change', "select[name='specialist']", function() { filterBySpecialist(this) });

    $("select[name='specialist']").focus();

    var allClients;
    var visibleClients;

    loadClientsData();
    loadClients();
    updateSpecialistsSelect(allClients);

    function loadClientsData() {
        allClients = Client.getByStatus(0);
        visibleClients = Client.orderBySpecialistAndRow(allClients);
    }

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
        loadClientsData();
        filterBySpecialist();

        $("tr[data-id='" + id + "']").remove();

        if (0 === Object.keys(visibleClients).length) {
            loadClients();
        }
 
        Client.updateLastServicingTime();
        Client.updateRow(client, "remove");
        updateSpecialistsSelect(allClients);
    }

    function loadClients() {
        /// Show message if waiting line is empty
        if (0 === Object.keys(visibleClients).length) {
            if(!$('.alert').length) {
                $("<div class='alert alert-primary' role='alert'>Klientų nėra</div>").insertBefore("table[data-name='clients-list']");
            }

            $("table[data-name='clients-list']").hide();

            return;
        }
        
        $("table[data-name='clients-list']").show();
        $("table[data-name='clients-list'] tbody td").remove();

        var touchedSpecialists = [];

        for (var i in visibleClients) {
            touchedSpecialists.push(visibleClients[i].specialist);
        }

        touchedSpecialists = distinct(touchedSpecialists);

        for (var i in visibleClients) {
            var client = visibleClients[i];

            var isHighlighted = touchedSpecialists.indexOf(client.specialist) >= 0;

            var servicedButton = '';
            if(isHighlighted) {
                servicedButton = "<button type='button' class='btn btn-success' data-id='" + client.id + "' data-action='clientServiced'>Aptarnautas</button>";
            }

            var template = (
                "<tr data-id='" + client.id + "' class='"+(isHighlighted ? 'highlight' : '')+"'>" +
                "<td class='align-middle'>" + Client.specialistsList[client.specialist] + "</td>" +
                "<td class='align-middle'>" + client.number + "</td>" +
                "<td>" + servicedButton + "</td>" +
                "</tr>"
            );

            if(isHighlighted) {
                touchedSpecialists.splice(touchedSpecialists.indexOf(client.specialist), 1);
            }

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

    function updateSpecialistsSelect(clients) {
        if(!clients.length) {
            $("[data-action='chooseSpecialist']").hide();
        } else {
            $("[data-action='chooseSpecialist']").show();
            var specialists = availableSpecialists(clients).sort(function (a, b) { return a - b });

            
            $("select[name='specialist'] option[value!='all']").remove();

            for (let i in specialists) {
                let specialist = specialists[i];

                $("select[name='specialist']").append("<option value='" + specialist + "'>" + Client.specialistsList[specialist] + "</option>");
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
                visibleClients = Client.orderBySpecialistAndRow(allClients);
            } else {
                visibleClients = Client.orderBySpecialistAndRow(allClients.filter(function (client) {
                    return client.specialist == specialist
                }));
            }
        } else {
            visibleClients = [];
        }

        loadClients();
    }
});