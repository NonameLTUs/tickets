$(function () {
    /// Events
    $(document).on('click', "[data-action='loadDefaultClients']", loadDefaultClients);
    $(document).on('click', "[data-action='createClient']", createClient);

    $("select[name='specialist']").focus();

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
                        Client.set(response.result);
                    }
                })
                .catch(function () {
                    alert('Unable to parse clients data!');
                });
    }

    function createClient() {
        var specialist = $("select[name='specialist']").val();

        var client = Client.create(specialist);
        alert('Client successfully registered! Number: '+ client.number);
    }
});