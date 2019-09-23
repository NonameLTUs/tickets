$(function () {

    $("form[data-name='chooseSpecialist']").submit(function (e) {
        e.preventDefault();
        onSubmit();
    });
    $(document).on('click', "button[data-action='loadClientData']", onSubmit);

    $('#number').focus();

    updateDOM(null, null);

    var updateDataInterval;

    function onSubmit() {
        var number = $('#number').val();
        
        clearInterval(updateDataInterval);

        var seconds = 5;
        updateDataInterval = setInterval(function () { return loadClientData(number) }, seconds*1000);
        
        loadClientData(number);
    }

    function loadClientData (number) {
        var client = Client.findByNumber(number);

        if("undefined" === typeof client) {
            updateDOM(null, null, null);
            alert('Klientas nerastas!');
            return;
        }

        var clientInRow = Client.clientInRow(client);
        var approximateWaitingTime = Client.approximateWaitingTime(client);

        updateDOM(client.status, clientInRow, approximateWaitingTime);
    }

    function updateDOM(status, clientInRow, approximateWaitingTime) {
        $("[data-name='yourTurnAlert']").hide();
        $("[data-name='servicedAlert']").hide();
        $("[data-name='num-in-que']").hide();
        $("[data-name='approximate-waiting-time']").hide();
    
        if (0 == status && 0 == clientInRow) {
            $("[data-name='yourTurnAlert']").show();
            return;
        }
        if (1 == status) {
            $("[data-name='servicedAlert']").show();
            return;
        }
        if (null === clientInRow || null === approximateWaitingTime) {
            return;
        }
        if (0 >= clientInRow) {
            $("[data-name='yourTurnAlert']").show();
            return;
        }

        if(null !== clientInRow) {
            $("[data-name='num-in-que']").show();
            $("span[data-name='num']").text(clientInRow);
        }

        if (null !== approximateWaitingTime) {
            $("[data-name='approximate-waiting-time']").show();
            $("span[data-name='time']").text(approximateWaitingTime);
        }
    }
});