// Constructor

$(() => {
    $("#rut").rut({
        minimumLength: 8,
        validateOn: "change",
    });
});

addErrorStyle = (errors) => {
    let arrayErrores = Object.keys(errors);
    arrayErrores.map((err) => {
        $(`.${err}`).show();
    });
};

// Request to login

login = async () => {
    let data = {
        rut: $("#rut").val(),
        passwd: $("#passwd").val(),
    };

    Object.keys(data).map((d) => $(`.${d}`).hide());

    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `data=${encodeURIComponent(JSON.stringify(data))}`,
    };

    const rawResponse = await fetch(`./api/auth/login`, config);
    const response = await rawResponse.json();

    if (rawResponse.status === 200) {
        localStorage.setItem("token", response.token);
        swal({
            title: "Inicio de sesión exitoso",
            icon: "success",
            text: response.msg,
        }).then(() => {
            window.open("./home", "_self");
        });

    } else {
        if (response.errors !== undefined)
            addErrorStyle(response.errors);
            
        swal({
            title: "Error al iniciar sesión",
            icon: "error",
            text: response.msg,
        });
    }
};

// Button that do login

$("#btnLogin").on("click", login);
