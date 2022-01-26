// Constructor

$(async () => {
    await getProjects();
    await getPayments();
});

// Generate data to table of projects

const projectsTable = $("#proyectos").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "nameProject"
        },
        {
            data: "deliverydate"
        },
        {
            data: "nameStatus"
        },
    ],
});

// Generate data to table of payments

const paymentsTable = $("#pagos").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "nameProject"
        },
        {
            data: "datepay"
        },
        {
            data: "amount",
            render: function (data, type, row) {
                return `$${parseInt(row.amount).toLocaleString("de-DE")}`
            }
        },
    ],
});

// Request to get projects

getProjects = async () => {
    try {
        let idWorker = $("#invisible").val();

        const dataRaw = await fetch(`../api/projects/${idWorker}/projectsAndStatus`) // Data en bruto
        if (dataRaw.status == 200) {
            const data = await dataRaw.json();
            projectsTable.clear();
            projectsTable.rows.add(data);
            projectsTable.draw();
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener proyectos",
            icon: "error",
            text: error,
        });
    }
};

// Request to get payments

getPayments = async () => {
    try {
        let idWorker = $("#invisible").val();
        const dataRaw = await fetch(`../api/payments/${idWorker}/payments`) // Data en bruto
        if (dataRaw.status == 200) {    
            const data = await dataRaw.json();
            paymentsTable.clear();
            paymentsTable.rows.add(data);
            paymentsTable.draw();
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener pagos",
            icon: "error",
            text: "error al obtener los pagos",
        });
    }
};