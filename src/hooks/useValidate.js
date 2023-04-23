export const useValidate = ({validatorSchema, setState}) => {
    const validateEntries = (ValidatorSchema, {key, value}) => {
        const validatorForCurrentField = ValidatorSchema[key];
        if (validatorForCurrentField?.required && (value === "" || value === undefined)) {
            return `${validatorForCurrentField?.name} is Required`;
        } else if (validatorForCurrentField?.regex) {
            const isValid = validatorForCurrentField?.regex.test(value);
            if (!isValid) {
                return validatorForCurrentField?.errorText;
            }
        }
        return false;
    };
    const handleBlur = async (key, value) => {
        const isErrorOrValid = await validateEntries(validatorSchema, {key, value});
        if (typeof isErrorOrValid === "string") {
            setState(prev => {
                return {
                    ...prev, [key]: {...prev[key], error: isErrorOrValid}
                };
            });
        }

    };
    return {handleBlur};
}
