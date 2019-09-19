$(function () {
    /// Events
    $(document).on('click', "[data-action='loadDefaultClients']", loadDefaultClients);
    $(document).on('click', "[data-action='createClient']", createClient);

    function loadDefaultClients () {
            var url = "http://localhost/nfq/back/index.php?endpoint=getClients";
            $.ajax({
                    method: "GET",
                    url: url
                })
                .done(function (response) {
                    if(null !== response.error) {
                        alert(response.error);
                    } else {
                        Storage.setItem('clients', response.result);
                    }
                });
    }

    function createClient() {
        var specialist = $("select[name='specialist']").val();

        var allClients = Storage.getItem('clients');
        var allClientsNumbers = allClients.sort(function (a, b) { return b.id - a.id });

        var lastNumber;
        if(0 === (allClientsNumbers || []).length) {
            lastNumber = 1;
        } else {
            lastNumber = allClientsNumbers[0].id;
        }

        /// Create client object
        var client = {
            id: lastNumber + 1,
            status: 0,
            specialist: parseInt(specialist)
        }

        allClients.push(client);
        Storage.setItem('clients', allClients);
    }
});