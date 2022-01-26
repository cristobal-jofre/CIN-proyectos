let selectWorkers = document.getElementById('workers-selectpicker');

let selectTaxes = document.getElementById('taxes-selectpicker');

$(() => {
    getWorkers();
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

addErrorStyle = (errors) => {
    let arrayErrores = Object.keys(errors);
    arrayErrores.map((err) => {
        $(`.${err}`).show();
    });
};

addClient = async () => {
    try {
        let name = $("#clientName").val();

        const clientRaw = await fetch(`./api/client/${name}/checkIfClientExists`);

        if (clientRaw.status === 200) {
            const exists = await clientRaw.json();

            if (exists[0].count == 0) {
                let data = {
                    clientName: name,
                    contact: $("#clientContact").val()
                };

                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `data=${encodeURIComponent(JSON.stringify(data))}`,
                };

                const rawResponse = await fetch(`./api/client/newClient`, config);

                if (rawResponse.status === 201) {
                    console.log("Entramos con 0");
                    addNewProject();
                } else {
                    const { errors, msg } = await rawResponse.json();
                    addErrorStyle(errors);
                    swal({
                        title: "Error",
                        icon: "error",
                        text: msg
                    });
                }
            } else {
                console.log("Entramos con distinto de cero");
                addNewProject();
            }
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición"
        });
    }
};

addNewProject = async () => {
    try {
        let clientID;
        let clientName = $("#clientName").val();

        const clientsData = await fetch(`./api/client/clients`);

        if (clientsData.status === 200) {
            console.log("Entramos a los clientes");
            const data = await clientsData.json();
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === clientName) {
                    clientID = data[i].idCompany;
                }
            }
        } else {
            throw new Error("Error al obtener los clientes");
        }

        let external = $("#external-select").val();
        let externalY_N;

        if (external === "S") {
            externalY_N = true;
        } else {
            externalY_N = false;
        }

        let data = {
            projectName: $("#projectName").val(),
            external: externalY_N,
            initialBalance: $("#initialBalance").val(),
            deadlineDate: $("#deadlineDate").val(),
            budget: $("#budget").val(),
            idClient: clientID
        };

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `data=${encodeURIComponent(JSON.stringify(data))}`,
        };

        const rawResponse = await fetch(`./api/projects/newProject`, config);

        if (rawResponse.status === 201) {
            addStatusToProject();
        } else {
            const { errors, msg } = await rawResponse.json();
            addErrorStyle(errors);
            swal({
                title: "Error",
                icon: "error",
                text: msg
            });
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición"
        });
    }
};

addStatusToProject = async () => {
    try {
        let projectName = $("#projectName").val();
        let idProject;

        const projectsData = await fetch(`./api/projects/projectsNameAndID`);

        if (projectsData.status === 200) {
            const data = await projectsData.json();
            for (let i = 0; i < data.length; i++) {
                if (data[i].nameProject === projectName) {
                    idProject = data[i].idProject;
                }
            }
        } else {
            throw new Error("Error al obtener los proyectos");
        }

        let currentDate = new Date();
        let datetime = currentDate.getFullYear() + "-" + String(currentDate.getMonth() + 1).padStart(2, '0') + "-"
            + String(currentDate.getDate()).padStart(2, '0') + " " + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":" + currentDate.getSeconds();

        let data = {
            projectID: idProject,
            projectDate: datetime
        };

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `data=${encodeURIComponent(JSON.stringify(data))}`,
        };

        const rawResponse = await fetch(`./api/projects/projectStatus`, config);

        if (rawResponse.status === 201) {
            await addWorkersToProject(idProject, datetime);
            await addInterestsToProject(idProject);
            const { msg } = await rawResponse.json();
            swal({
                title: "Éxito!",
                icon: "success",
                text: msg,
                button: "OK"
            });
        } else {
            const { errors, msg } = await rawResponse.json();
            addErrorStyle(errors);
            swal({
                title: "Error",
                icon: "error",
                text: msg
            });
        }

        cleanInput();

    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición"
        });
    }
};

