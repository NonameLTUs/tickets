$(function () {

    $("form[data-name='chooseSpecialist']").submit(function (e) {
        e.preventDefault();
        onSubmit();
    });
    $(document).on('click', "button[data-action='loadClientData']", onSubmit);
    $(document).on('click', "button[data-action='delayClient']", delayClient);
    $(document).on('click', "button[data-action='cancelClient']", cancelClient);

    $('#number').focus();

    updateDOM(null, null, null, null);

    var updateDataInterval;
    var client = null;
    var number = null;
    var alert = {};

    function onSubmit() {
        number = $('#number').val();
        
        clearInterval(updateDataInterval);

        var seconds = 5;
        updateDataInterval = setInterval(function () { 
            loadClientData(number);
         }, seconds*1000);
        
        var loadClientDataCallback = loadClientData(number);

        /// If user not found, clear interval
        if (!loadClientDataCallback) {
            clearInterval(updateDataInterval);
        }
    }

    function loadClientData (number) {
        client = Client.findByNumber(number);

        if("undefined" === typeof client) {
            updateDOM(null, null, null, null);
            updateAlert('show', 'Atsiprašome, tačiau klientas su nurodytu numeriu nėra užregistruotas!', 'danger');
            return false;
        }

        var clientInRow = Client.clientInRow(client);
        var lastRow = Client.lastRow(client);
        var approximateWaitingTime = Client.approximateWaitingTime(client);

        updateDOM(client.status, clientInRow, lastRow, approximateWaitingTime);

        return true;
    }

    function delayClient () {
        Client.updateRow(client, "down");
        loadClientData(number);
    }

    function cancelClient () {
        Client.updateRow(client, "remove");

        var newClient = Object.assign({}, client);
        newClient.status = 2; // Cancelled status
        
        Client.update(client, newClient);

        loadClientData(number);
    }

    function updateAlert(action, content = null, type = null) {
        var selector = $("[data-name='alert']");

        if ("hide" === action) {
            selector.hide();
        }
        if ("show" === action) {
            selector.show();
        }

        if(null !== content) {
            alert.content = content;
            selector.html(content);
        }
        if (null !== type) {
            selector.removeClass("alert-" + alert.type);
            alert.type = type;
            selector.addClass("alert-" + type)
        }
    }

    function updateDOM(status, clientInRow, lastRow, approximateWaitingTime) {
        updateAlert('hide');
        $("[data-name='num-in-que']").hide();
        $("[data-name='approximate-waiting-time']").hide();
        $("[data-name='button-delay']").hide();
        $("[data-name='button-cancel']").hide();
    
        if (0 == status && 0 == clientInRow) {
            updateAlert('show', 'Jūsų eilė eiti!', 'primary');
            return;
        }
        if (1 == status) {
            updateAlert('show', 'Jūs jau buvote aptarnautas!', 'success');
            return;
        }
        if (2 == status) {
            updateAlert('show', 'Jūsų vizitas buvo atšauktas!', 'danger');
            return;
        }
        if (null === clientInRow || null === approximateWaitingTime) {
            return;
        }
        if (0 === clientInRow) {
            $("[data-name='yourTurnAlert']").show();
            return;
        }
        if (0 !== clientInRow && clientInRow < lastRow) {
            $("[data-name='button-delay']").show();
        }
        if (0 !== clientInRow) {
            $("[data-name='button-cancel']").show();
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