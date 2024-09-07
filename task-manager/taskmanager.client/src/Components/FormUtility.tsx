import React from 'react';

class FormUtility extends React.Component {

    static getFormInputs(formId: string) {
        return document.getElementById(formId);
    }

    static disableOrEnableSelect(formId: string, isValid: boolean) {
        const selectElement = this.getFormInputs(formId);

        if (selectElement) {
            const elements = selectElement.querySelectorAll('select');
            if (elements && isValid) {
                elements.forEach(element => {
                    element.setAttribute('disabled', 'disabled');
                });
            } else {
                elements.forEach(element => {
                    element.removeAttribute('disabled');
                });
            }
        }
    }

    static enableFormFields(formId: string) {
        const employeeForm = this.getFormInputs(formId);
        if (employeeForm) {
            const inputFields = employeeForm.querySelectorAll('input, textarea');
            inputFields.forEach(fields => {
                if (fields.tagName.toLowerCase() === 'input') {
                    const inputType = (fields as HTMLInputElement).type.toLowerCase();
                    if (inputType !== 'checkbox' && inputType !== 'radio') {
                        fields.removeAttribute('disabled');
                    }
                } else {
                    (fields as HTMLTextAreaElement).removeAttribute('disabled');
                }
            });
        }
        this.disableOrEnableSelect(formId, false);
    }

    // Add other functions as needed

    render() {
        // This component doesn't render anything since it's utility functions only
        return null;
    }
}

export default FormUtility;