addWorkersToProject = async (idProject, datetime) => {
    try {
        let workers = $("#workers-selectpicker").val();

        for (let i = 0; i < workers.length; i++) {
            let data = {
                projectID: idProject,
                workerID: workers[i],
                startDate: datetime,
                endDate: $("#deadlineDate").val()
            };

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `data=${encodeURIComponent(JSON.stringify(data))}`,
            };

            const rawResponse = await fetch(`./api/projects/addWorkerToProject`, config);

            if (rawResponse.status === 201) {
                console.log("Trabajador agregado al proyecto exitosamente");
            } else {
                const { errors, msg } = await rawResponse.json();
                addErrorStyle(errors);
                swal({
                    title: "Error",
                    icon: "error",
                    text: msg
                });
            }
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición"
        });
    }
};

addInterestsToProject = async (idProject) => {
    try {
        let taxes = $("#taxes-selectpicker").val();

        for (let i = 0; i < taxes.length; i++) {
            let data = {
                projectID: idProject,
                interestID: taxes[i]
            };

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `data=${encodeURIComponent(JSON.stringify(data))}`,
            };

            const rawResponse = await fetch(`./api/projects/addInterestToProject`, config);

            if (rawResponse.status === 201) {
                console.log("Interés agregado al proyecto exitosamente");
            } else {
                const { errors, msg } = await rawResponse.json();
                addErrorStyle(errors);
                swal({
                    title: "Error",
                    icon: "error",
                    text: msg
                });
            }
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error al realizar la petición"
        });
    }
};

getWorkers = async () => {
    try {
        const workersData = await fetch(`./api/workers`);

        if (workersData.status === 200) {
            const data = await workersData.json();
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].name;
                option.value = data[i].idWorker;
                selectWorkers.add(option);
            }
            $("#workers-selectpicker").selectpicker("refresh");
        } else {
            throw new Error("Error al obtener los trabajadores");
        }
    } catch (error) {
        swal({
            title: "Obtener trabajadores",
            icon: "error",
            text: error,
        });
    }
};

getInterests = async () => {
    try {
        const interestsData = await fetch(`./api/interests`);

        if (interestsData.status === 200) {
            const data = await interestsData.json();
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].name;
                option.value = data[i].idInterest;
                selectTaxes.add(option);
            }
            $("#taxes-selectpicker").selectpicker("refresh");
        } else {
            throw new Error("Error al obtener los intereses");
        }
    } catch (error) {
        swal({
            title: "Obtener intereses",
            icon: "error",
            text: error,
        });
    }
};

checkEmptyField = () => {
    let projectName = $("#projectName").val();
    let clientName = $("#clientName").val();
    let clientContact = $("#clientContact").val();
    let projectBudget = $("#budget").val();
    let initialBalance = $("#initialBalance").val();
    let endDate = $("#deadlineDate").val();
    let external = $("#external-select").val();
    let workers = $("#workers-selectpicker").val();
    let taxes = $("#taxes-selectpicker").val();

    if (projectName && clientName && clientContact && projectBudget && initialBalance
        && endDate && external && workers && taxes) {
        addClient();
    } else {
        const msg = "Hay un/os campo/s en blanco en el formulario";
        swal({
            title: "Error",
            icon: "error",
            text: msg
        });
    }
};

cleanInput = () => {
    $("#projectName").val("");
    $("#clientName").val("");
    $("#clientContact").val("");
    $("#budget").val("");
    $("#initialBalance").val("");
    $("#deadlineDate").val("");
    $("#workers-selectpicker").val('default');
    $("#workers-selectpicker").selectpicker("refresh");
    $("#taxes-selectpicker").val('default');
    $("#taxes-selectpicker").selectpicker("refresh");
};

$("#btn").on("click", () => {
    checkEmptyField();
});