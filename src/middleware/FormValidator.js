import empty from 'is-empty';

const validationFunctions = {};

// Function that validates the inputs from user

export const validateFormUser = validationFunctions.validateFormUser = (payload, method) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.name)) {
            isValid = false;
            errors.name = true;
        }
        if (empty(payload.rut)) {
            isValid = false;
            errors.rut = true;
        }
        if (empty(payload.email)) {
            isValid = false;
            errors.email = true;
        }
        if (method === 'POST') {
            if (empty(payload.password)) {
                isValid = false;
                errors.passwd = true;
            }
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormWorker = validationFunctions.validateFormWorker = (payload, method) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.name)) {
            isValid = false;
            errors.name = true;
        }
        if (empty(payload.rut)) {
            isValid = false;
            errors.rut = true;
        }
        if (empty(payload.email)) {
            isValid = false;
            errors.email = true;
        }

    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormNewWorker = validationFunctions.validateFormNewWorker = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.name)) {
            isValid = false;
            errors.name = true;
        }
        if (empty(payload.rut)) {
            isValid = false;
            errors.rut = true;
        }
        if (empty(payload.email)) {
            isValid = false;
            errors.email = true;
        }

    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormLogin = validationFunctions.validateFormLogin = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    // TODO: validar rut

    if (payload) {
        if (empty(payload.rut)) {
            isValid = false;
            errors.rut = true;
        }
        if (empty(payload.passwd)) {
            isValid = false;
            errors.passwd = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

// Function that validates the inputs from change state of project

export const validateChangeStateProject = validationFunctions.validateChangeStateProject = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (payload.state == '0') {
            isValid = false;
            errors.state = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

// Function that validates the inputs from payments

export const validateFormPayment = validationFunctions.validateFormPayment = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (payload.idWorker == 0) {
            isValid = false;
            errors.workers = true;
        }
        if (payload.idProject == 0) {
            isValid = false;
            errors.projects = true;
        }
        if (empty(payload.amount)) {
            isValid = false;
            errors.amount = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormNewInterest = validationFunctions.validateFormNewInterest = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.interestName)) {
            isValid = false;
            errors.interestName = true;
        }
        if (empty(payload.interestArea)) {
            isValid = false;
            errors.interestArea = true;
        }
        if (empty(payload.interestPercentage)) {
            isValid = false;
            errors.interestPercentage = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormEditInterest = validationFunctions.validateFormEditInterest = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.interestName)) {
            isValid = false;
            errors.interestName = true;
        }
        if (empty(payload.interestArea)) {
            isValid = false;
            errors.interestArea = true;
        }
        if (empty(payload.interestPercentage)) {
            isValid = false;
            errors.interestPercentage = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormNewClient = validationFunctions.validateFormNewClient = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.clientName)) {
            isValid = false;
            errors.clientName = true;
        }
        if (empty(payload.contact)) {
            isValid = false;
            errors.contact = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormNewProject = validationFunctions.validateFormNewProject = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.projectName)) {
            isValid = false;
            errors.projectName = true;
        }
        if (empty(payload.external)) {
            isValid = false;
            errors.external = true;
        }
        if (empty(payload.initialBalance)) {
            isValid = false;
            errors.initialBalance = true;
        }
        if (empty(payload.deadlineDate)) {
            isValid = false;
            errors.deadlineDate = true;
        }
        if (empty(payload.budget)) {
            isValid = false;
            errors.budget = true;
        }
        if (empty(payload.idClient)) {
            isValid = false;
            errors.idClient = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormStatusToProject = validationFunctions.validateFormStatusToProject = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.projectID)) {
            isValid = false;
            errors.projectID = true;
        }
        if (empty(payload.projectDate)) {
            isValid = false;
            errors.projectDate = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormWorkerToProject = validationFunctions.validateFormWorkerToProject = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.projectID)) {
            isValid = false;
            errors.projectID = true;
        }
        if (empty(payload.workerID)) {
            isValid = false;
            errors.workerID = true;
        }
        if (empty(payload.startDate)) {
            isValid = false;
            errors.startDate = true;
        }
        if (empty(payload.endDate)) {
            isValid = false;
            errors.endDate = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormInterestToProject = validationFunctions.validateFormInterestToProject = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.projectID)) {
            isValid = false;
            errors.projectID = true;
        }
        if (empty(payload.interestID)) {
            isValid = false;
            errors.interestID = true;
        }
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export const validateFormBilling = validationFunctions.validateFormBilling = (payload) => {
    let errors = {};
    let isValid = true;
    let msg = 'Corrija los errores del formulario.';

    if (payload) {
        if (empty(payload.fechaI)) {
            isValid = false;
            errors.fechai = true;
        }
        if (empty(payload.fechaF)) {
            isValid = false;
            errors.fechaf = true;
        }

        if (empty(payload.pago) || parseInt(payload.pago) <= 0) {
            isValid = false;
            errors.pago = true;
        }
        if (empty(payload.gastos) || parseInt(payload.pago) < 0) {
            isValid = false;
            errors.gastos = true;
        }
        if (payload.workers.length <= 0) {
            isValid = false;
        }

        payload.workers.map((worker, index) => {
            if(empty(worker.sueldo) || parseInt(worker.sueldo) < 0) {
                isValid = false;
                errors[`sueldo${index + 1}`] = true;
            }
        });
    } else {
        msg = "Error al recibir los datos del formulario";
        isValid = false;
    }
    return { isValid, errors, msg };
};

export default validationFunctions;