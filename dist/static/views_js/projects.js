// Constructor

$(() => {
	getProjects();
	getStatus();
});

var idProject = 0;
var cantTrabajadores = 0;

// Generate data to table of projects

const tabla = $("#table-project").DataTable({
	language: {
		url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
	},
	columns: [
		{
			data: "nameProject",
		},
		{
			data: "balance",
			render: function (data, type, row) {
				return `$${parseInt(row.balance).toLocaleString("de-DE")}`;
			},
		},
		{
			data: "deliverydate",
		},
		{
			data: "estimate",
			render: function (data, type, row) {
				return `$${parseInt(row.estimate).toLocaleString("de-DE")}`;
			},
		},
		{
			data: "status",
		},

		{
			defaultContent: `<button type='button' name='editButton' class='btn btn-info'>
									Detalles
									<i class="fas fa-align-justify"></i>
								</button>`,
		},
		{
			defaultContent: `<button type='button' name='statusButton' class='btn btn-info'>
									Estado
									<i class="fas fa-edit"></i>
								</button>`,
		},
		{
			defaultContent: `<button type='button' name='dataButton' class='btn btn-info'>
									Ver flujo
									<i class="fas fa-chart-line"></i>
								</button>`,
		},
		{
			defaultContent: `<button type='button' name='closeMonthButton' class='btn btn-info'>
									Cerrar mes
									<i class="fas fa-edit"></i>
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

// Request to get projects

getProjects = async () => {
	try {
		const dataRaw = await fetch(`./api/projects`);
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
			title: "Obtener proyectos",
			icon: "error",
			text: error,
		});
	}
};

// Function to interact with buttons from the table

$("#table-project").on("click", "button", function () {
	let data = tabla.row($(this).parents("tr")).data();
	if ($(this)[0].name == "editButton") {
		window.open(`detailsProject/${data.idProject}`, "_self");
	} else if ($(this)[0].name == "dataButton") {
		window.open(`cashFlowProject/${data.idProject}`, "_self");
	} else if ($(this)[0].name == "closeMonthButton") {
		idProject = data.idProject;
		getWorkersByProject();
		$("#closeMonthModal").modal("show");
	} else {
		idProject = data.idProject;
		$("#titulo").text("Modificar estado");
		$(".state").hide();
		$("#statusModal").modal("show");
	}
});

// Request to change state

changeState = async () => {
	try {
		let state = $("#status option:selected").attr("id");

		const data = {
			state,
			idProject,
		};

		Object.keys(data).map((d) => $(`.${d}`).hide());

		const config = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `data=${encodeURIComponent(JSON.stringify(data))}`,
		};

		const dataRaw = await fetch(`./api/status/changeStatus`, config);

		if (dataRaw.status === 201) {
			const { msg } = await dataRaw.json();
			swal({
				title: "Éxito!",
				icon: "success",
				text: msg,
				button: "OK",
			}).then(() => {
				tabla.rows().remove().draw();
				getProjects();
				$("#statusModal").modal("hide");
			});
		} else {
			const { errors } = await dataRaw.json();
			addErrorStyle(errors);
			throw new Error("Error al cambiar el estado");
		}
	} catch (error) {
		swal({
			title: "Cambio de estado",
			icon: "error",
			text: "Error al cambiar el estado",
		});
	}
};

// Request to get status

getStatus = async () => {
	try {
		const dataRaw = await fetch(`./api/status`);
		if (dataRaw.status == 200) {
			const data = await dataRaw.json();
			data.map((status) => {
				$("#status").append(
					`<option id=${status.idStatus}>${status.nameStatus}</option>`
				);
			});
		} else {
			throw new Error("Error al obtener los datos");
		}
	} catch (error) {
		swal({
			title: "Obtener estados",
			icon: "error",
			text: error,
		});
	}
};

// Button that do request to change state

$("#changeStatus").on("click", () => {
	changeState();
});

getWorkersByProject = async () => {
	try {
		const dataRaw = await fetch(`./api/projects/${idProject}/workers`);
		if (dataRaw.status === 200) {
			const data = await dataRaw.json();
			if (data.length > 0) {
				data.map((worker) => {
					addWorkerInView(worker.name, worker.idWorker);
				});
			}
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

addWorkerInView = (nameWorker, id) => {
	cantTrabajadores++;
	$("#divTrabajadores").append(`<div class="row mb-2">
									<div class="col-md-12 col-lg-6 control-label">
										<label for="inputTrabajador${cantTrabajadores}" value="${id}" id="trabajador${cantTrabajadores}">Trabajador ${cantTrabajadores}</label>
										<input type="text" class="form-control" value="${nameWorker}" id="inputTrabajador${cantTrabajadores}" name="inputTrabajador${cantTrabajadores}" disabled>
									</div>
									<div class="col-md-12 col-lg-6 control-label">
										<label for="sueldo${cantTrabajadores}">Sueldo</label>
										<input type="number" class="form-control" id="sueldo${cantTrabajadores}" name="sueldo${cantTrabajadores}" min="1">
										<div class="invalid-feedback sueldo${cantTrabajadores}" style="display: none; color: red">
											Ingrese el sueldo del trabajador porfavor.
										</div>
									</div>
								  </div>`);
};

$("#closeMonthModal").on("hidden.bs.modal", function () {
	cantTrabajadores = 0;
	$("#divTrabajadores").empty();
	$(`.fechai`).hide();
	$(`.fechaf`).hide();
	$(`.gastos`).hide();
	$(`.pago`).hide();
});

saveBilling = async () => {
	let fechaI = $("#fechai").val();
	let fechaF = $("#fechaf").val();
	let pago = $("#pago").val();
	let gastos = $("#gastos").val();

	const workers = [];
	for (let i = 1; i <= cantTrabajadores; i++) {
		let id = parseInt($(`#trabajador${i}`).attr("value"));
		let sueldo = $(`#sueldo${i}`).val();
		$(`.sueldo${i}`).hide();
		const worker = {
			id,
			sueldo,
		};
		workers.push(worker);
	}

	const data = {
		fechaI,
		fechaF,
		pago,
		gastos,
		workers,
		project: idProject,
	};

	Object.keys({
		fechai: fechaI,
		fechaf: fechaF,
		pago,
		gastos,
	}).map((d) => $(`.${d}`).hide());

	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `data=${encodeURIComponent(JSON.stringify(data))}`,
	};

	const rawResponse = await fetch(`./api/projects/saveBilling`, config);

	if (rawResponse.status === 201) {
		const { msg } = await rawResponse.json();
		swal({
			title: "Éxito!",
			icon: "success",
			text: msg,
			button: "OK",
		})
			.then(() => {
				$("#closeMonthModal").modal("hide");
				tabla.rows().remove().draw();
				getProjects();
			});
	} else {
		const { errors, msg } = await rawResponse.json();
		if(errors != undefined){
			addErrorStyle(errors);
		}
		swal({
			title: "Error",
			icon: "error",
			text: msg
		});
	}
};

$("#saveBilling").on("click", saveBilling);
