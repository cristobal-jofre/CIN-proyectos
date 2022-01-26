// Constructor

$(() => {
	$("#rut").rut({
		minimumLength: 8,
		validateOn: "change",
	});
	getUsers();
});

var id = '';
var isEdit = false;
var regExp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// Generate data to table of users

const tabla = $("#table-usuario").DataTable({
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
			data: "isActive"
		},
		{
			defaultContent: `<button type='button' name='editButton' class='btn btn-info'>
									Editar
									<i class="fas fa-edit"></i>
								</button>`,
		},
		{
			defaultContent: `<button type='button' name='deleteButton' class='btn btn-danger'>
										Bloquear/Desbloquear
									<i class="fas fa-ban"></i>
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

// Request to get users

getUsers = async () => {
	try {
		const dataRaw = await fetch(`./api/user/users`);
		if (dataRaw.status === 200) {
			const users = await dataRaw.json();
			let data = users.map((u) => {
				if (u.isActive == 1) {
					u.isActive = "Activo";
				} else {
					u.isActive = "Bloqueado";
				}
				return u;
			});
			tabla.clear();
			tabla.rows.add(data);
			tabla.draw();
		} else {
			throw new Error("Error al obtener los datos");
		}
	} catch (error) {
		swal({
			title: "Obtener usuarios",
			icon: "error",
			text: error,
		});
	}
};

// Button that show modal that verify block the user 

$("#table-usuario").on("click", "button", function () {
	let data = tabla.row($(this).parents("tr")).data();
	if ($(this)[0].name == "deleteButton") {
		swal({
			title: `Bloquear/Desbloquear usuario`,
			icon: "warning",
			text: `¿Está seguro/a de Bloquear/Desbloquear al usuario: "${data.name}"?`,
			buttons: {
				confirm: {
					text: "Bloquear/Desbloquear",
					value: "exec",
				},
				cancel: {
					text: "Cancelar",
					value: "cancelar",
					visible: true,
				},
			},
		})
			.then((action) => {
				if (action == "exec") {
					bloquearDesbloquearUser(data.userId);
				} else {
					swal.close();
				}
			});
	} else {
		id = data.userId;
		isEdit = true;
		cleanInput();
		$("#titulo").text("Modificar usuario");
		$("#passdiv").hide();
		$("#name").val(data.name);
		$("#rut").val(data.rut);
		$("#email").val(data.email);
		$("#agregarUser").modal("show");
	}
});

// Request to block/unblock user

bloquearDesbloquearUser = async (id) => {
	try {
		let data = {
			id
		};

		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `data=${encodeURIComponent(JSON.stringify(data))}`,
		};

		const rawResponse = await fetch(`./api/user/changeState`, config);

		if (rawResponse.status === 200) {
			const { msg } = await rawResponse.json();
			swal({
				title: "Éxito!",
				icon: "success",
				text: msg,
				button: "OK",
			})
				.then(() => {
					tabla.rows().remove().draw();
					getUsers();
				});
		} else {
			swal({
				title: "Error",
				icon: "error",
				text: "Ocurrio un error al cambiar el estado del usuario."
			});
		}
	} catch (error) {
		swal({
			title: "Error",
			icon: "error",
			text: "Ocurrio un error al realizar la petición"
		});
	}
};

// Request to edit user

editUser = async () => {
	try {
		let data = {
			name: $("#name").val(),
			rut: $("#rut").val(),
			email: $("#email").val(),
			id
		};

		$('.rut_valid').hide();
		$('.email_valid').hide();

		if ($.validateRut(data.rut) && regExp.test(data.email)) {

			Object.keys(data).map((d) => $(`.${d}`).hide());

			const config = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `data=${encodeURIComponent(JSON.stringify(data))}`,
			};

			const rawResponse = await fetch(`./api/user/editUser`, config);

			if (rawResponse.status === 200) {
				const { msg } = await rawResponse.json();
				swal({
					title: "Éxito!",
					icon: "success",
					text: msg,
					button: "OK",
				})
					.then(() => {
						$("#agregarUser").modal("hide");
						tabla.rows().remove().draw();
						getUsers();
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
			text: "Ocurrio un error al editar el usuario."
		});
	}
}

// Request to register user

registerUser = async () => {
	try {
		let data = {
			name: $("#name").val(),
			rut: $("#rut").val(),
			email: $("#email").val(),
			password: $("#passwd").val()
		};

		$('.rut_valid').hide();
		$('.email_valid').hide();

		if ($.validateRut(data.rut) && regExp.test(data.email)) {

			Object.keys(data).map((d) => $(`.${d}`).hide());
			$(".passwd").hide();

			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `data=${encodeURIComponent(JSON.stringify(data))}`,
			};

			const rawResponse = await fetch(`./api/user/newUser`, config);

			if (rawResponse.status === 201) {
				const { msg } = await rawResponse.json();
				swal({
					title: "Éxito!",
					icon: "success",
					text: msg,
					button: "OK",
				})
					.then(() => {
						$("#agregarUser").modal("hide");
						tabla.rows().remove().draw();
						getUsers();
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

// Function that clean inputs

cleanInput = () => {
	$("#titulo").text("Agregar Usuario");
	$("#passdiv").show();
	$("#rut").prop("disabled", false);

	$("#name").val("");
	$("#rut").val("");
	$("#email").val("");
	$("#passwd").val("");

	$(`.name`).hide();
	$(`.rut`).hide();
	$(`.email`).hide();
	$(`.passwd`).hide();
	$('.rut_valid').hide();
	$('.email_valid').hide();
};

// Button that show modal from add user

$("#btn").on("click", () => {
	cleanInput();
	$("#agregarUser").modal("show");
});

// Button that do request to add user

$("#addUser").on("click", () => {
	if (isEdit) editUser();
	else registerUser();
});