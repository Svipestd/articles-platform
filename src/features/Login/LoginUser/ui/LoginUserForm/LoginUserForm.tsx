import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginUserForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { Text, TextColor, TextSize } from '@/shared/ui/Text/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  FormValidators,
  isFormValid,
  validateForm,
  validateValue,
  FormErrorsInfo,
  getFormErrorsByErrorUid,
} from '@/shared/lib/formValidation/formValidation';
import {
  loginUserReducer,
  loginUserSelectors,
  loginUserThunks,
} from '../../model/slices/loginUserSlice/loginUserSlice';
import { AuthAPILoginUserErrors } from '@/shared/api/auth/loginUser/loginUser';
import { usePressEnter } from '@/shared/lib/hooks/usePressEnter/usePressEnter';

interface LoginUserFormProps {
  className?: string;
  children?: React.ReactNode;
}

const initialReducers: ReducersList = {
  loginUser: loginUserReducer,
};

interface FormValues {
  username: string;
  password: string;
}

interface FormErrors {
  gereral: string | null;
  username: string | null;
  password: string | null;
}

const initialFormValues: FormValues = {
  username: '',
  password: '',
};

const initialFormErrors: FormErrors = {
  gereral: null,
  username: null,
  password: null,
};

const formErrorsInfo: FormErrorsInfo = {
  [AuthAPILoginUserErrors.INVALID_CREDENTIALS]: {
    field: null,
    translation: 'LOGIN.ERRORS.invalidCredential',
  },
};

const LoginUserForm: FC<LoginUserFormProps> = memo((props) => {
  const { className = '' } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loginUserError = useSelector(loginUserSelectors.selectError);
  const loginUserIsLoading = useSelector(loginUserSelectors.selectIsLoading);

  usePressEnter(() => {
    onSubmitForm();
  });

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  /**
   * Object with form validators for fields. Used for checking valid or not a new value for a field.
   * It is a param for validateValue() and validateForm()
   */
  const formValidators: FormValidators = useMemo(() => {
    return {
      username: [
        {
          error: t('GENERAL.ERRORS.required'),
          validate: (value: string): boolean => !value || !value.trim(),
        },
      ],
      password: [
        {
          error: t('GENERAL.ERRORS.required'),
          validate: (value: string): boolean => !value || !value.trim(),
        },
      ],
    };
  }, [t]);

  /**
   * If an error from server received, set it to formError
   */
  useEffect(() => {
    const formErrorByErrorUid = getFormErrorsByErrorUid(loginUserError, formErrorsInfo);
    setFormErrors({ ...formErrors, ...formErrorByErrorUid });
  }, [loginUserError]);

  /**
   * A function that handles changes in form fields.
   *
   * @param fieldName - name of a field in formValues
   * @param value - new value for a field in formValues
   */
  const onChangeForm = (fieldName: keyof FormValues, value: string) => {
    switch (fieldName) {
      default: {
        setFormValues({ ...formValues, [fieldName]: value });

        const error = validateValue(value, fieldName, formValidators);
        setFormErrors({ ...formErrors, [fieldName]: error });
      }
    }
  };

  /**
   * A function that handles form submit.
   * Checks form for errors and dispatches form values to redux module
   */
  const onSubmitForm = useCallback(async () => {
    const errors = validateForm(formValues, formValidators);
    setFormErrors({ ...formErrors, ...errors });

    if (!isFormValid(errors)) return;

    dispatch(loginUserThunks.loginUserThunk(formValues));
  }, [dispatch, formValues, formErrors, formValidators]);

  /**
   * Render general form error
   */
  const renderGeneralFormError = (): ReactNode | null => {
    if (!formErrors.gereral) return null;
    return <Text text={formErrors.gereral} color={TextColor.ERROR}></Text>;
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text text={t('LOGIN.TEXTS.title')} size={TextSize.L}></Text>

        <Input
          type="text"
          label={t('LOGIN.FIELDS.username')}
          disabled={loginUserIsLoading}
          error={formErrors.username}
          value={formValues.username}
          onChange={(value) => onChangeForm('username', value)}
        />

        <Input
          type="password"
          label={t('LOGIN.FIELDS.password')}
          disabled={loginUserIsLoading}
          error={formErrors.password}
          value={formValues.password}
          onChange={(value) => onChangeForm('password', value)}
        />

        {renderGeneralFormError()}

        <Button className={cls.loginBtn} disabled={loginUserIsLoading} onClick={onSubmitForm}>
          {t('LOGIN.ACTIONS.login')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginUserForm;
