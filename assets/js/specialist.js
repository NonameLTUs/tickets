$(function () {
    /// Events
    $(document).on('click', 'button.clients-list__button', function() { serviced(this) });
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
            $("li[data-id='" + id + "']").remove();
        }

        updateSpecialistsSelect(allClients);
    }

    function loadClients() {
        /// Show message if waiting line is empty
        if (0 === Object.keys(visibleClients).length) {
            if(!$('.message').length) {
                $("<div class='message'>Empty waiting line</div>").insertBefore(".clients-list");
            }

            $('.clients-list').hide();
        } else {
            $('.clients-list').show();
            $('.clients-list li:not(:first)').remove();

            for (var i in visibleClients) {
                var client = visibleClients[i];

                var template = (
                    "<li data-id='" + client.id + "'>" +
                    "<span class='clients-list__specialist'>" + client.specialist + "</span>" +
                    "<span class='clients-list__number'>" + client.id + "</span>" +
                    "<button type='button' class='clients-list__button' data-id='" + client.id + "'>Serviced</button>" +
                    "</li>"
                );
                $('.clients-list').append(template);
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
            visibleClients = allClients.filter(function (client) { return client.specialist == specialist });
        }

        loadClients();
    }
});