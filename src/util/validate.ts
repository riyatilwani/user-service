import { HTTP400Error } from './../errors/http-400-error';

export const validateParams = (entityObj: any, requestParams: { paramKey: string; required: boolean; type: string; validatorFunctions?: ((param: any) => boolean)[]; }[]) => {
        for (const param of requestParams) {
            if (checkParamPresent(Object.keys(entityObj), param)) {
                const reqParam = entityObj[param.paramKey];
                if (!checkParamType(reqParam, param)) {
                    throw new HTTP400Error(`${param.paramKey} is of type ` +
                            `${typeof reqParam} but should be ${param.type}`);
                } else {
                    if (param.validatorFunctions && !runValidators(reqParam, param)) {
                        throw new HTTP400Error(`Validation failed for ${param.paramKey}`);
                    }
                }
            } else if (param.required) {
                throw new HTTP400Error(`Missing Parameter ${param.paramKey}`);
            }
        }
};

const checkParamPresent = (reqParams: string | any[], paramObj: { paramKey: any; required?: boolean; type?: string; validatorFunctions?: ((param: any) => boolean)[]; }) => {
    return (reqParams.includes(paramObj.paramKey));
};

const checkParamType = (reqParam: any, paramObj: { paramKey?: string; required?: boolean; type: any; validatorFunctions?: ((param: any) => boolean)[]; }) => {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};

const runValidators = (reqParam: any, paramObj: { paramKey?: string; required?: boolean; type?: string; validatorFunctions?: any; }) => {
    paramObj.validatorFunctions.forEach((validator: (arg0: any) => any) => {
        if (!validator(reqParam)) {
            return false;
        }
    });
    return true;
};

module.exports = {
    validateParams
};