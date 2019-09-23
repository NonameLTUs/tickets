$(function () {
    var API_URL = "api/index.php";

    /// Events
    $("form[data-name='login-form']").submit(function (e) {
        e.preventDefault();
        login();
    });
    $(document).on('click', "[data-action='loadDefaultClients']", loadDefaultClients);
    $(document).on('click', "[data-action='createClient']", createClient);
    $(document).on('click', "[data-action='login']", login);

    var loggedIn = false;
    var password = "Vardenis";
    var wrongAttempts = Storage.getItem('wrong_attemps') || 0;

    $("select[name='specialist']").focus();
    
    updateDOM();

    function updateAlert(action, content = null, type = null) {
        var selector = $("[data-name='alert']");

        if ("hide" === action) {
            selector.hide();
        }
        if ("show" === action) {
            selector.show();
        }

        if (null !== content) {
            alert.content = content;
            selector.html(content);
        }
        if (null !== type) {
            selector.removeClass("alert-" + alert.type);
            alert.type = type;
            selector.addClass("alert-" + type);
        }
    }

    function login () {
        updateAlert('hide');
        
        if(loggedIn) {
            updateDOM();
            return;
        }

        if($("input[name='password']").val() === password) {
            loggedIn = true;
            updateAlert('show', 'Prisijungėte sėkmingai!', 'success');
            updateDOM();
        } else {
            updateAlert('show', 'Slaptažodis neteisingas!', 'danger');

            wrongAttempts += 1;
            Storage.setItem('wrong_attempts', wrongAttempts);
        }
    }

    function updateDOM () {
        if (loggedIn) {
            $("[data-name='login-form']").hide();
            $("[data-name='restricted']").show();
            if(0 < wrongAttempts) {
                updateAlert('show', wrongAttempts + ' kartą(-us) buvo bandyta prisijungti naudojant netinkamą slaptažodį!', 'danger');
            }
        } else {
            $("[data-name='login-form']").show();
            $("[data-name='restricted']").hide();
        }
    }

    function loadDefaultClients () {
        if(loggedIn) {
            var url = API_URL + "?endpoint=getClients";
            $.ajax({
                    method: "GET",
                    url: url
                })
                .done(function (response) {
                    if(null !== response.error) {
                        updateAlert('show', response.error, 'danger');
                    } else {
                        Client.set(response.result);
                        updateAlert('show', 'Pavyzdiniai duomenys užkrauti sėkmingai!', 'info');
                    }
                })
                .catch(function () {
                    updateAlert('show', 'Nepavyko gauti pavyzdinių duomenų!', 'danger');
                });
        } else {
            updateDOM();
        }
    }

    function createClient() {
        if (loggedIn) {
            var specialist = $("select[name='specialist']").val();

            var client = Client.create(specialist);
            updateAlert('show', 'Klientas sėkmingai pridėtas! Numeris: ' + client.number, 'success');
        } else {
            updateDOM();
        }
    }
});