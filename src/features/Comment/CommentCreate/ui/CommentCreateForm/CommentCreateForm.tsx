import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCreateForm.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
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
import { Button } from '@/shared/ui/Button/Button';
import {
  commentCreateReducer,
  commentCreateSelectors,
  commentCreateThunks,
} from '../../model/slices/commentCreateSlice/commentCreateSlice';
import { CommentAPICreateCommentErrors } from '@/shared/api/comment/createComment/createComment';

const initialReducers: ReducersList = {
  commentCreate: commentCreateReducer,
};

interface ProfileEditFormProps {
  className?: string;
  children?: React.ReactNode;
  parentId: string;
}

interface FormValues {
  text: string;
}

interface FormErrors {
  gereral: string | null;
  text: string | null;
}

const initialFormValues: FormValues = {
  text: '',
};

const initialFormErrors: FormErrors = {
  gereral: null,
  text: null,
};

const formErrorsInfo: FormErrorsInfo = {
  [CommentAPICreateCommentErrors.COMMENT_LIST_NOT_FOUND]: {
    field: null,
    translation: 'COMMENT.ERRORS.userNotFound',
  },
};

export const CommentCreateForm: FC<ProfileEditFormProps> = memo((props) => {
  const { className = '', parentId } = props;
  const { t } = useTranslation('comment');
  const dispatch = useAppDispatch();

  const commentCreateIsLoading = useSelector(commentCreateSelectors.selectIsLoading);
  const commentCreateError = useSelector(commentCreateSelectors.selectError);

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  /**
   * Object with form validators for fields. Used for checking valid or not a new value for a field.
   * It is a param for validateValue() and validateForm()
   */
  const formValidators: FormValidators = useMemo(() => {
    return {
      text: [
        {
          error: t('GENERAL.ERRORS.required', { ns: 'translation' }),
          validate: (value: string): boolean => !value || !value.trim(),
        },
      ],
    };
  }, []);

  /**
   * If an error from server received, set it to formError
   */
  useEffect(() => {
    const formErrorByErrorUid = getFormErrorsByErrorUid(commentCreateError, formErrorsInfo);
    setFormErrors({ ...formErrors, ...formErrorByErrorUid });
  }, [commentCreateError]);

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
    dispatch(commentCreateThunks.createCommentThunk({ id: parentId, comment: data }));
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
          disabled={commentCreateIsLoading}
          placeholder={t('COMMENT.PLACEHOLDERS.text')}
          error={formErrors.text}
          value={formValues.text}
          onChange={(value) => onChangeForm('text', value)}
        />

        {renderGeneralFormError()}
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className={cls['actions-container']}>
        <Button disabled={commentCreateIsLoading} onClick={onSubmitForm}>
          {t('GENERAL.ACTIONS.create', { ns: 'translation' })}
        </Button>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className={cls['content-container']}>
          {renderForm()}
          {renderActions()}
        </div>
      </>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.CommentCreatetForm, {}, [className])}>{renderContent()}</div>
    </DynamicModuleLoader>
  );
});
