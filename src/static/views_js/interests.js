$(() => {
    getInterests();
});

$(document).on({
    ajaxStart: function () {
        $("body").addClass("loading");
    },
    ajaxStop: function () {
        $("body").removeClass("loading");
    },
});

var id = "";
var isEdit = false;

const tabla = $("#interests-table").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "name",
        },
        {
            data: "area",
        },
        {
            data: "percentage",
            render: function (data, type, row) {
                return `${parseInt(row.percentage)}%`;
            },
        },
        {
            defaultContent: `<button type='button' name='editButton' class='btn btn-info'>
									Editar
									<i class="fas fa-edit"></i>
								</button>`,
        },
        {
            defaultContent: `<button type='button' name='deleteButton' class='btn btn-danger'>
									Eliminar
									<i class="fas fa-trash-alt"></i>
								</button>`,
        },
    ],
});

addErrorStyle = (errors) => {
    let arrayErrores = Object.keys(errors);
    arrayErrores.map((err) => {
        $(`.${err}`).show();
    });
};

getInterests = async () => {
    try {
        const dataRaw = await fetch(`./api/interests`);
        if (dataRaw.status === 200) {
            const data = await dataRaw.json();
            tabla.clear();
            tabla.rows.add(data);
            tabla.draw();
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener intereses",
            icon: "error",
            text: error,
        });
    }
};

$("#interests-table").on("click", "button", function () {
    let data = tabla.row($(this).parents("tr")).data();
    if ($(this)[0].name == "deleteButton") {
        swal({
            title: `Eliminar interés`,
            icon: "warning",
            text: `¿Está seguro/a de eliminar el interés "${data.name}"?`,
            buttons: {
                confirm: {
                    text: "Eliminar",
                    value: "exec",
                },
                cancel: {
                    text: "Cancelar",
                    value: "cancelar",
                    visible: true,
                },
            },
        }).then((action) => {
            if (action == "exec") {
                deleteInterest(data.idInterest);
            } else {
                swal.close();
            }
        });
    } else {
        id = data.idInterest;
        isEdit = true;
        cleanInput();
        $("#interestName").val(data.name);
        $("#interestArea").val(data.area);
        $("#interestPercentage").val(data.percentage);
        $("#modifyInterest").modal("show");
    }
});

addNewInterest = async () => {
    try {
        let data = {
            interestName: $("#interestName").val(),
            interestArea: $("#interestArea").val(),
            interestPercentage: $("#interestPercentage").val(),
        };

        Object.keys(data).map((d) => $(`.${d}`).hide());

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${encodeURIComponent(JSON.stringify(data))}`,
        };

        const rawResponse = await fetch(
            `./api/interests/newInterest`,
            config
        );

        if (rawResponse.status === 201) {
            const { msg } = await rawResponse.json();
            swal({
                title: "Éxito!",
                icon: "success",
                text: msg,
                button: "OK",
            })
            .then(() => {
                cleanInput();
            });
        } else {
            const { errors, msg } = await rawResponse.json();
            addErrorStyle(errors);
            swal({
                title: "Error",
                icon: "error",
                text: msg,
            });
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición",
        });
    }
};

deleteInterest = async (id) => {
    try {
        let data = {
            id,
        };

        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${encodeURIComponent(JSON.stringify(data))}`,
        };

        const rawResponse = await fetch(
            `./api/interests/deleteInterest`,
            config
        );

        if (rawResponse.status === 200) {
            const { msg } = await rawResponse.json();
            swal({
                title: "Éxito!",
                icon: "success",
                text: msg,
                button: "OK",
            }).then(() => {
                tabla.rows().remove().draw();
                getInterests();
            });
        } else {
            swal({
                title: "Error",
                icon: "error",
                text: "Ocurrió un error al eliminar el interés",
            });
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición",
        });
    }
};

editInterest = async () => {
    try {
        let data = {
            interestName: $("#interestName").val(),
            interestArea: $("#interestArea").val(),
            interestPercentage: $("#interestPercentage").val(),
            id,
        };

        Object.keys(data).map((d) => $(`.${d}`).hide());
        
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `data=${encodeURIComponent(JSON.stringify(data))}`,
        };

        const rawResponse = await fetch(
            `./api/interests/editInterest`,
            config
        );

        if (rawResponse.status === 200) {
            const { msg } = await rawResponse.json();
            swal({
                title: "Éxito!",
                icon: "success",
                text: msg,
                button: "OK",
            }).then(() => {
                $("#modifyInterest").modal("hide");
                tabla.rows().remove().draw();
                getInterests();
            });
        } else {
            const { errors, msg } = await rawResponse.json();
            addErrorStyle(errors);
            swal({
                title: "Error",
                icon: "error",
                text: msg,
            });
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al editar el interés.",
        });
    }
};

$("#modifyInterest").on("hidden.bs.modal", function () {
	$(".interestName").hide();
    $(".interestArea").hide();
    $(".interestPercentage").hide();
});

cleanInput = () => {
    $("#interestName").val("");
    $("#interestArea").val("");
    $("#interestPercentage").val("");
};

$("#btn").on("click", () => {
    addNewInterest();
});

$("#editInterest").on("click", () => {
    if (isEdit) editInterest();
});
