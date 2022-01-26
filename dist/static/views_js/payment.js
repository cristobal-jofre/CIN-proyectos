// Constructor

$(()=> {
    getWorkers();
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
            data.map(work => {
                $("#workers").append(`<option id=${work.idWorker}>${work.name}</option>`)
            })
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

// Request to get projects

getProjects = async (id) => {
	try {
		const dataRaw = await fetch(`./api/projects/${id}/projects`);
		if (dataRaw.status === 200) {
			const data = await dataRaw.json();
			$("#projects").find('option').remove().end();
            data.map(project => {
                $("#projects").append(`<option id=${project.idProject}>${project.nameProject}</option>`)
            });
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

// Request to register payment

registerPayment = async () => {
	try {
		let data = {
			idWorker: $("#workers option:selected").attr("id"),
			idProject: $("#projects option:selected").attr("id"),
			amount: $("#amount").val(),
		};
		
		$(".workers").hide();
		$(".projects").hide();
		$(".amount").hide();

		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `data=${encodeURIComponent(JSON.stringify(data))}`,
		};

		const rawResponse = await fetch(`./api/payments/newPayment`, config);

		if (rawResponse.status === 201) {
			const { msg } = await rawResponse.json();
			swal({
				title: "Éxito!",
				icon: "success",
				text: msg,
				button: "OK",
			})
			.then(() => {
				window.location.reload();
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
	} catch (error) {
		swal({
			title: "Error",
			icon: "error",
			text: "Ocurrio un error al registrar el pago."
		});
	}
};

// Select that show projects by id from worker

$("#workers").on("change", async () => {
    await getProjects($("#workers option:selected").attr("id"));
});

// Button that do request to register payment

$("#btn").on("click", () => {
	registerPayment();
});