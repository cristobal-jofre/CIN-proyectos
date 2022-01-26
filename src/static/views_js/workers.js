// Constructor

$(() => {
	$("#rutWorker").rut({
		minimumLength: 8,
		validateOn: "change",
	});
	getWorkers();
});

$(document).on({
	ajaxStart: function () {
		$("body").addClass("loading");
	},
	ajaxStop: function () {
		$("body").removeClass("loading");
	},
});

var id = '';
var isEdit = false;
var regExp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const tabla = $("#table-workers").DataTable({
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
		{
			defaultContent: `<button type='button' name='detailsButton' class='btn btn-info'>
									Detalles
									<i class="fas fa-align-justify"></i>
								</button>`,
		},
		{
			defaultContent: `<button type='button' name='editButton' class='btn btn-info'>
									Editar
									<i class="fas fa-align-justify"></i>
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

// Request to get workers

getWorkers = async () => {
	try {
		const dataRaw = await fetch(`./api/workers`);
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
			title: "Obtener trabajadores",
			icon: "error",
			text: error,
		});
	}
};

// Function to interact with buttons from the table

$("#table-workers").on("click", "button", function () {
	let data = tabla.row($(this).parents("tr")).data();
	if ($(this)[0].name == "detailsButton") {
		window.open(`detailsWorker/${data.idWorker}`, '_self');
	} else {
		id = data.idWorker;
		isEdit = true;
		cleanInput();
		$("#titulo").text("Modificar trabajador");
		$("#nameWorker").val(data.name);
		$("#rutWorker").val(data.rut);
		$("#emailWorker").val(data.email);
		$("#agregarWorker").modal("show");
	}
});

editWorker = async () => {
	try {
		let data = {
			rut: $("#rutWorker").val(),
			email: $("#emailWorker").val(),
			name: $("#nameWorker").val(),
			id
		};

		$('.rut_valid').hide();
		$('.email_valid').hide();

		if (data.name != "") {
			$(".name").hide();
		}

		if ($.validateRut(data.rut) && regExp.test(data.email)) {

			Object.keys(data).map((d) => $(`.${d}`).hide());

			const config = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `data=${encodeURIComponent(JSON.stringify(data))}`,
			};

			const rawResponse = await fetch(`./api/workers/editWorker`, config);

			if (rawResponse.status === 200) {
				const { msg } = await rawResponse.json();
				swal({
					title: "Éxito!",
					icon: "success",
					text: msg,
					button: "OK",
				})
					.then(() => {
						$("#agregarWorker").modal("hide");
						tabla.rows().remove().draw();
						getWorkers();
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
		} else {
			if (!$.validateRut(data.rut)) $('.rut_valid').show();
			if (!regExp.test(data.email)) $('.email_valid').show();
			swal({
				title: "Error",
				icon: "error",
				text: "El rut o email ingresado es o no son validos."
			});
		}
	} catch (error) {
		swal({
			title: "Error",
			icon: "error",
			text: "Ocurrió un error al editar el trabajador."
		});
	}
}

registerWorker = async () => {
	try {
		let data = {
			rut: $("#rutWorker").val(),
			email: $("#emailWorker").val(),
			name: $("#nameWorker").val(),
		};

		$('.rut_valid').hide();
		$('.email_valid').hide();

		if (data.name != "") {
			$(".name").hide();
		}

		if ($.validateRut(data.rut) && regExp.test(data.email)) {

			Object.keys(data).map((d) => $(`.${d}`).hide());

			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `data=${encodeURIComponent(JSON.stringify(data))}`,
			};

			const rawResponse = await fetch(`./api/workers/newWorker`, config);

			if (rawResponse.status === 201) {
				const { msg } = await rawResponse.json();
				swal({
					title: "Éxito!",
					icon: "success",
					text: msg,
					button: "OK",
				})
					.then(() => {
						$("#agregarWorker").modal("hide");
						tabla.rows().remove().draw();
						getWorkers();
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
		} else {
			if (!$.validateRut(data.rut)) $('.rut_valid').show();
			if (!regExp.test(data.email)) $('.email_valid').show();
			swal({
				title: "Error",
				icon: "error",
				text: "El rut o email ingresado es o no son validos."
			});
		}
	} catch (error) {
		swal({
			title: "Error",
			icon: "error",
			text: "Ocurrio un error al registrar el usuario."
		});
	}
};

cleanInput = () => {
	$("#titulo").text("Agregar trabajador");
	$("#rutWorker").prop("disabled", false);


	$("#rutWorker").val("");
	$("#nameWorker").val("");
	$("#emailWorker").val("");

	$(`.name`).hide();
	$(`.rut`).hide();
	$(`.email`).hide();
	$('.rut_valid').hide();
	$('.email_valid').hide();
};

$("#btn").on("click", () => {
	cleanInput();
	$("#agregarWorker").modal("show");
});

$("#addWorker").on("click", () => {
	if (isEdit) editWorker();
	else registerWorker();
});