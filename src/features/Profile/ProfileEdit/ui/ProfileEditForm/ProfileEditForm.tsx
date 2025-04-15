import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileEditForm.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  profileEditReducer,
  profileEditSelectors,
  profileEditThunks,
} from '../../model/slices/profileEditSlice/profileEditSlice';
import { Input } from '@/shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import {
  FormErrorsInfo,
  FormValidators,
  getFormErrorsByErrorUid,
  isFormValid,
  validateForm,
  validateValue,
} from '@/shared/lib/formValidation/formValidation';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextColor } from '@/shared/ui/Text/Text';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { User } from '@/entities/User';
import { Button } from '@/shared/ui/Button/Button';
import { UserAPIEditUserByIdErrors } from '@/shared/api/user/editUserById/editUserById';

const initialReducers: ReducersList = {
  profileEdit: profileEditReducer,
};

interface ProfileEditFormProps {
  className?: string;
  children?: React.ReactNode;
  profile: User | null;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | null;
  country: Country | null;
  city: string | null;
  currency: Currency | null;
}

interface FormErrors {
  gereral: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  birthDate: string | null;
}

const initialFormValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  country: null,
  city: '',
  currency: null,
};

const initialFormErrors: FormErrors = {
  gereral: null,
  firstName: null,
  lastName: null,
  email: null,
  birthDate: null,
};

const formErrorsInfo: FormErrorsInfo = {
  [UserAPIEditUserByIdErrors.USER_NOT_FOUND]: {
    field: null,
    translation: 'PROFILE.ERRORS.userNotFound',
  },
};

const ProfileEditForm: FC<ProfileEditFormProps> = memo((props) => {
  const { className = '', profile } = props;
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  const profileEditIsLoading = useSelector(profileEditSelectors.selectIsLoading);
  const profileEditError = useSelector(profileEditSelectors.selectError);

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  /**
   * Object with form validators for fields. Used for checking valid or not a new value for a field.
   * It is a param for validateValue() and validateForm()
   */
  const formValidators: FormValidators = useMemo(() => {
    return {
      // username: [
      //   {
      //     error: t('GENERAL.ERRORS.required'),
      //     validate: (value: string): boolean => !value || !value.trim(),
      //   },
      // ],
      // password: [
      //   {
      //     error: t('GENERAL.ERRORS.required'),
      //     validate: (value: string): boolean => !value || !value.trim(),
      //   },
      // ],
    };
  }, []);

  /**
   * When data from server received, set it to formValues
   */
  useEffect(() => {
    setFormValues((prev) => ({ ...prev, ...profile }));
  }, [profile]);

  /**
   * If an error from server received, set it to formError
   */
  useEffect(() => {
    const formErrorByErrorUid = getFormErrorsByErrorUid(profileEditError, formErrorsInfo);
    setFormErrors((prev) => ({ ...prev, ...formErrorByErrorUid }));
  }, [profileEditError]);

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
    const formErrorsFromValidation = validateForm(formValues, formValidators);
    setFormErrors({ ...formErrors, ...formErrorsFromValidation });

    if (!isFormValid(formErrorsFromValidation)) return;

    const data = {
      ...formValues,
    };
    dispatch(profileEditThunks.editProfileThunk({ id: '1', profile: data }));
  }, [dispatch, formValues, formErrors, formValidators]);

  /**
   * Render general form error
   */
  const renderGeneralFormError = (): ReactNode | null => {
    if (!formErrors.gereral) return null;
    return <Text text={formErrors.gereral} color={TextColor.ERROR}></Text>;
  };

  const renderForm = () => {
    return (
      <div className={cls['form-container']}>
        <Input
          type="text"
          label={t('PROFILE.FIELDS.firstName')}
          disabled={profileEditIsLoading}
          error={formErrors.firstName}
          value={formValues.firstName}
          onChange={(value) => onChangeForm('firstName', value)}
        />

        <Input
          type="text"
          label={t('PROFILE.FIELDS.lastName')}
          disabled={profileEditIsLoading}
          error={formErrors.lastName}
          value={formValues.lastName}
          onChange={(value) => onChangeForm('lastName', value)}
        />

        <Input
          type="text"
          label={t('GENERAL.FIELDS.email', { ns: 'translation' })}
          disabled={profileEditIsLoading}
          error={formErrors.email}
          value={formValues.email}
          onChange={(value) => onChangeForm('email', value)}
        />

        <Input
          type="date"
          label={t('PROFILE.FIELDS.birthDate')}
          disabled={profileEditIsLoading}
          error={formErrors.birthDate}
          value={formValues.birthDate}
          onChange={(value) => onChangeForm('birthDate', value)}
        />

        <CountrySelect
          disabled={profileEditIsLoading}
          value={formValues.country}
          onChange={(value) => onChangeForm('country', value)}
        />

        <Input
          type="text"
          label={t('PROFILE.FIELDS.city')}
          disabled={profileEditIsLoading}
          value={formValues.city}
          onChange={(value) => onChangeForm('city', value)}
        />

        <CurrencySelect
          disabled={profileEditIsLoading}
          value={formValues.currency}
          onChange={(value) => onChangeForm('currency', value)}
        />

        {renderGeneralFormError()}
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className={cls['actions-container']}>
        <Button disabled={profileEditIsLoading} onClick={onSubmitForm}>
          {t('GENERAL.ACTIONS.save', { ns: 'translation' })}
        </Button>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderForm()}
        {renderActions()}
      </>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ProfileEditForm, {}, [className])}>{renderContent()}</div>
    </DynamicModuleLoader>
  );
});

export default ProfileEditForm;
