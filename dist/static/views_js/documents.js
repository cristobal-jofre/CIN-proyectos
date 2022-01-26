$(() => {
    getProjects();
});


getProjects = async () => {
    try {
        const dataRaw = await fetch(`./api/projects`);
        if (dataRaw.status === 200) {
            const data = await dataRaw.json();
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
            text: "Error al obtener los Proyectos",
        });
    }
};

uploadDocument = async () => {
    try {
        const files = $("#file")[0].files;
        const data = {
            idProject: $("#projects option:selected").attr("id"),
            nameProject: $("#projects option:selected").html()
        };

        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('files', files[0]);

        const config = {
            method: 'POST',
            body: formData,
        };

        const rawResponse = await fetch(`./api/documents/upload`, config);

        if (rawResponse.status === 201) {
            swal({
                title: "Éxito!",
                icon: "success",
                text: "Archivo adjuntado exitosamente",
                button: "OK",
            })
                .then(() => {
                    window.open(`detailsProject/${data.idProject}`, '_self');
                });
        } else {
            throw new Error('ocurrio un error al subir el documento');
        }
    } catch (error) {
        swal({
            title: "Error",
            icon: "error",
            text: 'ocurrio un error al subir el documento'
        });
    }
};


$("#btn").on('click', uploadDocument);