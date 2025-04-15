import i18n from '@/shared/config/i18n/i18n';

export interface FormValues {
  [field: string]: any;
}
export interface FormErrors {
  [field: string]: string | null;
}

interface ErrorInfo {
  field: string | null;
  translation: string | null;
}

export type FormErrorsInfo = Record<string, ErrorInfo>;

export interface FormValidator {
  error: string;
  validate: (value: any) => boolean;
  lazy?: boolean;
}

export interface FormValidators {
  [field: string]: FormValidator[];
}

/**
 * A function that checks if new field value valid or not.
 *
 * @param value - field value
 * @param fieldName - field name
 * @param formValidators - object with form validators for fields
 * @returns translated error or null
 */
export const validateValue = (
  value: any,
  fieldName: string,
  formValidators: FormValidators
): string | null => {
  const validators: FormValidator[] = formValidators[fieldName] || [];

  for (const validator of validators) {
    if (validator.validate(value)) return validator.error;
  }

  return null;
};

/**
 * A function that checks form for error and returns formErrors object.
 *
 * @param formValues - object with all form values
 * @param formValidators - object with form validators for fields
 * @returns formErrors
 */
export const validateForm = (
  formValues: FormValues,
  formValidators: FormValidators
): FormErrors => {
  const fields = Object.keys(formValidators);
  const errors: FormErrors = {};

  for (const field of fields) {
    const result = validateValue(formValues[field], field, formValidators);

    errors[field] = result;
  }

  return errors;
};

/**
 * A function that checks if form valid or not.
 *
 * @param formError - object with all form errors
 * @returns is form valid or not
 */
export const isFormValid = (formErrors: FormErrors): boolean => {
  for (const value of Object.values(formErrors)) {
    if (value) return false;
  }

  return true;
};

/**
 * A function that returns translated error by its UID.
 * If error UID wasn't found in formErrorsInfo, returns default error.
 *
 * @param errorUid - error UID from server
 * @param errorsTranslations - object with transtations by error UID
 * @returns translated error
 */
export const getFormErrorTranslation = (
  errorUid: string,
  formErrorsInfo: FormErrorsInfo
): string => {
  if (formErrorsInfo[errorUid]?.translation) return i18n.t(formErrorsInfo[errorUid].translation);

  return i18n.t('GENERAL.ERRORS.defaultError');
};

/**
 * A function that returns form error by error UID.
 * If an error UID wasn't found in formErrorsInfo, returns no error.
 *
 * @param errorUid - error UID from server
 * @param errorsTranslations - object with error info by error UID
 * @returns translated error
 */
export const getFormErrorsByErrorUid = (
  errorUid: string | null,
  formErrorsInfo: FormErrorsInfo
): FormErrors => {
  // If there is no error
  if (!errorUid) return {};

  // If there is no handler for the error, return a general default error
  if (!formErrorsInfo[errorUid]) {
    return { general: i18n.t('GENERAL.ERRORS.defaultError') };
  }

  // If there is a handler but not a field, return a general error
  if (!formErrorsInfo[errorUid].field && formErrorsInfo[errorUid].translation) {
    return {
      general: formErrorsInfo[errorUid].translation,
    };
  }

  // If there is a handler and a field, return a translated error for a field
  if (formErrorsInfo[errorUid].field && formErrorsInfo[errorUid].translation) {
    return {
      [formErrorsInfo[errorUid].field]: formErrorsInfo[errorUid].translation,
    };
  }

  return {};
};

export const REG_EXP_EMAIL =
  /\s*[A-Za-z0-9._-]+(?:\.[A-Za-z0-9-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\s*/;
export const REG_EXP_EMAIL_NEW =
  /^\s*(?=.{9,210}$)[A-Za-z0-9._-]+(?:\.[A-Za-z0-9-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\s*/;
export const REG_EXP_PHONE = /^([\d+]{1,2}[\d]{5,13})$/;
export const REG_EXP_IP = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
export const REG_EXP_IP_SUBNET = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}\/[0-9]{1,3}$/;
export const REG_EXP_CYRILLIC = /^[\u0400-\u04FF]+$/;
export const REG_EXP_LATINE = /^[A-Za-z]+$/;

export const REG_EXP_NUMBER = /^[0-9]+$/;
export const REG_EXP_ONLY_NUMBERS = /[^0-9]/g;
export const REG_EXP_SPECIAL_CHARACTERS = /[\\/:*?"<>|]/;
