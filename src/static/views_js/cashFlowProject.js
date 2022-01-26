
$(() => {
    getBillingsByProject();
});

const cashFlowTable = $("#table-cashFlow").DataTable({
    language: {
        url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    columns: [
        {
            data: "fecha"
        },
        {
            data: "grossPay",
            render: function (data, type, row) {
                return `$${parseInt(row.grossPay).toLocaleString("de-DE")}`;
			},
        },
        {
            data: "interestPay",
            render: function (data, type, row) {
                return `$${parseInt(row.interestPay).toLocaleString("de-DE")}`;
			},
        },
        {
            data: "salaryPay",
            render: function (data, type, row) {
                return `$${parseInt(row.salaryPay).toLocaleString("de-DE")}`;
            },
        },
        {
            data: "expenses",
            render: function (data, type, row) {
                return `$${parseInt(row.expenses).toLocaleString("de-DE")}`;
            },
        },
        {
            data: "totalexpenses",
            render: function (data, type, row) {
                return `$${parseInt(row.totalexpenses).toLocaleString("de-DE")}`;
            },
        },
    ],
});

addErrorStyle = (errors) => {
    let arrayErrores = Object.keys(errors);
    arrayErrores.map((err) => {
        $(`.${err}`).show();
    });
};

getBillingsByProject = async () => {
    try {
        let id = $("#invisible").val();
        const dataRaw = await fetch(`../api/cashFlow/${id}/billings`);
        if (dataRaw.status === 200) {
            const data = await dataRaw.json();
            data.map(billing => {
                $("#billings").append(`<option id=${billing.idBilling}>${billing.label}</option>`)
            });
        } else {
            throw new Error("Error al obtener los datos");
        }
    } catch (error) {
        swal({
            title: "Obtener facturaciones",
            icon: "error",
            text: error,
        });
    }
};

getBillings = async (id) => {
	try {
        if (id == 0) {
            cashFlowTable.clear();
            cashFlowTable.rows.add([]);
            cashFlowTable.draw();
        } else {
            const dataRaw = await fetch(`../api/cashFlow/${id}`);
            if (dataRaw.status === 200) {
                const data = await dataRaw.json();
                cashFlowTable.clear();
                cashFlowTable.rows.add(data);
                cashFlowTable.draw();
            } else {
                throw new Error("Error al obtener los datos");
            }
        }
	} catch (error) {
		swal({
            title: "Obtener facturaciones",
			icon: "error",
			text: error,
		});
	}
};

$("#billings").on("change", async () => {
    await getBillings($("#billings option:selected").attr("id"));
});