// Constructor 

$(() => {
    getWorkers();
    getDocuments();
});

// Generate data to table of workers

const workersTable = $("#trabajadores").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "rut"
        },
        {
            data: "name"
        },
        {
            data: "email"
        },
    ],
});

// Generate data to table of docuemnts

const documentsTable = $("#documentos").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "dirdoc"
        },
        {
            data: "datedoc"
        },
    ],
});

// Request to get workers

getWorkers = async () => {
    try {
        let idProject = $("#invisible").val();

        const dataRaw = await fetch(`../api/projects/${idProject}/workers`) // Data en bruto
        if (dataRaw.status == 200) {
            const data = await dataRaw.json();
            workersTable.clear();
            workersTable.rows.add(data);
            workersTable.draw();
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener trabajadores",
            icon: "error",
            text: error,
        });
    }
};

// Request to get documents

getDocuments = async () => {
    try {
        let idDocument = $("#invisible").val();

        const dataRaw = await fetch(`../api/projects/${idDocument}/documents`) // Data en bruto
        if (dataRaw.status == 200) {
            const data = await dataRaw.json();
            documentsTable.clear();
            documentsTable.rows.add(data);
            documentsTable.draw();
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener documentos",
            icon: "error",
            text: error,
        });
    }
};