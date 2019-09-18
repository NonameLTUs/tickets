function loadDefaultClients () {
    $(function () {
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
    })
}